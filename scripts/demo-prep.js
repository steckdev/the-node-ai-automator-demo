#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function checkFileExists(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  return fs.existsSync(fullPath);
}

function main() {
  log('🎬 NY Node AI Presentation Demo Preparation', 'magenta');
  log('International JavaScript Conference NYC 2025', 'blue');

  log('\n📋 Pre-Demo Checklist:', 'cyan');

  const essentialFiles = [
    'src/legacy/user-service-messy.js',
    'src/services/cart.service.ts',
    'prompts/refactor-legacy.md',
    'prompts/feature-implementation.md',
    'prompts/tdd-workflow.md',
  ];

  const optionalFiles = ['src/modern/users/users.controller.ts'];

  log('\n📋 Essential Files:', 'cyan');
  let allFilesExist = true;
  essentialFiles.forEach((file) => {
    if (checkFileExists(file)) {
      log(`   ✅ ${file}`, 'green');
    } else {
      log(`   ❌ ${file} - MISSING`, 'red');
      allFilesExist = false;
    }
  });

  log('\n📋 Demo 2 Files (Created During Demo):', 'cyan');
  optionalFiles.forEach((file) => {
    if (checkFileExists(file)) {
      log(`   ⚠️  ${file} - EXISTS (will be overwritten during demo)`, 'yellow');
    } else {
      log(`   ✅ ${file} - NOT PRESENT (will be created during demo)`, 'green');
    }
  });

  if (!allFilesExist) {
    log('\n❌ Missing essential files. Please check your repository.', 'red');
    process.exit(1);
  }

  log('\n🎯 Demo Scenarios Ready:', 'cyan');
  log('   ✅ Demo 1: Legacy Code Refactoring', 'green');
  log('   ✅ Demo 2: Feature Implementation with MCP', 'green');
  log('   ✅ Demo 3: TDD with AI Acceleration', 'green');

  log('\n🚀 Quick Commands for Presentation:', 'cyan');
  log('   npm run demo:refactor  # Demo 1', 'blue');
  log('   npm run demo:feature   # Demo 2', 'blue');
  log('   npm run demo:tdd       # Demo 3', 'blue');

  log('\n⚠️  Important Demo Notes:', 'yellow');
  log('   Demo 2: E2E tests in src/users-posts.e2e.spec.ts are FAILING (expected)', 'yellow');
  log(
    '   Demo 3: Uncomment failing tests in src/services/cart.service.spec.ts (lines 61-77)',
    'yellow',
  );
  log('   These enable the Red-Green-Refactor TDD cycle demonstrations.', 'yellow');

  log('\n🎉 All demos are ready for the International JavaScript Conference NYC 2025!', 'green');
  log('\n💡 Pro tip: Run "npm run start:dev" in a separate terminal for live API testing', 'cyan');
}

if (require.main === module) {
  main();
}

module.exports = { main };
