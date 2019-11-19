const { resolve } = require('path');

module.exports = {
  bail: true,
  cache: true,
  rootDir: resolve(),
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', 'interface.d.ts', 'src/index.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|pdf|txt)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': require('identity-obj-proxy'),
    '^src(.*)$': `${resolve('./src')}$1`
  },
  setupFilesAfterEnv: ['jest-chain', 'jest-extended'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileTransform.js',
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  verbose: true,
  testMatch: ['**/__tests__/**/*.{js,ts,tsx,jsx}', '**/?(*.)+(spec|test).{js,ts,tsx,jsx}']
};
