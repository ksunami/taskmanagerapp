import nextJest from 'next/jest.js';
const createJestConfig = nextJest({ dir: './' });

const customConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/app/**/layout.tsx',       // layout puro de composición
    '!src/app/**/providers.tsx',    // wrapper de Redux sin lógica
    '!src/**/__tests__/**',
    '!**/*.d.ts'
  ],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  }
};

export default createJestConfig(customConfig);
