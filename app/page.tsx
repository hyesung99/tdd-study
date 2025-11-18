import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="container max-w-4xl px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Q&A Board
            </h1>
            <p className="text-xl text-muted-foreground">
              프론트엔드 개발 질문과 답변을 공유하는 TDD 학습 프로젝트
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/questions">
              <Button size="lg" className="text-lg">
                질문 목록 보기
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Test-Driven Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Red → Green → Refactor 사이클로 안전하고 견고한 코드를 작성합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TypeScript</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Strict 모드로 타입 안정성을 보장하며 개발합니다
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modern Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Next.js 16, React 19, Vitest로 최신 기술을 경험합니다
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
