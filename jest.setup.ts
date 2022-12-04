import '@testing-library/jest-dom';
import 'jest-localstorage-mock';

require('jest-fetch-mock').enableMocks();
import './mocks/matchMedia.ts'; // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom

process.env = Object.assign(process.env, {
  BE_BASE_URL: 'https://release-raccoon.com',
});
