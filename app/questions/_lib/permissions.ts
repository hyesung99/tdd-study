export interface QuestionPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canToggleResolution: boolean;
}

export function getQuestionPermissions(
  questionAuthor: string,
  currentUserId: string
): QuestionPermissions {
  const isAuthor = questionAuthor === currentUserId && currentUserId !== '';
  return {
    canEdit: isAuthor,
    canDelete: isAuthor,
    canToggleResolution: isAuthor,
  };
}

export function canEditQuestion(
  questionAuthor: string,
  currentUserId: string
): boolean {
  return questionAuthor === currentUserId && currentUserId !== '';
}

export function canDeleteQuestion(
  questionAuthor: string,
  currentUserId: string
): boolean {
  return questionAuthor === currentUserId && currentUserId !== '';
}
