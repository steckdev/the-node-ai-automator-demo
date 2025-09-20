# NY Node AI Presentation Demo Project

This project demonstrates AI-accelerated Node.js development patterns for the International JavaScript Conference NYC 2025.

## 🎯 Demo Scenarios

### Demo 1: Legacy Code Refactoring

- **File**: `src/legacy/user-service-messy.js`
- **Goal**: Refactor callback hell to modern async/await with NestJS patterns
- **AI Prompt**: See `prompts/refactor-legacy.md`

### Demo 2: Feature Implementation with MCP

- **Scenario**: GitHub issue → Complete feature implementation
- **Goal**: Generate controller, service, DTO, tests, and PR
- **AI Prompt**: See `prompts/feature-implementation.md`

### Demo 3: TDD with AI Acceleration

- **File**: `src/services/cart.service.spec.ts`
- **Goal**: Red-Green-Refactor cycle with AI assistance
- **AI Prompt**: See `prompts/tdd-workflow.md`

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Validate demo setup
npm run demo:validate

# Run all tests
npm run test

# Start development server
npm run start:dev

# Open Swagger documentation
open http://localhost:3000/api
```

## 🤖 AI-Powered Development

This project showcases AI-accelerated development with:

- **GitHub Copilot**: Free tier integration for code completion
- **Automated PR Reviews**: AI-powered code quality checks
- **MCP Integration**: Model Context Protocol for enhanced AI assistance
- **TDD Acceleration**: AI-assisted test-driven development

### GitHub Copilot Setup

1. **Enable Free Tier**: Go to GitHub Settings → Copilot (60 completions/month)
2. **Repository Access**: Enable for this repository
3. **VS Code Extension**: Install GitHub Copilot extension
4. **Automated Reviews**: PRs automatically get AI review comments

See [GitHub Copilot Setup Guide](./docs/github-copilot-setup.md) for detailed instructions.

## 📁 Project Structure

```
ny-node-ai-presentation/
├── src/
│   ├── legacy/           # Messy code for refactoring demos
│   ├── modern/           # Clean NestJS implementations
│   ├── services/         # Business logic services
│   ├── controllers/      # API endpoints
│   ├── dto/              # Data transfer objects
│   └── tests/            # Test files
├── prompts/              # AI prompts for demos
├── presentation/         # Presentation files
└── docs/                 # Documentation
```

## 🛠 Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Testing**: Jest
- **Linting**: ESLint + Prettier
- **Database**: In-memory (for demo simplicity)
- **AI Tools**: GitHub Copilot, Augment Code, MCP

## 📋 Demo Flow

1. **Setup**: Show messy legacy code
2. **Refactor**: Use AI to modernize with guidelines
3. **Feature**: Implement new endpoint with AI + MCP
4. **Test**: TDD cycle with AI acceleration
5. **Deploy**: CI/CD integration examples

## 🎬 Live Demo Commands

```bash
# Validate all demos are ready
npm run demo:validate

# Demo 1: Legacy Code Refactoring
npm run demo:refactor

# Demo 2: Feature Implementation with MCP
npm run demo:feature

# Demo 3: TDD with AI Acceleration
npm run demo:tdd

# Run all demos in sequence
npm run demo:all
```

## 🔄 CI/CD Pipeline

The repository includes comprehensive GitHub Actions workflows:

### Continuous Integration (`.github/workflows/ci.yml`)

- **Multi-Node Testing**: Tests on Node.js 18.x and 20.x
- **Code Quality**: ESLint and Prettier checks
- **Security Scanning**: npm audit and CodeQL analysis
- **Coverage Reports**: Automated coverage with Codecov
- **Build Verification**: Ensures production builds work

### AI Code Review (`.github/workflows/copilot-review.yml`)

- **Automated Reviews**: AI-powered PR analysis
- **Demo Validation**: Ensures presentation demos work
- **Quality Suggestions**: Common issue detection
- **Inline Comments**: Direct feedback on code changes

### Workflow Triggers

- **Push**: `main` and `develop` branches
- **Pull Requests**: All PRs to `main`
- **Demo PRs**: Special validation for demo-related changes

## 📚 Resources

### Documentation

- [GitHub Copilot Setup Guide](./docs/github-copilot-setup.md) - Complete setup instructions
- [Team Guidelines](./docs/team-guidelines.md) - Development standards
- [Demo Script](./docs/demo-script.md) - Live presentation guide
- [AI Prompts Cheat Sheet](./docs/ai-prompts-cheatsheet.md) - Quick reference

### Demo Materials

- [AI Prompts](./prompts/) - Structured prompts for each demo
- [Presentation Slides](./presentation/) - Conference presentation materials
- [Legacy Code](./src/legacy/) - Messy code for refactoring demos
- [Modern Examples](./src/modern/) - Clean NestJS implementations

### External Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
