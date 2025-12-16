import { describe, it, expect } from 'vitest';
import {
  getQuestionPermissions,
  canEditQuestion,
  canDeleteQuestion,
} from './permissions';

describe('getQuestionPermissions', () => {
  // TC-DETAIL-003: 작성자 권한 - 본인 질문
  it('본인 질문이면 수정/삭제/해결토글 권한이 있음', () => {
    const permissions = getQuestionPermissions('사용자1', '사용자1');
    expect(permissions.canEdit).toBe(true);
    expect(permissions.canDelete).toBe(true);
    expect(permissions.canToggleResolution).toBe(true);
  });

  // TC-DETAIL-004: 작성자 권한 - 타인 질문
  it('타인 질문이면 수정/삭제/해결토글 권한이 없음', () => {
    const permissions = getQuestionPermissions('사용자1', '사용자2');
    expect(permissions.canEdit).toBe(false);
    expect(permissions.canDelete).toBe(false);
    expect(permissions.canToggleResolution).toBe(false);
  });

  it('로그아웃 상태(빈 ID)면 권한이 없음', () => {
    const permissions = getQuestionPermissions('사용자1', '');
    expect(permissions.canEdit).toBe(false);
    expect(permissions.canDelete).toBe(false);
    expect(permissions.canToggleResolution).toBe(false);
  });
});

describe('canEditQuestion', () => {
  // TC-EDIT-003: 수정 권한 없음 - 타인 질문
  it('본인 질문이면 수정 가능', () => {
    expect(canEditQuestion('사용자1', '사용자1')).toBe(true);
  });

  it('타인 질문이면 수정 불가', () => {
    expect(canEditQuestion('사용자1', '사용자2')).toBe(false);
  });

  it('로그아웃 상태면 수정 불가', () => {
    expect(canEditQuestion('사용자1', '')).toBe(false);
  });
});

describe('canDeleteQuestion', () => {
  // TC-DELETE-003: 삭제 권한 없음 - 타인 질문
  it('본인 질문이면 삭제 가능', () => {
    expect(canDeleteQuestion('사용자1', '사용자1')).toBe(true);
  });

  it('타인 질문이면 삭제 불가', () => {
    expect(canDeleteQuestion('사용자1', '사용자2')).toBe(false);
  });

  it('로그아웃 상태면 삭제 불가', () => {
    expect(canDeleteQuestion('사용자1', '')).toBe(false);
  });
});
