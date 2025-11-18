import { describe, it, expect } from 'vitest';
import { validateTitle, validateContent, validateRequiredFields } from './validation';

describe('validateTitle', () => {
  it('제목이 2자 미만이면 유효하지 않음', () => {
    const result = validateTitle('1');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('제목은 2자 이상이어야 합니다.');
  });

  it('제목이 50자를 초과하면 유효하지 않음', () => {
    const result = validateTitle('a'.repeat(51));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('제목은 50자 이하여야 합니다.');
  });

  it('제목이 2-50자 사이면 유효함', () => {
    const result = validateTitle('유효한 제목입니다');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('제목이 빈 문자열이면 유효하지 않음', () => {
    const result = validateTitle('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('제목은 2자 이상이어야 합니다.');
  });

  it('제목이 공백만 있으면 유효하지 않음', () => {
    const result = validateTitle('   ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('제목은 2자 이상이어야 합니다.');
  });
});

describe('validateContent', () => {
  it('내용이 10자 미만이면 유효하지 않음', () => {
    const result = validateContent('짧은내용');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('내용은 10자 이상이어야 합니다.');
  });

  it('내용이 2000자를 초과하면 유효하지 않음', () => {
    const result = validateContent('a'.repeat(2001));
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('내용은 2000자 이하여야 합니다.');
  });

  it('내용이 10-2000자 사이면 유효함', () => {
    const result = validateContent('이것은 유효한 내용입니다. 충분한 길이를 가지고 있습니다.');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('내용이 빈 문자열이면 유효하지 않음', () => {
    const result = validateContent('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('내용은 10자 이상이어야 합니다.');
  });

  it('내용이 공백만 있으면 유효하지 않음', () => {
    const result = validateContent('          ');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('내용은 10자 이상이어야 합니다.');
  });
});

describe('validateRequiredFields', () => {
  it('제목이 없으면 유효하지 않음', () => {
    const result = validateRequiredFields({
      title: '',
      content: '유효한 내용입니다만 제목이 없습니다.',
      category: 'React',
      isPublic: true,
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('제목은 필수입니다.');
  });

  it('내용이 없으면 유효하지 않음', () => {
    const result = validateRequiredFields({
      title: '유효한 제목',
      content: '',
      category: 'React',
      isPublic: true,
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('내용은 필수입니다.');
  });

  it('카테고리가 없으면 유효하지 않음', () => {
    const result = validateRequiredFields({
      title: '유효한 제목',
      content: '유효한 내용입니다만 카테고리가 없습니다.',
      category: '',
      isPublic: true,
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('카테고리는 필수입니다.');
  });

  it('공개 여부가 undefined이면 유효하지 않음', () => {
    const result = validateRequiredFields({
      title: '유효한 제목',
      content: '유효한 내용입니다만 공개여부가 없습니다.',
      category: 'React',
      isPublic: undefined,
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('공개 여부는 필수입니다.');
  });

  it('모든 필수 필드가 있으면 유효함', () => {
    const result = validateRequiredFields({
      title: '유효한 제목',
      content: '유효한 내용입니다. 모든 필드가 존재합니다.',
      category: 'React',
      isPublic: true,
    });
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });
});
