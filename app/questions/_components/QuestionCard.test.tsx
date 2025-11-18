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
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it('댓글 수를 렌더링', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText(/3/)).toBeInTheDocument();
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
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });

  it('댓글이 0일 때도 표시', () => {
    const questionWithZeroComments = { ...mockQuestion, commentCount: 0 };
    render(<QuestionCard question={questionWithZeroComments} />);
    expect(screen.getByText(/0/)).toBeInTheDocument();
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
});
