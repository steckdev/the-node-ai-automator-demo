# Detailed Demo Scripts & Code Examples

## **DEMO 1: LEGACY REFACTORING** _(7 minutes)_

### Pre-Demo Setup:

- Have VS Code open with the legacy code file
- Ensure AI tool (Cursor/Copilot) is active
- Have terminal ready for testing

### **BEFORE CODE** (Display for 1 minute)

```javascript
// legacy-user-endpoint.js - The "Before" Example
const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Basic validation
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  // First database call - get user
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, userResult) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult[0];

    // Second database call - get user's posts
    db.query('SELECT * FROM posts WHERE user_id = ?', [userId], (err, postsResult) => {
      if (err) {
        console.log('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Third database call - get user's comments
      db.query('SELECT * FROM comments WHERE user_id = ?', [userId], (err, commentsResult) => {
        if (err) {
          console.log('Database error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Finally return the combined data
        res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
          },
          posts: postsResult,
          comments: commentsResult,
          total_posts: postsResult.length,
          total_comments: commentsResult.length,
        });
      });
    });
  });
});

module.exports = app;
```

### **LIVE DEMO SCRIPT:**

#### **Step 1: Problem Analysis** _(1 minute)_

**Say to audience:**
"Look at this code - classic Node.js callback hell. Three nested database calls, repeated error handling, no separation of concerns. This is maintainability nightmare. Let's fix it with AI."

**Point out specific issues:**

- Callback nesting (pyramid of doom)
- Repeated error handling code
- Database logic mixed with HTTP logic
- No input validation middleware
- Inconsistent error responses

#### **Step 2: Craft the AI Prompt** _(1 minute)_

**Show typing this prompt:**

```
Refactor this Node.js Express endpoint to modern standards:

REQUIREMENTS:
- Convert to TypeScript with proper types
- Use async/await instead of callbacks
- Implement repository pattern for database access
- Add proper error handling with custom exceptions
- Create validation middleware for input
- Follow clean, framework-agnostic architecture patterns
- Maintain same API contract
- Add comprehensive error logging
- Include JSDoc documentation

CONTEXT:
- This is part of a user management microservice
- We use PostgreSQL with TypeORM
- Error responses should be consistent across the API
- Need to support pagination for posts/comments in future
```

**Say to audience:**
"Notice how specific this prompt is. I'm not just saying 'make it better' - I'm providing context, requirements, and architectural guidance."

#### **Step 3: AI Generation Process** _(2 minutes)_

**Show AI generating the code in real-time:**

**First, the controller:**

```typescript
// users.routes.ts (Express example)
import { Router } from 'express';
import { UsersService } from './users.service';

export const usersRouter = Router();

usersRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

  try {
    const user = await UsersService.findOneWithRelations(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});
```

**Then, the service layer:**

```typescript
// users.service.ts (framework-agnostic)
import { UsersRepository } from './users.repository';
import { UserWithRelationsDto } from './dto/user-with-relations.dto';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOneWithRelations(id: number): Promise<UserWithRelationsDto | null> {
    try {
      const user = await this.usersRepository.findOneWithRelations(id);
      if (!user) return null;

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        posts: user.posts,
        comments: user.comments,
        totalPosts: user.posts.length,
        totalComments: user.comments.length,
      };
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  }
}
```

#### **Step 4: Review & Validation** _(1.5 minutes)_

**Say to audience:**
"Now I review the AI output. I'm checking for:"

**Point out improvements:**

- ✅ Proper TypeScript types
- ✅ Separation of concerns (Controller → Service → Repository)
- ✅ Async/await pattern
- ✅ Consistent error handling
- ✅ Logging and monitoring
- ✅ API documentation with Swagger
- ✅ Input validation with pipes

**Show quick test:**

```bash
npm test users.controller.spec.ts
```

#### **Step 5: Key Takeaways** _(1.5 minutes)_

**Metrics to highlight:**

- **Before**: 45 lines of nested callbacks
- **After**: Clean, testable, maintainable architecture
- **Time saved**: 3 hours → 15 minutes
- **Quality improved**: Type safety, error handling, documentation

**Say to audience:**
"This isn't just about speed - it's about quality. The AI suggested patterns I might not have thought of, like the proper DTO structure and comprehensive logging."

---

## **DEMO 2: TDD ACCELERATION** _(7 minutes)_

### Pre-Demo Setup:

- Node.js project with Jest and E2E tests configured
- GitHub Issue #2 created and open in browser
- AI tool with MCP connection ready
- Terminal for running tests
- `src/users-posts.e2e.spec.ts` file with failing tests

### **SLIDE INTERACTION:** _(1.5 minutes)_

#### **Show Slide 10 - Demo 2**

**Say to audience:**
"This slide shows our TDD workflow. Let me show you what's inside each phase."

**Click RED Panel (left side):**
"Here's the RED phase - we have GitHub Issue #2 requesting a new endpoint: GET /users/:id/posts. I've already written E2E tests following TDD principles. Notice the test expectations and the failing result - 2 failed, 1 passed. The endpoint doesn't exist yet."

**Click GREEN Panel (right side):**
"And here's what AI will generate in the GREEN phase - a complete controller, service layer, and all tests passing. Let's see this live."

### **LIVE DEMO SCRIPT:**

#### **Step 1: Show GitHub Issue** _(30 seconds)_

**Open GitHub Issue #2 in browser:**

**Say to audience:**
"Here's our real GitHub issue. It describes the feature we need: an endpoint that returns a user's posts along with their information. This is our requirement document."

**Show issue details:**
- Title: "Feature: Add GET /users/:id/posts endpoint"
- Requirements: Return user posts with user info, handle 404 and 400 errors
- Labels: enhancement, demo, tdd

#### **Step 2: Show Failing Tests (RED Phase)** _(1 minute)_

**Open `src/users-posts.e2e.spec.ts` in editor:**

**Say to audience:**
"I've already written the E2E tests. This is proper TDD - write the test first. Let's run them."

**Run in terminal:**
```bash
npm run test:e2e
```

**Point out the results:**
"See? 2 failed, 1 passed. The endpoint doesn't exist, so we're in the RED phase. This is exactly where we want to be for TDD."

#### **Step 3: AI Implementation (GREEN Phase)** _(2.5 minutes)_

**Open AI assistant with MCP connection:**

**Say to audience:**
"Now I'll ask AI to implement this feature. The key is that AI has MCP access to our codebase, so it understands our existing patterns."

**Show this prompt:**

```
You are connected to this project via MCP. Implement GitHub Issue #2:
Add GET /users/:id/posts endpoint.

Requirements from the failing E2E tests:
- Return user posts with user information (id, name, email)
- Return posts array with id, title, content, createdAt
- Return totalPosts count
- Return 404 if user not found
- Return 400 for invalid user ID format

Follow existing patterns from the users and posts modules.
Make all E2E tests in src/users-posts.e2e.spec.ts pass.
```

**Watch AI generate code:**

**Say to audience:**
"Watch as AI generates the implementation. It's reading our existing codebase patterns through MCP and following them."

**AI generates:**
1. `src/modern/users/users.controller.ts` - Controller with getUserPosts method
2. `src/modern/users/users.service.ts` - Service layer with business logic
3. `src/modern/users/dto/user-posts-response.dto.ts` - Type-safe response DTO
4. Updates `src/main.ts` - Wires up the route
5. Updates OpenAPI spec - Adds Swagger documentation

**Point out key patterns:**
"Notice how AI followed our existing patterns:
- Same error handling as other controllers
- Same DTO structure as posts module
- Same service injection pattern
- Consistent with our TypeScript strict mode"

#### **Step 4: Run Tests Again (GREEN Phase)** _(1 minute)_

**Run in terminal:**
```bash
npm run test:e2e
```

**Show results:**
"And now all tests pass! 3 passed, 0 failed. We've completed the GREEN phase."

**Test the actual endpoint:**
```bash
curl http://localhost:3000/users/user-123/posts | jq
```

**Show response:**
```json
{
  "user": {
    "id": "user-123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "posts": [
    {
      "id": "post-1",
      "title": "My First Post",
      "content": "Hello world!",
      "createdAt": "2025-09-30T10:00:00.000Z"
    }
  ],
  "totalPosts": 1
}
```

**Say to audience:**
"Perfect! The endpoint works exactly as specified in the GitHub issue and tests."

#### **Step 5: Show Generated Code** _(1 minute)_

**Open `src/modern/users/users.controller.ts`:**

**Highlight key sections:**
```typescript
// Controller method
async getUserPosts(req: Request, res: Response) {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const result = await this.usersService.getUserPosts(userId);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

**Say to audience:**
"Notice the error handling - 400 for invalid input, 404 for not found, 500 for server errors. This matches our existing patterns perfectly."

#### **Step 6: Key Metrics** _(30 seconds)_

**Highlight the results:**

- **Traditional approach**: 2-3 hours (write controller, service, DTOs, tests, docs)
- **AI-accelerated time**: 7 minutes (from failing test to working endpoint)
- **Time savings**: 95%
- **Test coverage**: 100% (all E2E tests passing)
- **Code quality**: Follows existing patterns, type-safe, documented

**Say to audience:**
"7 minutes from failing test to production-ready endpoint. That's a 95% time savings while maintaining TDD discipline and code quality."

---

## **DEMO 3: CI/CD + PR REVIEWS** _(5 minutes)_

### Pre-Demo Setup:

- GitHub repository open
- GitHub Actions tab ready
- Example PR prepared
- Copilot PR review enabled

### **LIVE DEMO SCRIPT:**

#### **Step 1: Pipeline Generation** _(2 minutes)_

**Show GitHub Actions prompt:**

```
Create a production-ready GitHub Actions workflow for a Node.js TypeScript application:

PIPELINE REQUIREMENTS:
- Matrix builds: Node.js 18, 20, 22
- TypeScript compilation and linting (ESLint + Prettier)
- Jest tests with coverage reporting (minimum 80%)
- Security scanning (npm audit, Snyk, CodeQL)
- Docker image build and push to registry
- Automated deployment to staging environment
- Performance testing with Artillery
- Slack notifications for failures
- Conditional deployment to production (manual approval)

CONTEXT:
- Microservice architecture
- PostgreSQL database
- Redis for caching
- Kubernetes deployment
- Monitoring with DataDog
```

**Show generated workflow file:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Run tests
        run: npm run test:coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: Run CodeQL analysis
        uses: github/codeql-action/init@v2
        with:
          languages: javascript

  build:
    needs: [test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          docker build -t ${{ github.repository }}:${{ github.sha }} .
          docker tag ${{ github.repository }}:${{ github.sha }} ${{ github.repository }}:latest

      - name: Push to registry
        if: github.ref == 'refs/heads/main'
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push ${{ github.repository }}:${{ github.sha }}
          docker push ${{ github.repository }}:latest

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to staging
        run: |
          kubectl set image deployment/api api=${{ github.repository }}:${{ github.sha }}
          kubectl rollout status deployment/api

      - name: Run performance tests
        run: |
          npm install -g artillery
          artillery run performance-tests.yml
```

#### **Step 2: PR Review Demo** _(2 minutes)_

**Show existing PR with Copilot review:**

**Display PR description:**
"Add user authentication endpoints with JWT tokens"

**Show Copilot's automated review comments:**

````markdown
🤖 **GitHub Copilot Review**

**Security Concerns:**

- Line 45: Consider using a more secure JWT secret rotation strategy
- Line 67: Password validation should include minimum entropy requirements
- Line 89: Rate limiting implementation needs IP whitelist for internal services

**Performance Issues:**

- Line 123: Database query could benefit from indexing on email field
- Line 156: Consider caching JWT validation results for frequently accessed tokens

**Code Quality:**

- Line 78: Extract password hashing logic into a separate utility function
- Line 134: Add JSDoc documentation for public API methods
- Line 167: Consider using enum for user roles instead of string literals

**Testing Gaps:**

- Missing integration tests for rate limiting behavior
- No tests for JWT token expiration scenarios
- Edge case testing needed for malformed email inputs

**Suggested Improvements:**

```typescript
// Instead of:
const isValid = password.length > 8;

// Consider:
const isValid = this.passwordValidator.validate(password, {
  minLength: 8,
  requireSpecialChars: true,
  minEntropy: 3.0,
});
```
````

**Deployment Readiness: ⚠️ Needs attention**

- Add health check endpoint
- Include database migration strategy
- Configure monitoring alerts

````

#### **Step 3: Security Integration** *(1 minute)*
**Show security scan results:**
```bash
# Snyk scan results
✅ No high severity vulnerabilities found
⚠️  2 medium severity issues:
   - jsonwebtoken@8.5.1 (upgrade to 9.0.0+)
   - bcrypt@5.0.1 (upgrade to 5.1.0+)

# CodeQL results
✅ No security hotspots detected
✅ No SQL injection vulnerabilities
✅ No XSS vulnerabilities
````

**Say to audience:**
"AI doesn't just find problems - it provides actionable solutions with specific version recommendations and code examples."

#### **Key Takeaways:**

- **Pipeline setup time**: 3 days → 3 hours
- **Review quality**: Catches issues humans miss
- **Security coverage**: Automated scanning + intelligent analysis
- **Team productivity**: Faster reviews, better quality

---

## **DEMO SUCCESS METRICS SUMMARY**

### **Overall Time Savings:**

- **Demo 1 (Refactoring)**: 3 hours → 15 minutes (92% savings)
- **Demo 2 (TDD with GitHub Issue)**: 2-3 hours → 7 minutes (95% savings)
- **Demo 3 (CI/CD)**: 3 days → 3 hours (87% savings)

### **Quality Improvements:**

- Better error handling patterns
- Comprehensive test coverage
- Security best practices
- Consistent code style
- Proper documentation

### **Developer Experience:**

- Less context switching
- Faster feedback loops
- Learning new patterns
- Focus on architecture vs boilerplate
- Reduced cognitive load

**Final Message for Demos:**
"These aren't toy examples - this is production-ready code generated in minutes instead of hours or days. The key is proper prompting, careful review, and maintaining human oversight."
