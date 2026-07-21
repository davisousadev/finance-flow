import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node', // ou 'jsdom' se testar componentes React
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Mapeia o alias @/ para o Jest
    },
};

export default config;