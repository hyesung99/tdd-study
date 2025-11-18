import type { ValidationResult } from '../_types';

export function validateTitle(title: string): ValidationResult {
  // TODO: 구현 필요
  return { isValid: false, error: 'Not implemented' };
}

export function validateContent(content: string): ValidationResult {
  // TODO: 구현 필요
  return { isValid: false, error: 'Not implemented' };
}

export function validateRequiredFields(fields: {
  title: string;
  content: string;
  category: string;
  isPublic: boolean | undefined;
}): ValidationResult {
  // TODO: 구현 필요
  return { isValid: false, error: 'Not implemented' };
}
