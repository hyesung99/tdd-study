import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionCard from './QuestionCard';
import type { Question } from '../_types';

const mockQuestion: Question = {
  id: '1',
  title: 'React 상태 관리 질문',
  content: 'useState와 useReducer의 차이점이 무엇인가요?',
  category: 'React',
  author: '김철수',
  createdAt: new Date('2024-01-15'),
  isResolved: false,
  likeCount: 5,
  commentCount: 3,
  isPublic: true,
};

describe('QuestionCard', () => {
  it('질문 제목을 렌더링', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText('React 상태 관리 질문')).toBeInTheDocument();
  });

  it('질문 카테고리를 렌더링', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('작성자 이름을 렌더링', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText(/김철수/)).toBeInTheDocument();
  });

  it('작성 날짜를 렌더링', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('좋아요 수를 렌더링', () => {
    render(<QuestionCard question={mockQuestion} />);
    const likeElements = screen.getAllByText(/5/);
    expect(likeElements.length).toBeGreaterThanOrEqual(1);
  });

  it('댓글 수를 렌더링', () => {
    render(<QuestionCard question={mockQuestion} />);
    const commentElements = screen.getAllByText(/3/);
    expect(commentElements.length).toBeGreaterThanOrEqual(1);
  });

  it('미해결 상태일 때 "미해결" 뱃지를 표시', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText('미해결')).toBeInTheDocument();
  });

  it('해결 상태일 때 "해결됨" 뱃지를 표시', () => {
    const resolvedQuestion = { ...mockQuestion, isResolved: true };
    render(<QuestionCard question={resolvedQuestion} />);
    expect(screen.getByText('해결됨')).toBeInTheDocument();
  });

  it('해결됨 뱃지에는 resolved 클래스가 있음', () => {
    const resolvedQuestion = { ...mockQuestion, isResolved: true };
    render(<QuestionCard question={resolvedQuestion} />);
    const badge = screen.getByText('해결됨');
    expect(badge).toHaveClass('resolved');
  });

  it('미해결 뱃지에는 unresolved 클래스가 있음', () => {
    render(<QuestionCard question={mockQuestion} />);
    const badge = screen.getByText('미해결');
    expect(badge).toHaveClass('unresolved');
  });

  it('좋아요가 0일 때도 표시', () => {
    const questionWithZeroLikes = { ...mockQuestion, likeCount: 0 };
    render(<QuestionCard question={questionWithZeroLikes} />);
    // 좋아요 수가 0으로 표시되는지 확인 (날짜에서 0이 나올 수 있으므로 getAllByText 사용)
    const zeroElements = screen.getAllByText(/^0$/);
    expect(zeroElements.length).toBeGreaterThanOrEqual(1);
  });

  it('댓글이 0일 때도 표시', () => {
    const questionWithZeroComments = { ...mockQuestion, commentCount: 0 };
    render(<QuestionCard question={questionWithZeroComments} />);
    // 댓글 수가 0으로 표시되는지 확인
    const zeroElements = screen.getAllByText(/^0$/);
    expect(zeroElements.length).toBeGreaterThanOrEqual(1);
  });

  it('카드 클릭 시 질문 상세 페이지로 이동하는 링크가 있음', () => {
    render(<QuestionCard question={mockQuestion} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/questions/1');
  });

  it('질문 내용(content)은 카드에 표시되지 않음', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.queryByText('useState와 useReducer의 차이점이 무엇인가요?')).not.toBeInTheDocument();
  });

  // TC-LIST-003: 비공개 질문 표시
  it('비공개 질문일 때 비공개 아이콘/텍스트가 표시됨', () => {
    const privateQuestion = { ...mockQuestion, isPublic: false };
    render(<QuestionCard question={privateQuestion} />);
    expect(screen.getByText('비공개')).toBeInTheDocument();
  });

  it('공개 질문일 때 비공개 표시가 없음', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.queryByText('비공개')).not.toBeInTheDocument();
  });
});
