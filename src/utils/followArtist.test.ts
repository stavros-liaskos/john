import { mswFollow } from '../mocks/mockApi';
import followArtist from './followArtist';
import artist from '../mocks/fixtures/requests/artist.json';
import { initServer } from './test-utils';

describe('followArtist', () => {
  const consoleLogSpy = jest.spyOn(global.console, 'log');
  const consoleErrorSpy = jest.spyOn(global.console, 'error');
  const server = initServer();

  it('Successfully follows an artist', async () => {
    server.use(mswFollow.success());
    await followArtist(artist, () => {});
    expect(consoleLogSpy).toHaveBeenCalledWith('Frank Ocean followed successfully');
  });

  it('logs error when following artist failed', async () => {
    server.use(mswFollow.fail());
    await followArtist(artist, () => {});
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
