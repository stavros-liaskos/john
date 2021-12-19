import React from "react";
import { getAllByTestId, render } from "@testing-library/react";
import Main from "../../components/Main/Main";
import { mainI18n } from "../../components/Main/Main.data";

describe("Main", () => {
  it("renders without data without crashing", () => {
    // @ts-ignore
    render(<Main />);
  });

  it("renders with data", () => {
    const component = render(<Main i18n={mainI18n} />);
    const listEls = getAllByTestId(component.container, "list-el");

    expect(listEls.length).toEqual(2);
    expect(component).toMatchSnapshot();
  });
});
