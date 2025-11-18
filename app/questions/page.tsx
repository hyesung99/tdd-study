import QuestionCard from './_components/QuestionCard';
import type { Question } from './_types';

// Mock data for demonstration
const mockQuestions: Question[] = [
  {
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
  },
  {
    id: '2',
    title: 'Next.js 라우팅 문제 해결했습니다',
    content: 'Next.js에서 동적 라우팅은 어떻게 구현하나요?',
    category: 'Next.js',
    author: '이영희',
    createdAt: new Date('2024-01-16'),
    isResolved: true,
    likeCount: 10,
    commentCount: 7,
    isPublic: true,
  },
  {
    id: '3',
    title: 'TypeScript 제네릭 타입 이해하기',
    content: 'TypeScript에서 제네릭 타입을 어떻게 사용하나요?',
    category: 'TypeScript',
    author: '박민수',
    createdAt: new Date('2024-01-17'),
    isResolved: false,
    likeCount: 8,
    commentCount: 5,
    isPublic: true,
  },
  {
    id: '4',
    title: 'React 최적화 방법 정리',
    content: 'React 컴포넌트 리렌더링을 최적화하는 방법은?',
    category: 'React',
    author: '최지훈',
    createdAt: new Date('2024-01-18'),
    isResolved: true,
    likeCount: 15,
    commentCount: 10,
    isPublic: true,
  },
  {
    id: '5',
    title: 'Tailwind CSS 다크모드 적용',
    content: 'Tailwind CSS에서 다크모드를 어떻게 구현하나요?',
    category: 'CSS',
    author: '정수진',
    createdAt: new Date('2024-01-19'),
    isResolved: false,
    likeCount: 12,
    commentCount: 8,
    isPublic: true,
  },
  {
    id: '6',
    title: 'Vitest와 Jest 비교',
    content: 'Vitest와 Jest의 차이점과 선택 기준은 무엇인가요?',
    category: 'Testing',
    author: '강민호',
    createdAt: new Date('2024-01-20'),
    isResolved: true,
    likeCount: 20,
    commentCount: 15,
    isPublic: true,
  },
];

export default function QuestionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">질문 목록</h2>
          <p className="text-muted-foreground mt-2">
            총 {mockQuestions.length}개의 질문
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {mockQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {mockQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            아직 등록된 질문이 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
