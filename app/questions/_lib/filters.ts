import type { Question, FilterOptions } from "../_types";

export function filterByKeyword(
  questions: Question[],
  keyword: string
): Question[] {
  const targetKeyword = keyword.toLowerCase();
  return questions.filter((question) => {
    return (
      question.title.toLowerCase().includes(targetKeyword) ||
      question.content.toLowerCase().includes(targetKeyword)
    );
  });
}

export function filterByCategory(
  questions: Question[],
  category: string | undefined
): Question[] {
  if (category === "all") {
    return questions;
  }

  if (!category) {
    return questions;
  }

  return questions.filter((question) => question.category === category);
}

export function filterByResolution(
  questions: Question[],
  isResolved?: boolean
): Question[] {
  if (typeof isResolved !== "boolean" && !isResolved) {
    return questions;
  }

  if (isResolved) {
    return questions.filter((question) => question.isResolved);
  }

  return questions.filter((question) => !question.isResolved);
}

export function applyFilters(
  questions: Question[],
  filters: FilterOptions
): Question[] {
  const filteredByKeyword = filterByKeyword(questions, filters.keyword ?? "");
  const filteredByCategory = filterByCategory(
    filteredByKeyword,
    filters.category ?? undefined
  );
  const filteredByResolution = filterByResolution(
    filteredByCategory,
    filters.isResolved ?? undefined
  );
  return filteredByResolution;
}
