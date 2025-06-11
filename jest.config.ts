/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  
  collectCoverage: true,
  
  coverageDirectory: "coverage",
  
  rootDir: '.',
  'moduleNameMapper': {
    '^@pages$': '<rootDir>/src/pages/$1',
    '^@components$': '<rootDir>/src/components/$1',
    '^@ui$': '<rootDir>/src/components/ui/$1',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages/$1',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices$': '<rootDir>/src/services/slices/$1',
    '^@selectors$': '<rootDir>/src/services/selectors/$1',
    '^@store$': '<rootDir>/src/services/store',
    '^@tokens$': '<rootDir>/src/utils/tokens',
  },

  transform: {
          // "^.+\\.[tj]sx?$" для обработки файлов js/ts с помощью `ts-jest`
          // "^.+\\.m?[tj]sx?$" для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
          "^.+\\.tsx?$": [
            "ts-jest",
            {
              // настройки для ts-jest
            },
          ],
        }
};

export default config;
