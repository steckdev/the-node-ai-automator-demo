# Demo 1: Legacy Code Refactoring Prompt

## Context
You have a messy legacy Node.js file (`src/legacy/user-service-messy.js`) that needs to be refactored to modern NestJS standards.

## AI Prompt for Live Demo

```
Refactor this legacy JavaScript file to modern TypeScript/NestJS following our team guidelines:

1. **Convert to TypeScript** with proper types and interfaces
2. **Replace callbacks with async/await** - eliminate callback hell
3. **Apply NestJS patterns**:
   - Use @Injectable() decorator
   - Implement proper dependency injection
   - Use NestJS exception classes (NotFoundException, BadRequestException, etc.)
4. **Extract constants** - remove all magic numbers and strings
5. **Implement proper error handling** - consistent patterns throughout
6. **Add input validation** - use class-validator decorators where appropriate
7. **Separate concerns** - split validation, business logic, and data access
8. **Follow SOLID principles** - single responsibility, dependency inversion

Requirements:
- Keep the same business logic and functionality
- Use modern ES6+ features (destructuring, arrow functions, etc.)
- Add proper TypeScript types for all parameters and return values
- Use UUID instead of incremental IDs
- Implement soft delete instead of hard delete
- Add comprehensive error handling with meaningful messages

Do not change the core business requirements - only modernize the implementation.
```

## Expected Outcome
- Clean, modern TypeScript service
- Proper async/await patterns
- NestJS decorators and patterns
- Extracted constants
- Comprehensive error handling
- Type safety throughout

## Demo Flow
1. Show the messy legacy file
2. Paste the prompt into AI assistant
3. Review the generated modern code
4. Highlight key improvements:
   - No more callback hell
   - Proper error handling
   - Type safety
   - Clean separation of concerns
   - NestJS best practices
