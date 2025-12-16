export const DEFAULT_PASSWORD = '0000';

export interface PasswordValidationResult {
  isValid: boolean;
  error?: string;
}

export function validatePassword(
  inputPassword: string,
  correctPassword: string
): PasswordValidationResult {
  if (!inputPassword.trim()) {
    return { isValid: false, error: '비밀번호를 입력해주세요.' };
  }

  if (inputPassword !== correctPassword) {
    return { isValid: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  return { isValid: true };
}

export function getPasswordOrDefault(password?: string): string {
  if (!password || !password.trim()) {
    return DEFAULT_PASSWORD;
  }
  return password;
}

export function isPrivateQuestion(isPublic: boolean): boolean {
  return !isPublic;
}
