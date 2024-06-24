import { fireEvent, render } from '@testing-library/react';
import List from './List';
import { artistsListI18n } from '../../ArtistsList.data';
import artistsList from '../../../../mocks/fixtures/responses/followed-artists.json';

describe('List', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<List />);
  });

  it('renders all elements', () => {
    const btnCb = jest.fn();

    const { queryAllByRole } = render(
      <List i18n={artistsListI18n} artistsList={artistsList.rows} onButtonClick={btnCb} artistLoading={0} />,
    );
    const btn = queryAllByRole('button')[0];
    fireEvent.click(btn);

    expect(queryAllByRole('button')).toHaveLength(2);
    expect(queryAllByRole('img')).toHaveLength(2);
    expect(btnCb).toHaveBeenCalledTimes(1);
  });

  it('renders btn in disabled state', () => {
    const { queryAllByRole } = render(
      <List i18n={artistsListI18n} artistsList={artistsList.rows} onButtonClick={jest.fn} artistLoading={1700} />,
    );
    const btn = queryAllByRole('button')[0];

    expect(btn).toHaveAttribute('disabled');
  });

  it('matches snapshot', () => {
    const unfollowFn = jest.fn();
    const { container } = render(
      <List i18n={artistsListI18n} artistsList={artistsList.rows} onButtonClick={unfollowFn} artistLoading={0} />,
    );
    expect(container).toMatchSnapshot();
  });
});
