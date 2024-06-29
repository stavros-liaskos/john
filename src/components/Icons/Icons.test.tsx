import { render } from '@testing-library/react';
import Close from './close';
import Github from './github';
import HandGlass from './handGlass';
import LastFm from './lastfm';
import Moon from './moon';
import Spin from './spin';
import Spotify from './spotify';
import Sun from './sun';

describe('Icons', () => {
  it('matches snapshot', () => {
    const { container, getAllByRole } = render(
      <>
        <Close />
        <Github />
        <HandGlass />
        <LastFm />
        <Moon />
        <Spin />
        <Spotify />
        <Sun />
      </>,
    );

    expect(getAllByRole('img')).toHaveLength(8);
    expect(container).toMatchSnapshot();
  });
});
