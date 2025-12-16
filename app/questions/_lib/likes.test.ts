import { describe, it, expect } from 'vitest';
import { toggleLike, addLike, removeLike, type LikeState } from './likes';

describe('toggleLike', () => {
  // TC-DETAIL-005: 좋아요 기능
  it('좋아요가 안 되어있을 때 토글하면 좋아요 활성화, 좋아요 수 +1', () => {
    const currentState: LikeState = { isLiked: false, likeCount: 5 };
    const result = toggleLike(currentState);
    expect(result.isLiked).toBe(true);
    expect(result.likeCount).toBe(6);
  });

  it('좋아요가 되어있을 때 토글하면 좋아요 비활성화, 좋아요 수 -1', () => {
    const currentState: LikeState = { isLiked: true, likeCount: 5 };
    const result = toggleLike(currentState);
    expect(result.isLiked).toBe(false);
    expect(result.likeCount).toBe(4);
  });

  it('좋아요 수가 0일 때 좋아요 취소해도 음수가 되지 않음', () => {
    const currentState: LikeState = { isLiked: true, likeCount: 0 };
    const result = toggleLike(currentState);
    expect(result.isLiked).toBe(false);
    expect(result.likeCount).toBe(0);
  });

  it('좋아요 토글 시 원본 상태를 변경하지 않음', () => {
    const currentState: LikeState = { isLiked: false, likeCount: 5 };
    toggleLike(currentState);
    expect(currentState.isLiked).toBe(false);
    expect(currentState.likeCount).toBe(5);
  });

  it('연속으로 토글하면 원래 상태로 돌아옴', () => {
    const initialState: LikeState = { isLiked: false, likeCount: 5 };
    const afterFirstToggle = toggleLike(initialState);
    const afterSecondToggle = toggleLike(afterFirstToggle);
    expect(afterSecondToggle.isLiked).toBe(initialState.isLiked);
    expect(afterSecondToggle.likeCount).toBe(initialState.likeCount);
  });
});

describe('addLike', () => {
  it('좋아요 추가 시 좋아요 수가 1 증가', () => {
    expect(addLike(5)).toBe(6);
  });

  it('좋아요 수가 0일 때 추가하면 1이 됨', () => {
    expect(addLike(0)).toBe(1);
  });
});

describe('removeLike', () => {
  it('좋아요 제거 시 좋아요 수가 1 감소', () => {
    expect(removeLike(5)).toBe(4);
  });

  it('좋아요 수가 0일 때 제거해도 0 유지 (음수 방지)', () => {
    expect(removeLike(0)).toBe(0);
  });

  it('좋아요 수가 1일 때 제거하면 0이 됨', () => {
    expect(removeLike(1)).toBe(0);
  });
});
