import React from 'react';
import { getAllByRole, queryAllByRole, render } from '@testing-library/react';
import Main from '../../components/Main/Main';
import { mainI18n } from '../../components/Main/Main.data';
import { expect } from '@jest/globals';

describe('Main', () => {
  it('renders without data without crashing', () => {
    // @ts-ignore
    render(<Main />);
  });

  it('show only Search without list prop', () => {
    const component = render(<Main className="" i18n={mainI18n} />);
    const search = getAllByRole(component.container, 'textbox');
    const artistLogos = queryAllByRole(component.container, 'img');

    expect(search.length).toEqual(1);
    expect(artistLogos.length).toEqual(2);
    // expect(artistLogos.length).toEqual(0) //TODO switch this line with the above when list is not anymore hardcoded
  });

  it('show only Search without list prop', () => {
    const component = render(<Main className="" i18n={mainI18n} />);
    const search = getAllByRole(component.container, 'textbox');
    const artistLogos = queryAllByRole(component.container, 'img');

    expect(search.length).toEqual(1);
    expect(artistLogos.length).toEqual(2);
    expect(component).toMatchSnapshot();
  });
});
