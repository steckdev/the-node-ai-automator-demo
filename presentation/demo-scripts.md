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

## **DEMO 2: TDD ACCELERATION** _(6 minutes)_

### Pre-Demo Setup:

- Clean Node.js project with Jest configured
- AI tool ready for test generation
- Terminal for running tests

### **LIVE DEMO SCRIPT:**

#### **Step 1: Feature Requirements** _(30 seconds)_

**Say to audience:**
"We're building an authentication service. I'll use TDD, but AI will accelerate both test writing and implementation."

**Requirements on screen:**

- User registration with email/password
- JWT token generation
- Password hashing with bcrypt
- Rate limiting for login attempts
- Input validation

#### **Step 2: AI Test Generation** _(2 minutes)_

**Show this prompt:**

```
Generate comprehensive Jest tests for a Node.js AuthService class with these methods:

1. registerUser(email, password) - Creates new user account
2. loginUser(email, password) - Authenticates and returns JWT
3. validateToken(token) - Verifies JWT token
4. hashPassword(password) - Hashes password with bcrypt

REQUIREMENTS:
- Include edge cases and error scenarios
- Mock external dependencies (database, bcrypt, jwt)
- Test input validation (email format, password strength)
- Test rate limiting behavior
- Use Jest with TypeScript
- Include both unit and integration test examples
- Follow AAA pattern (Arrange, Act, Assert)

CONTEXT:
- Using PostgreSQL with TypeORM
- JWT tokens expire in 24 hours
- Passwords must be 8+ characters with special chars
- Rate limit: 5 login attempts per 15 minutes per IP
```

**Show AI generating tests:**

```typescript
// auth.service.spec.ts (framework-agnostic)
describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: any;
  let jwtService: any;
  let rateLimitService: any;

  beforeEach(() => {
    userRepository = { findByEmail: jest.fn(), create: jest.fn() };
    jwtService = { sign: jest.fn() };
    rateLimitService = { checkLimit: jest.fn(), recordFailedAttempt: jest.fn() };
    authService = new AuthService(userRepository, jwtService, rateLimitService);
  });

  describe('registerUser', () => {
    it('should successfully register a new user', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'SecurePass123!';
      const hashedPassword = 'hashed_password';

      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockResolvedValue({ id: 1, email, password: hashedPassword });

      // Act
      const result = await authService.registerUser(email, password);

      // Assert
      expect(result).toEqual({ id: 1, email });
      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(userRepository.create).toHaveBeenCalledWith({
        email,
        password: expect.any(String),
      });
    });

    it('should reject duplicate email addresses', async () => {
      // Arrange
      const email = 'existing@example.com';
      userRepository.findByEmail.mockResolvedValue({ id: 1, email });

      // Act & Assert
      await expect(authService.registerUser(email, 'password')).rejects.toThrow(
        'Email already registered',
      );
    });

    it('should enforce password strength requirements', async () => {
      // Arrange
      const email = 'test@example.com';
      const weakPassword = '123';

      // Act & Assert
      await expect(authService.registerUser(email, weakPassword)).rejects.toThrow(
        'Password must be at least 8 characters',
      );
    });
  });

  describe('loginUser', () => {
    it('should return JWT token for valid credentials', async () => {
      // AI generates comprehensive login tests...
    });

    it('should enforce rate limiting', async () => {
      // AI generates rate limiting tests...
    });
  });
});
```

#### **Step 3: Run Tests (Red Phase)** _(30 seconds)_

**Show terminal:**

```bash
npm test auth.service.spec.ts
# All tests fail - Red phase complete
```

**Say to audience:**
"Perfect! All tests fail as expected. Now let's implement the service."

#### **Step 4: AI Implementation** _(2 minutes)_

**Show implementation prompt:**

```
Implement the AuthService class to pass these Jest tests:

[Paste the generated tests]

REQUIREMENTS:
- Use bcrypt for password hashing (cost factor 12)
- Use JWT with 24-hour expiration
- Implement proper error handling with custom exceptions
- Add input validation for email format and password strength
- Integrate with rate limiting service
- Use TypeORM for database operations
- Include proper logging

PATTERNS:
- Follow dependency injection pattern
- Use async/await throughout
- Throw descriptive errors for different failure cases
- Hash passwords before storing
```

**Show AI generating implementation:**

```typescript
// auth.service.ts
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly rateLimitService: RateLimitService,
  ) {}

  async registerUser(email: string, password: string): Promise<UserDto> {
    // Validate input
    if (!this.isValidEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (!this.isValidPassword(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters with special characters',
      );
    }

    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
    });

    this.logger.log(`User registered: ${email}`);

    return { id: user.id, email: user.email };
  }

  async loginUser(email: string, password: string, ipAddress: string): Promise<{ token: string }> {
    // Check rate limiting
    await this.rateLimitService.checkLimit(ipAddress);

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      await this.rateLimitService.recordFailedAttempt(ipAddress);
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { expiresIn: '24h' },
    );

    this.logger.log(`User logged in: ${email}`);
    return { token };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
}
```

#### **Step 5: Run Tests (Green Phase)** _(30 seconds)_

**Show terminal:**

```bash
npm test auth.service.spec.ts
# All tests pass - Green phase complete!
```

#### **Step 6: Key Metrics** _(30 seconds)_

**Highlight the results:**

- **Traditional TDD time**: 4-5 hours
- **AI-accelerated time**: 45 minutes
- **Test coverage**: 95%
- **Lines of test code**: 200+ (would take 2 hours manually)
- **Implementation time**: 15 minutes vs 2 hours

**Say to audience:**
"90% time savings while maintaining TDD discipline and achieving better test coverage than I typically write manually."

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
- **Demo 2 (TDD)**: 5 hours → 45 minutes (85% savings)
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
