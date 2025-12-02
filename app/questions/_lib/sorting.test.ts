import { describe, it, expect } from "vitest";
import {
  sortByDate,
  sortByLikes,
  sortByComments,
  sortQuestions,
} from "./sorting";
import type { Question } from "../_types";

const mockQuestions: Question[] = [
  {
    id: "1",
    title: "질문 1",
    content: "내용 1",
    category: "React",
    author: "작성자1",
    createdAt: new Date("2024-01-01"),
    isResolved: false,
    likeCount: 5,
    commentCount: 3,
    isPublic: true,
  },
  {
    id: "2",
    title: "질문 2",
    content: "내용 2",
    category: "Next.js",
    author: "작성자2",
    createdAt: new Date("2024-01-03"),
    isResolved: true,
    likeCount: 10,
    commentCount: 7,
    isPublic: true,
  },
  {
    id: "3",
    title: "질문 3",
    content: "내용 3",
    category: "TypeScript",
    author: "작성자3",
    createdAt: new Date("2024-01-02"),
    isResolved: false,
    likeCount: 8,
    commentCount: 5,
    isPublic: true,
  },
  {
    id: "4",
    title: "질문 4",
    content: "내용 4",
    category: "React",
    author: "작성자4",
    createdAt: new Date("2024-01-04"),
    isResolved: true,
    likeCount: 3,
    commentCount: 10,
    isPublic: true,
  },
];

describe("sortByDate", () => {
  it("최신순으로 정렬 (내림차순)", () => {
    const result = sortByDate([...mockQuestions]);
    expect(result[0].id).toBe("4");
    expect(result[1].id).toBe("2");
    expect(result[2].id).toBe("3");
    expect(result[3].id).toBe("1");
  });

  it("원본 배열을 변경하지 않음", () => {
    const original = [...mockQuestions];
    const originalFirstId = original[0].id;
    sortByDate(original);
    expect(original[0].id).toBe(originalFirstId);
  });

  it("빈 배열을 받으면 빈 배열 반환", () => {
    const result = sortByDate([]);
    expect(result).toHaveLength(0);
  });

  it("질문이 1개만 있어도 정상 동작", () => {
    const result = sortByDate([mockQuestions[0]]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});

describe("sortByLikes", () => {
  it("좋아요 많은 순으로 정렬 (내림차순)", () => {
    const result = sortByLikes([...mockQuestions]);
    expect(result[0].id).toBe("2"); // 10 likes
    expect(result[1].id).toBe("3"); // 8 likes
    expect(result[2].id).toBe("1"); // 5 likes
    expect(result[3].id).toBe("4"); // 3 likes
  });

  it("좋아요 수가 같으면 최신순으로 정렬", () => {
    const questionsWithSameLikes: Question[] = [
      { ...mockQuestions[0], likeCount: 5, createdAt: new Date("2024-01-01") },
      { ...mockQuestions[1], likeCount: 5, createdAt: new Date("2024-01-03") },
      { ...mockQuestions[2], likeCount: 5, createdAt: new Date("2024-01-02") },
    ];
    const result = sortByLikes(questionsWithSameLikes);
    expect(result[0].createdAt.getTime()).toBeGreaterThan(
      result[1].createdAt.getTime()
    );
    expect(result[1].createdAt.getTime()).toBeGreaterThan(
      result[2].createdAt.getTime()
    );
  });

  it("원본 배열을 변경하지 않음", () => {
    const original = [...mockQuestions];
    const originalFirstId = original[0].id;
    sortByLikes(original);
    expect(original[0].id).toBe(originalFirstId);
  });

  it("빈 배열을 받으면 빈 배열 반환", () => {
    const result = sortByLikes([]);
    expect(result).toHaveLength(0);
  });
});

describe("sortByComments", () => {
  it("댓글 많은 순으로 정렬 (내림차순)", () => {
    const result = sortByComments([...mockQuestions]);
    expect(result[0].id).toBe("4"); // 10 comments
    expect(result[1].id).toBe("2"); // 7 comments
    expect(result[2].id).toBe("3"); // 5 comments
    expect(result[3].id).toBe("1"); // 3 comments
  });

  it("댓글 수가 같으면 최신순으로 정렬", () => {
    const questionsWithSameComments: Question[] = [
      {
        ...mockQuestions[0],
        commentCount: 5,
        createdAt: new Date("2024-01-01"),
      },
      {
        ...mockQuestions[1],
        commentCount: 5,
        createdAt: new Date("2024-01-03"),
      },
      {
        ...mockQuestions[2],
        commentCount: 5,
        createdAt: new Date("2024-01-02"),
      },
    ];
    const result = sortByComments(questionsWithSameComments);
    expect(result[0].createdAt.getTime()).toBeGreaterThan(
      result[1].createdAt.getTime()
    );
    expect(result[1].createdAt.getTime()).toBeGreaterThan(
      result[2].createdAt.getTime()
    );
  });

  it("원본 배열을 변경하지 않음", () => {
    const original = [...mockQuestions];
    const originalFirstId = original[0].id;
    sortByComments(original);
    expect(original[0].id).toBe(originalFirstId);
  });

  it("빈 배열을 받으면 빈 배열 반환", () => {
    const result = sortByComments([]);
    expect(result).toHaveLength(0);
  });
});

describe("sortQuestions", () => {
  it('sortOption이 "latest"이면 최신순 정렬', () => {
    const result = sortQuestions([...mockQuestions], "latest");
    expect(result[0].id).toBe("4");
  });

  it('sortOption이 "likes"이면 좋아요순 정렬', () => {
    const result = sortQuestions([...mockQuestions], "likes");
    expect(result[0].id).toBe("2");
  });

  it('sortOption이 "comments"이면 댓글순 정렬', () => {
    const result = sortQuestions([...mockQuestions], "comments");
    expect(result[0].id).toBe("4");
  });

  it("sortOption이 없으면 최신순 정렬 (기본값)", () => {
    const result = sortQuestions([...mockQuestions], undefined);
    expect(result[0].id).toBe("4");
  });
});
