import { describe, it, expect } from 'vitest';
import {
  validatePassword,
  getPasswordOrDefault,
  isPrivateQuestion,
  DEFAULT_PASSWORD,
} from './password';

describe('validatePassword', () => {
  // TC-DETAIL-002: 비공개 질문 접근
  it('올바른 비밀번호 입력 시 유효함', () => {
    const result = validatePassword('1234', '1234');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('잘못된 비밀번호 입력 시 유효하지 않음', () => {
    const result = validatePassword('wrong', '1234');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('비밀번호가 일치하지 않습니다.');
  });

  it('빈 비밀번호 입력 시 유효하지 않음', () => {
    const result = validatePassword('', '1234');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('비밀번호를 입력해주세요.');
  });

  it('공백만 입력 시 유효하지 않음', () => {
    const result = validatePassword('   ', '1234');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('비밀번호를 입력해주세요.');
  });

  it('대소문자 구분하여 비교', () => {
    const result = validatePassword('Password', 'password');
    expect(result.isValid).toBe(false);
  });
});

describe('getPasswordOrDefault', () => {
  // TC-CREATE-004: 비공개 비밀번호 미입력
  it('비밀번호가 없으면 기본값 "0000" 반환', () => {
    expect(getPasswordOrDefault()).toBe(DEFAULT_PASSWORD);
    expect(getPasswordOrDefault('')).toBe(DEFAULT_PASSWORD);
    expect(getPasswordOrDefault('   ')).toBe(DEFAULT_PASSWORD);
  });

  it('비밀번호가 있으면 입력값 반환', () => {
    expect(getPasswordOrDefault('1234')).toBe('1234');
    expect(getPasswordOrDefault('mypassword')).toBe('mypassword');
  });

  it('기본 비밀번호는 "0000"', () => {
    expect(DEFAULT_PASSWORD).toBe('0000');
  });
});

describe('isPrivateQuestion', () => {
  it('isPublic이 false면 비공개 질문', () => {
    expect(isPrivateQuestion(false)).toBe(true);
  });

  it('isPublic이 true면 공개 질문', () => {
    expect(isPrivateQuestion(true)).toBe(false);
  });
});
