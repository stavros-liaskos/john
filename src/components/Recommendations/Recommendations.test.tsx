import { render } from '@testing-library/react';
import Recommendations from './Recommendations';
import { renderWithAct } from '../../utils/test-utils';
import { setupServer } from 'msw/node';
import { mswAuth, mswFollowedArtists, mswRecommendedArtists } from '../../mocks/mockApi';
import { recommendationsI18n } from '../../i18n';

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
    const { getByText, findAllByText } = await renderWithAct(<Recommendations i18n={recommendationsI18n} />);

    expect(getByText(recommendationsI18n.title)).toBeInTheDocument();

    const buttons = await findAllByText(recommendationsI18n.artistList.btnTxt);
    expect(buttons).toHaveLength(2);
  });

  it('matches snapshot', async () => {
    server.use(mswRecommendedArtists.success());
    const { container } = render(<Recommendations i18n={recommendationsI18n} />);
    expect(container).toMatchSnapshot();
  });
});
