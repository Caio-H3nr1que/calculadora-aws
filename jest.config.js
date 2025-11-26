module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'tests/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/tests/**/*.e2e.test.js',
    '!jest.config.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.integration.test.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '.*\\.e2e\\.test\\.js$'
  ],
  roots: ['<rootDir>/tests'],
  verbose: true
};