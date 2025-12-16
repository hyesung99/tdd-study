import { describe, it, expect } from 'vitest';
import { paginate, getPageNumbers, DEFAULT_PAGE_SIZE } from './pagination';
import type { Question } from '../_types';

// 21개의 질문 생성 (3페이지 분량)
const createMockQuestions = (count: number): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    title: `질문 ${i + 1}`,
    content: `내용 ${i + 1}`,
    category: 'React',
    author: '작성자',
    createdAt: new Date(`2024-01-${String(i + 1).padStart(2, '0')}`),
    isResolved: false,
    likeCount: 0,
    commentCount: 0,
    isPublic: true,
  }));
};

describe('paginate', () => {
  // TC-LIST-009: 페이지네이션 기본 표시
  it('1페이지당 기본 10개의 질문을 반환', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions);
    expect(result.items).toHaveLength(10);
    expect(result.currentPage).toBe(1);
  });

  it('전체 페이지 수를 올바르게 계산', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions);
    expect(result.totalPages).toBe(3);
  });

  it('11개 이상의 질문이 있을 때 페이지네이션 필요', () => {
    const questions = createMockQuestions(11);
    const result = paginate(questions);
    expect(result.totalPages).toBe(2);
    expect(result.hasNextPage).toBe(true);
  });

  it('10개 이하의 질문은 1페이지만 필요', () => {
    const questions = createMockQuestions(10);
    const result = paginate(questions);
    expect(result.totalPages).toBe(1);
    expect(result.hasNextPage).toBe(false);
  });

  // TC-LIST-010: 페이지네이션 - 페이지 이동
  it('2페이지 요청 시 11~20번째 질문 반환', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions, 2);
    expect(result.items).toHaveLength(10);
    expect(result.items[0].id).toBe('11');
    expect(result.items[9].id).toBe('20');
    expect(result.currentPage).toBe(2);
  });

  it('3페이지 요청 시 21~25번째 질문 반환 (마지막 페이지)', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions, 3);
    expect(result.items).toHaveLength(5);
    expect(result.items[0].id).toBe('21');
    expect(result.currentPage).toBe(3);
  });

  it('현재 페이지 번호를 올바르게 반환', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions, 2);
    expect(result.currentPage).toBe(2);
  });

  it('hasNextPage가 다음 페이지 존재 여부를 반환', () => {
    const questions = createMockQuestions(25);
    expect(paginate(questions, 1).hasNextPage).toBe(true);
    expect(paginate(questions, 2).hasNextPage).toBe(true);
    expect(paginate(questions, 3).hasNextPage).toBe(false);
  });

  it('hasPreviousPage가 이전 페이지 존재 여부를 반환', () => {
    const questions = createMockQuestions(25);
    expect(paginate(questions, 1).hasPreviousPage).toBe(false);
    expect(paginate(questions, 2).hasPreviousPage).toBe(true);
    expect(paginate(questions, 3).hasPreviousPage).toBe(true);
  });

  // TC-LIST-011: 필터 적용 시 1페이지로 초기화 (이건 UI 레벨에서 테스트)
  it('필터링 후 결과가 적을 때 totalPages가 줄어듦', () => {
    const questions = createMockQuestions(5);
    const result = paginate(questions);
    expect(result.totalPages).toBe(1);
    expect(result.items).toHaveLength(5);
  });

  it('빈 배열을 받으면 빈 결과 반환', () => {
    const result = paginate([]);
    expect(result.items).toHaveLength(0);
    expect(result.totalPages).toBe(0);
    expect(result.totalItems).toBe(0);
  });

  it('유효하지 않은 페이지 번호(0 이하)는 1페이지로 처리', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions, 0);
    expect(result.currentPage).toBe(1);
    expect(result.items[0].id).toBe('1');
  });

  it('존재하지 않는 페이지 번호는 빈 결과 반환', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions, 10);
    expect(result.items).toHaveLength(0);
    expect(result.currentPage).toBe(10);
  });

  it('커스텀 페이지 사이즈 적용', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions, 1, 5);
    expect(result.items).toHaveLength(5);
    expect(result.totalPages).toBe(5);
  });

  it('totalItems가 전체 아이템 수를 반환', () => {
    const questions = createMockQuestions(25);
    const result = paginate(questions, 2);
    expect(result.totalItems).toBe(25);
  });
});

describe('getPageNumbers', () => {
  it('전체 페이지가 maxVisible 이하면 모든 페이지 번호 반환', () => {
    const pageNumbers = getPageNumbers(1, 3, 5);
    expect(pageNumbers).toEqual([1, 2, 3]);
  });

  it('현재 페이지가 1일 때 올바른 페이지 번호 목록 반환', () => {
    const pageNumbers = getPageNumbers(1, 10, 5);
    expect(pageNumbers).toEqual([1, 2, 3, 4, 5]);
  });

  it('현재 페이지가 중간일 때 현재 페이지 중심으로 목록 반환', () => {
    const pageNumbers = getPageNumbers(5, 10, 5);
    expect(pageNumbers).toEqual([3, 4, 5, 6, 7]);
  });

  it('현재 페이지가 마지막일 때 올바른 페이지 번호 목록 반환', () => {
    const pageNumbers = getPageNumbers(10, 10, 5);
    expect(pageNumbers).toEqual([6, 7, 8, 9, 10]);
  });

  it('전체 페이지가 1페이지일 때 [1]만 반환', () => {
    const pageNumbers = getPageNumbers(1, 1, 5);
    expect(pageNumbers).toEqual([1]);
  });
});
