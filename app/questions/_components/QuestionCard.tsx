import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, Calendar, User, Lock } from 'lucide-react';
import type { Question } from '../_types';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const formattedDate = new Date(question.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/questions/${question.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold leading-tight flex-1">
              {question.title}
            </h3>
            <Badge
              className={
                question.isResolved
                  ? 'resolved bg-green-100 text-green-800 hover:bg-green-100'
                  : 'unresolved bg-amber-100 text-amber-800 hover:bg-amber-100'
              }
            >
              {question.isResolved ? '해결됨' : '미해결'}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {question.category}
            </Badge>
            {!question.isPublic && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Lock className="h-3 w-3" />
                비공개
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{question.author}</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{question.likeCount}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{question.commentCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
