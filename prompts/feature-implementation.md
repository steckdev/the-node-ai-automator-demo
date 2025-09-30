# Demo 2: Feature Implementation with MCP

## Context

GitHub Issue #2: "Add GET `/users/:id/posts` endpoint to retrieve all posts for a specific user"

## AI Prompt for Live Demo (with MCP)

```
You are connected to this project via MCP. I need you to implement a complete feature based on GitHub Issue #2:

**Issue**: Add GET `/users/:id/posts` endpoint to retrieve all posts for a specific user

**Requirements**:
1. **Create endpoint** GET `/users/:id/posts`
2. **Return user posts with user information**:
   - user: { id, name, email }
   - posts: [{ id, title, content, createdAt }]
   - totalPosts: number
3. **Add proper DTOs** for the response
4. **Error handling**:
   - Return 404 if user not found
   - Return 400 for invalid user ID format
5. **Write comprehensive tests**:
   - E2E tests (already exist in `src/users-posts.e2e.spec.ts` - make them pass!)
   - Unit tests for controller and service
   - Mock all dependencies properly
6. **Add Swagger documentation** (OpenAPI spec)
7. **Follow existing patterns** from the users and posts modules

**Implementation Steps**:
1. Create `UsersController` in `src/modern/users/`
2. Create `UserPostsResponseDto` in `src/modern/users/dto/`
3. Create or update `UsersService` with `getUserPosts()` method
4. Wire up the route in `src/main.ts`
5. Add proper error handling for edge cases
6. Update Swagger spec in `src/main.ts`

**Code Standards**:
- Use TypeScript strict mode
- Follow Node.js/Express best practices
- Use proper HTTP status codes (200, 400, 404)
- Include comprehensive error handling
- Add input validation for user ID
- Use dependency injection where appropriate
- Follow SOLID principles

**Existing Code to Reference**:
- User entity: `src/modern/users/entities/user.entity.ts`
- Post entity: `src/modern/posts/entities/post.entity.ts`
- Existing DTOs: `src/modern/users/dto/`

**Tests to Make Pass**:
The E2E tests in `src/users-posts.e2e.spec.ts` are currently failing. Your implementation should make all 3 tests pass:
1. Returns user posts with user information
2. Returns 404 for non-existent user
3. Returns 400 for invalid user ID format
```

## Expected Outcome

- New UsersController with GET `/users/:id/posts` endpoint
- UserPostsResponseDto with proper validation
- UsersService with `getUserPosts()` method
- All E2E tests passing
- Comprehensive test coverage
- Swagger documentation updated
- Ready for code review

## Demo Flow

1. **Show the GitHub issue** (#2)
2. **Show the failing tests**: `npm run test:e2e`
3. **Paste the prompt** into MCP-enabled AI
4. **Watch AI generate** all files:
   - Controller implementation
   - DTO definitions
   - Service implementation
   - Route wiring
   - Swagger docs
5. **Show how AI follows** existing patterns from users/posts modules
6. **Run tests again**: `npm run test:e2e` - all passing!
7. **Test the endpoint**: `curl http://localhost:3000/users/user-123/posts`
