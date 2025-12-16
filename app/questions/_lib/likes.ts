export interface LikeState {
  isLiked: boolean;
  likeCount: number;
}

export function toggleLike(currentState: LikeState): LikeState {
  if (currentState.isLiked) {
    return {
      isLiked: false,
      likeCount: Math.max(0, currentState.likeCount - 1),
    };
  } else {
    return {
      isLiked: true,
      likeCount: currentState.likeCount + 1,
    };
  }
}

export function addLike(likeCount: number): number {
  return likeCount + 1;
}

export function removeLike(likeCount: number): number {
  return Math.max(0, likeCount - 1);
}
