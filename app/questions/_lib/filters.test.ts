import { describe, it, expect } from 'vitest';
import { filterByKeyword, filterByCategory, filterByResolution, applyFilters } from './filters';
import type { Question } from '../_types';

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'React 상태 관리 질문',
    content: 'useState와 useReducer의 차이점이 무엇인가요?',
    category: 'React',
    author: '김철수',
    createdAt: new Date('2024-01-01'),
    isResolved: false,
    likeCount: 5,
    commentCount: 3,
    isPublic: true,
  },
  {
    id: '2',
    title: 'Next.js 라우팅 문제',
    content: 'Next.js에서 동적 라우팅은 어떻게 구현하나요?',
    category: 'Next.js',
    author: '이영희',
    createdAt: new Date('2024-01-02'),
    isResolved: true,
    likeCount: 10,
    commentCount: 7,
    isPublic: true,
  },
  {
    id: '3',
    title: 'TypeScript 타입 에러',
    content: 'TypeScript에서 제네릭 타입을 어떻게 사용하나요?',
    category: 'TypeScript',
    author: '박민수',
    createdAt: new Date('2024-01-03'),
    isResolved: false,
    likeCount: 8,
    commentCount: 5,
    isPublic: true,
  },
  {
    id: '4',
    title: 'React 최적화 방법',
    content: 'React 컴포넌트 리렌더링을 최적화하는 방법은?',
    category: 'React',
    author: '최지훈',
    createdAt: new Date('2024-01-04'),
    isResolved: true,
    likeCount: 15,
    commentCount: 10,
    isPublic: true,
  },
];

describe('filterByKeyword', () => {
  it('제목에 키워드가 포함된 질문만 반환', () => {
    const result = filterByKeyword(mockQuestions, 'React');
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('4');
  });

  it('내용에 키워드가 포함된 질문만 반환', () => {
    const result = filterByKeyword(mockQuestions, 'TypeScript');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('제목 또는 내용에 키워드가 포함된 질문 반환', () => {
    const result = filterByKeyword(mockQuestions, '라우팅');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('대소문자 구분 없이 검색', () => {
    const result = filterByKeyword(mockQuestions, 'react');
    expect(result).toHaveLength(2);
  });

  it('키워드가 빈 문자열이면 모든 질문 반환', () => {
    const result = filterByKeyword(mockQuestions, '');
    expect(result).toHaveLength(4);
  });

  it('일치하는 질문이 없으면 빈 배열 반환', () => {
    const result = filterByKeyword(mockQuestions, '존재하지않는키워드');
    expect(result).toHaveLength(0);
  });
});

describe('filterByCategory', () => {
  it('특정 카테고리의 질문만 반환', () => {
    const result = filterByCategory(mockQuestions, 'React');
    expect(result).toHaveLength(2);
    expect(result[0].category).toBe('React');
    expect(result[1].category).toBe('React');
  });

  it('카테고리가 "all"이면 모든 질문 반환', () => {
    const result = filterByCategory(mockQuestions, 'all');
    expect(result).toHaveLength(4);
  });

  it('카테고리가 undefined이면 모든 질문 반환', () => {
    const result = filterByCategory(mockQuestions, undefined);
    expect(result).toHaveLength(4);
  });

  it('해당 카테고리의 질문이 없으면 빈 배열 반환', () => {
    const result = filterByCategory(mockQuestions, 'Vue.js');
    expect(result).toHaveLength(0);
  });
});

describe('filterByResolution', () => {
  it('해결된 질문만 반환', () => {
    const result = filterByResolution(mockQuestions, true);
    expect(result).toHaveLength(2);
    expect(result.every((q) => q.isResolved)).toBe(true);
  });

  it('미해결 질문만 반환', () => {
    const result = filterByResolution(mockQuestions, false);
    expect(result).toHaveLength(2);
    expect(result.every((q) => !q.isResolved)).toBe(true);
  });

  it('해결상태가 undefined이면 모든 질문 반환', () => {
    const result = filterByResolution(mockQuestions, undefined);
    expect(result).toHaveLength(4);
  });
});

describe('applyFilters', () => {
  it('키워드 필터만 적용', () => {
    const result = applyFilters(mockQuestions, { keyword: 'React' });
    expect(result).toHaveLength(2);
  });

  it('카테고리 필터만 적용', () => {
    const result = applyFilters(mockQuestions, { category: 'TypeScript' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });

  it('해결상태 필터만 적용', () => {
    const result = applyFilters(mockQuestions, { isResolved: true });
    expect(result).toHaveLength(2);
  });

  it('키워드 + 카테고리 필터 동시 적용', () => {
    const result = applyFilters(mockQuestions, {
      keyword: 'React',
      category: 'React',
    });
    expect(result).toHaveLength(2);
  });

  it('키워드 + 해결상태 필터 동시 적용', () => {
    const result = applyFilters(mockQuestions, {
      keyword: 'React',
      isResolved: false,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('카테고리 + 해결상태 필터 동시 적용', () => {
    const result = applyFilters(mockQuestions, {
      category: 'React',
      isResolved: true,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('4');
  });

  it('모든 필터 동시 적용', () => {
    const result = applyFilters(mockQuestions, {
      keyword: 'React',
      category: 'React',
      isResolved: false,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('필터가 빈 객체이면 모든 질문 반환', () => {
    const result = applyFilters(mockQuestions, {});
    expect(result).toHaveLength(4);
  });

  it('일치하는 질문이 없으면 빈 배열 반환', () => {
    const result = applyFilters(mockQuestions, {
      keyword: 'Vue',
      category: 'React',
    });
    expect(result).toHaveLength(0);
  });
});
