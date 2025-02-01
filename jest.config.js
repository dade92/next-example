/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Optional: if you are using path aliases (e.g. '@/...')
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
