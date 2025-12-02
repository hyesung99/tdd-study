import type { Question, SortOption } from "../_types";

export function sortByDate(questions: Question[]): Question[] {
  const copiedQuestions = [...questions];

  if (questions.length === 0) {
    return copiedQuestions;
  }

  return copiedQuestions.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function sortByLikes(questions: Question[]): Question[] {
  const copiedQuestions = [...questions];

  if (questions.length === 0) {
    return copiedQuestions;
  }

  return copiedQuestions.sort(
    (a, b) =>
      b.likeCount - a.likeCount || b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function sortByComments(questions: Question[]): Question[] {
  const copiedQuestions = [...questions];

  if (questions.length === 0) {
    return copiedQuestions;
  }

  return copiedQuestions.sort(
    (a, b) =>
      b.commentCount - a.commentCount ||
      b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function sortQuestions(
  questions: Question[],
  sortOption?: SortOption
): Question[] {
  const copiedQuestions = [...questions];

  if (!sortOption) {
    return sortByDate(copiedQuestions);
  }

  if (sortOption === "latest") {
    return sortByDate(copiedQuestions);
  } else if (sortOption === "likes") {
    return sortByLikes(copiedQuestions);
  } else if (sortOption === "comments") {
    return sortByComments(copiedQuestions);
  }

  return copiedQuestions;
}
