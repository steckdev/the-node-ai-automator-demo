# Demo 3: TDD Workflow with AI

## Context
We have a failing test in `cart.service.spec.ts` that needs implementation using TDD approach.

## Step 1: Red Phase - Make Test Pass (AI Prompt)

```
I have a failing test in my CartService. Make this test pass by implementing the `calculateTotal()` method:

```typescript
it('should calculate total with 7% tax', () => {
  service.addItem({ name: 'Book', price: 10 });
  
  const total = service.calculateTotal();
  expect(total).toBe(10.7); // 10 + (10 * 0.07)
});
```

**Requirements for Red Phase**:
- Implement ONLY what's needed to make the test pass
- Use a 7% tax rate
- Don't over-engineer - just make it work
- Keep it simple and focused

Please implement the `calculateTotal()` method in the CartService.
```

## Step 2: Green Phase - Verify All Tests Pass

Run the tests to ensure the implementation works:
```bash
npm test -- cart.service.spec.ts
```

## Step 3: Refactor Phase (AI Prompt)

```
Now that the test passes, refactor the `calculateTotal()` method to improve code quality:

**Refactoring Goals**:
1. **Extract the tax rate** into a named constant
2. **Improve readability** of the calculation logic
3. **Add JSDoc comments** explaining the method
4. **Consider edge cases** (empty cart, zero prices)
5. **Follow our TypeScript conventions**
6. **Make it extensible** for future tax rate changes

**Requirements**:
- All existing tests must continue to pass
- Don't change the public interface
- Focus on maintainability and readability
- Use meaningful variable names
- Add proper error handling if needed

Refactor the method while keeping the same functionality.
```

## Additional TDD Cycles (AI Prompts)

### Cycle 2: Multiple Items
```
Add support for calculating tax on multiple items. Write a failing test first, then implement:

Test case: Cart with Book ($10) and Pen ($5) should total $16.05 with 7% tax.
```

### Cycle 3: Empty Cart Edge Case
```
Add a test for empty cart behavior and implement:

Test case: Empty cart should return $0.00 total.
```

## Expected Demo Flow

1. **Show failing test** - `calculateTotal()` throws "not implemented"
2. **Red Phase**: Use AI to implement minimal solution
3. **Green Phase**: Run tests, show they pass
4. **Refactor Phase**: Use AI to improve code quality
5. **Repeat**: Add more test cases and implementations
6. **Highlight**: How AI accelerates each TDD cycle

## Key Teaching Points

- AI helps with both test writing and implementation
- TDD discipline is maintained (Red-Green-Refactor)
- AI suggestions improve code quality during refactor
- Tests provide safety net for AI-generated code
- Faster iteration cycles with AI assistance
