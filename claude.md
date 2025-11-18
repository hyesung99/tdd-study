# TDD Learning Project Guide

## Project Overview

This is a **Frontend TDD (Test-Driven Development) practice Q&A board** project.

- **Purpose**: Learning test code writing through TDD cycle
- **Approach**: Focus on **writing diverse test cases** rather than feature completion
- **Implementation Complexity**: Keep it low, but create diverse scenarios horizontally

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **Library**: React 19.2.0
- **Language**: TypeScript (strict mode)
- **Test Framework**: Vitest 4.0.10
- **Test Utilities**: @testing-library/react (needs installation)
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

## TDD Workflow

This project strictly follows the **Red → Green → Refactor** cycle.

### 1. Red (Write Failing Test)

```bash
# Run tests
npm run test

# Run test UI dashboard
npm run test:ui
```

- Write the test **first** for the feature you want to implement
- The test should naturally fail (no implementation yet)
- Ensure the test case is clear and specific

### 2. Green (Minimum Implementation to Pass Test)

- Write only the **minimum code** to pass the test
- Don't consider perfect structure or abstraction
- Move to the next step once the test passes

### 3. Refactor (Refactoring)

- Improve the code while tests are passing
- Remove duplication, improve readability, enhance structure
- Verify tests still pass after refactoring

## Test Writing Priority

Refer to README.md specs and write tests in this order:

### Phase 1: Unit Tests (Utility Functions)

**Input Validation Functions**

- Title validation (2-50 characters)
- Content validation (10-2000 characters)
- Required field validation (title, content, category, visibility)

**Filtering Logic**

- Filter by search keyword in title/content
- Filter by category
- Filter by resolution status
- Complex condition filtering (search + category + resolution)

**Sorting Logic**

- Sort by latest (by creation date)
- Sort by likes
- Sort by comment count

**Like Toggle Logic**

- Add like (+1)
- Remove like (-1)
- Toggle based on current state

### Phase 2: Component Tests

**QuestionCard Component**

- Render title, category, author, date based on props
- Display resolution status badge (unresolved/resolved)
- Display comment count and like count

**QuestionForm Component**

- Render input fields (title, content, category, visibility)
- Display error messages for missing required fields
- Display error messages for length violations
- Block submission on validation failure

**CommentList Component**

- Render comment list
- Show delete button only to author

### Phase 3: Integration Tests (Page Level)

**Question List Page (`/questions`)**

- Display question list on initial render
- Filter on search keyword input
- Update list on category filter change
- Update list on resolution filter change
- Re-sort list on sort option change
- Display loading state
- Display error state
- Display empty state message

**Question Detail Page (`/questions/:id`)**

- Render question info (title, content, author, date, category, resolution)
- Render comment list
- Like button toggle action
- Increase/decrease like count
- Resolution toggle (author only)
- Comment creation
- Comment deletion (author only)
- Show edit/delete buttons (author only)

**Question Create/Edit Page (`/questions/new`, `/questions/:id/edit`)**

- Render input fields
- Real-time validation
- Display error messages
- API call on submit
- Navigate to detail page on success
- Load existing data in edit mode

## Development Guidelines

### Required Rules

1. **Write Tests First**

   - Always write tests before implementation
   - Express "how should this feature work?" through tests

2. **Pass One Test at a Time**

   - Don't implement multiple features simultaneously
   - Iterate in small units

3. **Follow TypeScript strict Mode**

   - Prioritize type safety
   - Avoid using `any` type

4. **Use Path Aliases**
   - Use absolute paths with `@/*` format
   - Example: `import { validateTitle } from '@/lib/validation'`

### Design & UI Guidelines

**Do NOT design from scratch. Use existing component libraries and design references.**

#### Recommended Component Libraries

1. **shadcn/ui** (Recommended)

   - Built on Tailwind CSS and Radix UI
   - Perfect for Next.js App Router
   - Copy-paste components (not npm package)
   - Installation: `npx shadcn@latest init`
   - Docs: https://ui.shadcn.com/

2. **Radix UI Primitives**

   - Unstyled, accessible components
   - Excellent for custom styling
   - Docs: https://www.radix-ui.com/

3. **Other Options**
   - Headless UI (by Tailwind team)
   - NextUI
   - Mantine

#### Design References

Use these as inspiration for layouts and UI patterns:

1. **Linear.app** (https://linear.app)

   - Clean, modern, minimal design
   - Excellent interaction patterns
   - Great for forms and list views

2. **GitHub Discussions**

   - Q&A board reference
   - Good comment threading patterns
   - Clear status indicators (resolved/unresolved)

3. **Stack Overflow**
   - Question/answer layout inspiration
   - Vote/like button patterns
   - Tag/category displays

#### UI Implementation Principles

- **Use component libraries**: Don't build buttons, inputs, dropdowns from scratch
- **Accessibility first**: Use components with built-in a11y (ARIA labels, keyboard navigation)
- **Consistent design system**: Stick to one library's design patterns
- **Mobile-responsive**: Ensure all layouts work on mobile devices
- **Focus on functionality**: Since this is a TDD practice project, pretty UI is secondary to working tests

### API Mocking Strategy

**Do NOT use MSW as it's not supported in Next.js App Router.**

Use these methods instead:

1. **Use Vitest's `vi.fn()`**

```typescript
// Example
const mockFetch = vi.fn();
global.fetch = mockFetch;

mockFetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ id: 1, title: "Test Question" }),
});
```

2. **Next.js fetch mocking**

```typescript
// Example
vi.mock("next/cache", () => ({
  unstable_cache: vi.fn((fn) => fn),
}));
```

3. **Mock separate API layer modules**

```typescript
// Example: @/lib/api/questions
vi.mock("@/lib/api/questions", () => ({
  fetchQuestions: vi.fn(),
  createQuestion: vi.fn(),
}));
```

### Test File Structure

```
src/
├── lib/
│   ├── validation.ts
│   └── validation.test.ts          # Unit tests
├── components/
│   ├── QuestionCard.tsx
│   └── QuestionCard.test.tsx       # Component tests
└── app/
    ├── questions/
    │   ├── page.tsx
    │   └── page.test.tsx           # Integration tests
    └── questions/[id]/
        ├── page.tsx
        └── page.test.tsx           # Integration tests
```

## Initial Setup Checklist

Check/install these before starting:

- [ ] Install `@testing-library/react`
- [ ] Install `@testing-library/user-event` (for user interaction tests)
- [ ] Install `@testing-library/jest-dom` (for matcher extensions)
- [ ] Create and configure `vitest.config.ts`
- [ ] Configure `jsdom` environment (browser environment simulation)
- [ ] Set up React component test environment

## Test Case Writing Tips

### Use Given-When-Then Pattern

README.md's functional requirements are written in Given-When-Then format.
Convert them directly into test code:

```typescript
// Example: README.md 5.1 Question List - 2) Search
describe("Question list search", () => {
  it("displays only questions containing search keyword in title or content", async () => {
    // Given: User enters search keyword
    const { user } = render(<QuestionListPage />);
    const searchInput = screen.getByLabelText("Search title/content");

    // When: Press enter or search button
    await user.type(searchInput, "React");
    await user.keyboard("{Enter}");

    // Then: Only questions containing keyword are displayed
    expect(screen.getByText("React Question")).toBeInTheDocument();
    expect(screen.queryByText("JavaScript Question")).not.toBeInTheDocument();
  });
});
```

### Consider Various Edge Cases

- **Boundary Testing**: minimum, maximum, exceeding values
- **Empty State**: when there's no data
- **Loading State**: during API request
- **Error State**: when API request fails
- **Permissions**: distinguish author/non-author
- **Toggle**: active/inactive state transitions

## Notes

1. **Not a Production Service**

   - No backend implementation
   - Handle authentication/authorization with simple mocking

2. **Focus on Learning Over Completion**

   - No need to implement all features
   - Goal is to write diverse test cases

3. **Pair Programming Recommended**

   - TDD is more effective with pairs
   - One person writes tests, another writes implementation

4. **Don't Fear Refactoring**
   - Tests make refactoring safe
   - Don't hesitate to improve code quality

## References

- [Vitest Official Docs](https://vitest.dev/)
- [Testing Library Official Docs](https://testing-library.com/)
- [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing/vitest)
- [Shadcn guide](https://ui.shadcn.com/docs/components)

---

**The core of TDD is "design with tests, implement with code".**

Iterate in small units and progressively complete features!
