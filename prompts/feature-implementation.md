# Demo 2: Feature Implementation with MCP

## Context

GitHub Issue: "Add `/profile` endpoint to return the logged-in user's profile details"

## AI Prompt for Live Demo (with MCP)

```
You are connected to this project via MCP. I need you to implement a complete feature based on this GitHub issue:

**Issue**: Add `/profile` endpoint to return authenticated user's profile

**Requirements**:
1. **Create a new controller** with GET `/profile` endpoint
2. **Return user profile data**: id, name, email, createdAt, lastLoginAt
3. **Add proper DTOs** for the response
4. **Include authentication guard** (mock for demo)
5. **Write comprehensive tests**:
   - Unit tests for the controller
   - Unit tests for any new service methods
   - Mock all dependencies properly
6. **Add Swagger documentation** (OpenAPI spec via annotations or yaml/json)
7. **Follow our existing patterns** from the users module

**Implementation Steps**:
1. Create `ProfileController` in `src/controllers/`
2. Create `ProfileResponseDto` in appropriate DTO folder
3. Add `getProfile()` method to existing `UsersService`
4. Create comprehensive test files
5. Add proper error handling for edge cases
6. Wire routes and exports as needed (no framework-specific modules)

**Code Standards**:
- Use TypeScript strict mode
- Follow Node.js/Express best practices
- Use proper HTTP status codes
- Include comprehensive error handling
- Add input validation where needed
- Use dependency injection properly

After implementation, create a new branch `feature/profile-endpoint`, commit the changes with a descriptive message, and prepare for a pull request.
```

## Expected Outcome

- New ProfileController with GET /profile endpoint
- ProfileResponseDto with proper validation
- Updated UsersService with getProfile method
- Comprehensive test coverage
- Swagger documentation
- Ready for code review

## Demo Flow

1. Show the GitHub issue
2. Paste the prompt into MCP-enabled AI
3. Watch AI generate all files
4. Review the generated code:
   - Controller implementation
   - DTO definitions
   - Service updates
   - Test files
   - Swagger docs
5. Show how AI follows existing patterns
6. Demonstrate running the tests
