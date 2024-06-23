import { render } from '@testing-library/react';
import ArtistsList from './ArtistsList';
import { artistsListI18n } from './ArtistsList.data';
import artistsList from '../../../mocks/responses/followed-artists.json';

describe('ArtistsList', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<ArtistsList />);
  });

  it.each([{ artistsList: {} }, { artistsList: undefined }])(
    'shows text when no artist is available',
    ({ artistsList }) => {
      const { getByText } = render(
        // @ts-ignore
        <ArtistsList i18n={artistsListI18n} artistsList={artistsList} onButtonClick={jest.fn} artistLoading={0} />,
      );

      expect(getByText('You don not track any artists yet')).toBeInTheDocument();
    },
  );

  it('renders all elements', () => {
    const { queryAllByRole } = render(
      <ArtistsList i18n={artistsListI18n} artistsList={artistsList.rows} onButtonClick={jest.fn} artistLoading={0} />,
    );
    expect(queryAllByRole('button')).toHaveLength(2);
    expect(queryAllByRole('img')).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ArtistsList i18n={artistsListI18n} artistsList={artistsList.rows} onButtonClick={jest.fn} artistLoading={0} />,
    );
    expect(container).toMatchSnapshot();
  });
});
