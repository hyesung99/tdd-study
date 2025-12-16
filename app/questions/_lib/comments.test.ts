import { describe, it, expect } from 'vitest';
import {
  validateComment,
  sortCommentsByDate,
  canDeleteComment,
  addComment,
  removeComment,
} from './comments';
import type { Comment } from '../_types';

const mockComments: Comment[] = [
  {
    id: '1',
    questionId: 'q1',
    content: '첫 번째 댓글',
    author: '사용자1',
    createdAt: new Date('2024-01-03'),
  },
  {
    id: '2',
    questionId: 'q1',
    content: '두 번째 댓글',
    author: '사용자2',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    questionId: 'q1',
    content: '세 번째 댓글',
    author: '사용자1',
    createdAt: new Date('2024-01-02'),
  },
];

describe('validateComment', () => {
  // TC-DETAIL-010: 댓글 빈 내용 등록 방지
  it('빈 문자열이면 유효하지 않음', () => {
    const result = validateComment('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('댓글 내용은 필수입니다.');
  });

  it('공백만 있으면 유효하지 않음', () => {
    const result = validateComment('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('댓글 내용은 필수입니다.');
  });

  it('내용이 있으면 유효함', () => {
    const result = validateComment('유효한 댓글 내용입니다.');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('1000자를 초과하면 유효하지 않음', () => {
    const result = validateComment('a'.repeat(1001));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('댓글은 1000자 이하여야 합니다.');
  });

  it('1000자 이하면 유효함', () => {
    const result = validateComment('a'.repeat(1000));
    expect(result.isValid).toBe(true);
  });
});

describe('sortCommentsByDate', () => {
  // TC-DETAIL-011: 댓글 리스트 표시 및 정렬
  it('생성 시각 기준 오름차순 정렬', () => {
    const result = sortCommentsByDate(mockComments);
    expect(result[0].id).toBe('2'); // 2024-01-01
    expect(result[1].id).toBe('3'); // 2024-01-02
    expect(result[2].id).toBe('1'); // 2024-01-03
  });

  it('원본 배열을 변경하지 않음', () => {
    const original = [...mockComments];
    const originalFirstId = original[0].id;
    sortCommentsByDate(original);
    expect(original[0].id).toBe(originalFirstId);
  });

  it('빈 배열을 받으면 빈 배열 반환', () => {
    const result = sortCommentsByDate([]);
    expect(result).toHaveLength(0);
  });

  it('댓글이 1개만 있어도 정상 동작', () => {
    const result = sortCommentsByDate([mockComments[0]]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});

describe('canDeleteComment', () => {
  // TC-DETAIL-012: 댓글 삭제 - 본인 댓글
  it('작성자 본인이면 삭제 가능', () => {
    const comment = mockComments[0];
    expect(canDeleteComment(comment, '사용자1')).toBe(true);
  });

  // TC-DETAIL-013: 댓글 삭제 버튼 - 타인 댓글
  it('작성자가 아니면 삭제 불가', () => {
    const comment = mockComments[0];
    expect(canDeleteComment(comment, '사용자2')).toBe(false);
  });

  it('빈 사용자 ID면 삭제 불가', () => {
    const comment = mockComments[0];
    expect(canDeleteComment(comment, '')).toBe(false);
  });
});

describe('addComment', () => {
  // TC-DETAIL-009: 댓글 작성
  it('새 댓글을 댓글 리스트에 추가', () => {
    const newComment: Comment = {
      id: '4',
      questionId: 'q1',
      content: '새로운 댓글',
      author: '사용자3',
      createdAt: new Date('2024-01-04'),
    };
    const result = addComment(mockComments, newComment);
    expect(result).toHaveLength(4);
    expect(result[3].id).toBe('4');
  });

  it('원본 배열을 변경하지 않음', () => {
    const newComment: Comment = {
      id: '4',
      questionId: 'q1',
      content: '새로운 댓글',
      author: '사용자3',
      createdAt: new Date('2024-01-04'),
    };
    const originalLength = mockComments.length;
    addComment(mockComments, newComment);
    expect(mockComments).toHaveLength(originalLength);
  });

  it('빈 배열에 댓글 추가 가능', () => {
    const newComment: Comment = {
      id: '1',
      questionId: 'q1',
      content: '첫 댓글',
      author: '사용자1',
      createdAt: new Date(),
    };
    const result = addComment([], newComment);
    expect(result).toHaveLength(1);
  });
});

describe('removeComment', () => {
  it('지정한 ID의 댓글을 삭제', () => {
    const result = removeComment(mockComments, '2');
    expect(result).toHaveLength(2);
    expect(result.find((c) => c.id === '2')).toBeUndefined();
  });

  it('원본 배열을 변경하지 않음', () => {
    const originalLength = mockComments.length;
    removeComment(mockComments, '2');
    expect(mockComments).toHaveLength(originalLength);
  });

  it('존재하지 않는 ID로 삭제 시도해도 에러 없음', () => {
    const result = removeComment(mockComments, 'nonexistent');
    expect(result).toHaveLength(3);
  });

  it('빈 배열에서 삭제 시도해도 에러 없음', () => {
    const result = removeComment([], '1');
    expect(result).toHaveLength(0);
  });
});
