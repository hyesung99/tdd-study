import { describe, it, expect } from 'vitest';
import {
  toggleResolution,
  canToggleResolution,
  getResolutionStatus,
} from './resolution';

describe('toggleResolution', () => {
  // TC-DETAIL-006: 해결 여부 토글 (작성자)
  it('미해결 상태를 해결됨으로 변경', () => {
    expect(toggleResolution(false)).toBe(true);
  });

  it('해결됨 상태를 미해결로 변경', () => {
    expect(toggleResolution(true)).toBe(false);
  });

  it('연속으로 토글하면 원래 상태로 돌아옴', () => {
    const initial = false;
    const afterFirst = toggleResolution(initial);
    const afterSecond = toggleResolution(afterFirst);
    expect(afterSecond).toBe(initial);
  });
});

describe('canToggleResolution', () => {
  // TC-DETAIL-003: 작성자 권한 - 본인 질문
  it('작성자 본인이면 해결 여부 토글 가능', () => {
    expect(canToggleResolution('사용자1', '사용자1')).toBe(true);
  });

  // TC-DETAIL-004: 작성자 권한 - 타인 질문
  it('작성자가 아니면 해결 여부 토글 불가', () => {
    expect(canToggleResolution('사용자1', '사용자2')).toBe(false);
  });

  it('빈 사용자 ID면 토글 불가', () => {
    expect(canToggleResolution('사용자1', '')).toBe(false);
  });

  it('빈 작성자 ID면 토글 불가', () => {
    expect(canToggleResolution('', '사용자1')).toBe(false);
  });
});

describe('getResolutionStatus', () => {
  it('해결됨 상태면 "해결됨" 반환', () => {
    expect(getResolutionStatus(true)).toBe('해결됨');
  });

  it('미해결 상태면 "미해결" 반환', () => {
    expect(getResolutionStatus(false)).toBe('미해결');
  });
});
