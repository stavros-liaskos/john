import { render, waitForElementToBeRemoved } from '@testing-library/react';
import Recommendations from './Recommendations';
import { recommendationsI18n } from './Recommendations.data';
import { renderWithAct } from '../../utils/test-utils';
import { setupServer } from 'msw/node';
import { mswAuth, mswFollowedArtists, mswRecommendedArtists } from '../../mocks/mockApi';

describe('Recommendations', () => {
  const server = setupServer();
  beforeAll(() => {
    server.listen();
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders without data without crashing', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(), mswRecommendedArtists.success());

    await renderWithAct(<Recommendations />);
  });

  it('renders title and artists', async () => {
    server.use(mswAuth.success(), mswFollowedArtists.success(), mswRecommendedArtists.success());
    const { getByText, findAllByText } = render(<Recommendations i18n={recommendationsI18n} />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();

    const buttons = await findAllByText(recommendationsI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);
  });

  it('matches snapshot', async () => {
    server.use(mswRecommendedArtists.success());
    const { container, getByText } = render(<Recommendations i18n={recommendationsI18n} />);
    await waitForElementToBeRemoved(getByText('There are no recommended artists for you :('));
    expect(container).toMatchSnapshot();
  });
});
