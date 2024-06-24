import type { Config } from "jest";

const config: Config = {
  clearMocks: false,

  collectCoverage: true,

  collectCoverageFrom: ["src/**"],

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  testEnvironment: "node",
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
				isolatedModules: true,
			},
		],
	},
	preset: 'ts-jest',
	moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/*.spec.ts'],

};

export default config;
