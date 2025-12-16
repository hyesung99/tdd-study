import type { Comment } from '../_types';

export interface CommentValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateComment(content: string): CommentValidationResult {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return { isValid: false, error: '댓글 내용은 필수입니다.' };
  }

  if (trimmedContent.length > 1000) {
    return { isValid: false, error: '댓글은 1000자 이하여야 합니다.' };
  }

  return { isValid: true };
}

export function sortCommentsByDate(comments: Comment[]): Comment[] {
  return [...comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function canDeleteComment(
  comment: Comment,
  currentUserId: string
): boolean {
  return comment.author === currentUserId;
}

export function addComment(
  comments: Comment[],
  newComment: Comment
): Comment[] {
  return [...comments, newComment];
}

export function removeComment(
  comments: Comment[],
  commentId: string
): Comment[] {
  return comments.filter((comment) => comment.id !== commentId);
}
