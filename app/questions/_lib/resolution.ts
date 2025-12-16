export function toggleResolution(isResolved: boolean): boolean {
  return !isResolved;
}

export function canToggleResolution(
  questionAuthor: string,
  currentUserId: string
): boolean {
  return questionAuthor === currentUserId;
}

export function getResolutionStatus(isResolved: boolean): '해결됨' | '미해결' {
  return isResolved ? '해결됨' : '미해결';
}
