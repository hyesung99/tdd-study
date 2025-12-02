import type { ValidationResult } from "../_types";

export function validateTitle(title: string): ValidationResult {
  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 2) {
    return { isValid: false, error: "제목은 2자 이상이어야 합니다." };
  }

  if (trimmedTitle.length > 50) {
    return { isValid: false, error: "제목은 50자 이하여야 합니다." };
  }

  return { isValid: true };
}

export function validateContent(content: string): ValidationResult {
  const trimmedContent = content.trim();

  if (trimmedContent.length < 10) {
    return { isValid: false, error: "내용은 10자 이상이어야 합니다." };
  }

  if (trimmedContent.length > 2000) {
    return { isValid: false, error: "내용은 2000자 이하여야 합니다." };
  }

  return { isValid: true };
}

export function validateRequiredFields(fields: {
  title: string;
  content: string;
  category: string;
  isPublic: boolean | undefined;
}): ValidationResult {
  if (!fields.title.trim()) {
    return { isValid: false, error: "제목은 필수입니다." };
  }

  if (!fields.content.trim()) {
    return { isValid: false, error: "내용은 필수입니다." };
  }

  if (!fields.category.trim()) {
    return { isValid: false, error: "카테고리는 필수입니다." };
  }

  if (typeof fields.isPublic !== "boolean") {
    return { isValid: false, error: "공개 여부는 필수입니다." };
  }

  return { isValid: true };
}
