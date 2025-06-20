import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'react-native',
  collectCoverageFrom: [
    'src/{components, utils, hooks, domain, screens}/**/*.{js, jsx, ts, tsx}',
  ],
  coveragePathIgnorePatterns: ['node_modules', 'index.ts'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  moduleDirectories: ['node_modules', './src/test'],
  setupFiles: ['./src/test/jestSetup.ts'],
  setupFilesAfterEnv: ['./src/test/test-utils.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context|@react-navigation)/)',
  ],
};

export default config;
