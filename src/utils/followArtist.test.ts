import { nockFollow } from '../mocks/mockApi';
import { followArtist } from './followArtist';
import artist from '../mocks/fixtures/requests/artist.json';
import nock from 'nock';

describe('followArtist', () => {
  const consoleLogSpy = jest.spyOn(global.console, 'log');
  const consoleErrorSpy = jest.spyOn(global.console, 'error');

  afterEach(() => {
    if (!nock.isDone()) {
      console.error('pending mocks: %j', nock.pendingMocks());
    }
    expect(nock.isDone()).toBeTruthy();
  });

  it('Successfully follows an artist', async () => {
    nockFollow.success();
    await followArtist(artist, () => {});
    expect(consoleLogSpy).toHaveBeenCalledWith('Frank Ocean followed successfully');
  });

  it('logs error when following artist failed', async () => {
    await followArtist(artist, () => {});
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
