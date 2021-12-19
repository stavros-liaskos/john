import React from 'react';
import { render, getByRole, queryAllByRole } from '@testing-library/react';
import Main from '../../components/Main/Main';
import { mainI18n } from '../../components/Main/Main.data';
import { expect } from '@jest/globals';
import { listData } from '../../components/List/List.data';
import { MainProps } from '../../components/Main/Main.types';

const setup = (props?: Partial<MainProps>) => {
  const { container } = render(<Main className="" i18n={mainI18n} {...props} />);
  const search = getByRole(container, 'button');
  const artistLogos = queryAllByRole(container, 'img');
  const input = getByRole(container, 'textbox');

  return { container, search, artistLogos, input };
};

describe('Main', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Main />);
  });

  it('show only Search without list prop', () => {
    const { container, search, artistLogos } = setup();

    expect(search).toBeTruthy();
    expect(artistLogos.length).toEqual(0);
    expect(container).toMatchSnapshot();
  });

  it('show List of results ', async () => {
    const { container, search, artistLogos } = setup({
      defaultList: listData,
    });

    expect(search).toBeTruthy();
    expect(artistLogos.length).toEqual(2);
    expect(container).toMatchSnapshot();
  });
});
