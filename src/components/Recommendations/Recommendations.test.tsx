import { act, render, waitFor } from '@testing-library/react';
import Recommendations from './Recommendations';
import { recommendationsI18n } from './Recommendations.data';
import recommendedArtists from '../../../mocks/responses/followed-artists.json';
import { beforeEachTest } from '../../utils/test-utils';
import followedArtists from '../../../mocks/responses/followed-artists.json';

describe('Recommendations', () => {
  let originFetch: {
    (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  };
  beforeEach(() => {
    originFetch = global.fetch;

    beforeEachTest();
  });

  afterEach(() => {
    global.fetch = originFetch;
    jest.restoreAllMocks();
  });

  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Recommendations />);
  });

  it('renders title and artists', async () => {
    const mRes = { json: jest.fn().mockResolvedValueOnce(recommendedArtists) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const { getByText, findAllByText } = render(<Recommendations i18n={recommendationsI18n} />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(mRes.json).toHaveBeenCalledTimes(1);
    });
    const buttons = await findAllByText(recommendationsI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);
  });

  it('matches snapshot', async () => {
    const fakeResponse = followedArtists;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;

    const { container } = render(<Recommendations i18n={recommendationsI18n} />);
    await act(() => {});

    expect(container).toMatchSnapshot();
  });
});
