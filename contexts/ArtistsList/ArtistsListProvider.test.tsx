import { useArtistsListContext } from './ArtistsListContext';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import ArtistsListProvider from './ArtistsListProvider';

describe('ArtistsListContext', () => {
  afterEach(() => cleanup);

  const ButtonSetDark = () => {
    const { dark, loaded, setDark } = useArtistsListContext();
    return (
      <div>
        <button onClick={() => setDark(!dark)}>Toggle dark</button>
        <span>Dark theme {dark && loaded ? 'ON' : 'OFF'}</span>
      </div>
    );
  };

  it('toggles dark mode', async () => {
    const { getByText } = render(
      <ArtistsListProvider>
        <ButtonSetDark />
      </ArtistsListProvider>,
    );

    await waitFor(() => fireEvent.click(getByText(/Toggle dark/i)));
    expect(getByText('Dark theme ON')).toBeTruthy();

    await waitFor(() => fireEvent.click(getByText(/Toggle dark/i)));
    expect(getByText('Dark theme OFF')).toBeTruthy();
  });
});
