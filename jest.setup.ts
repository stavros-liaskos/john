import '@testing-library/jest-dom';
import 'jest-localstorage-mock';

import './src/mocks/matchMedia'; // https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import 'whatwg-fetch'; // https://github.com/jestjs/jest/issues/13834#issuecomment-1407375787
import nock from 'nock';

process.env = Object.assign(process.env, {
  BE_BASE_URL: 'http://localhost',
});

global.afterEach(() => {
  if (!nock.isDone()) {
    console.error('pending mocks: %j', nock.pendingMocks());
  }
  expect(nock.isDone()).toBeTruthy();
});
