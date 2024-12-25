module.exports = {
  setupFilesAfterEnv: ['./setup.ts'],
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testTimeout: 60000
};
