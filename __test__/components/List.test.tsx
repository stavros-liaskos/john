import React from "react";
import { getAllByTestId, render } from "@testing-library/react";
import List from "../../components/List/List";
import { listData } from "../../components/List/List.data";

describe("List", () => {
  it("renders without data without crashing", () => {
    // @ts-ignore
    render(<List />);
  });

  it("renders with data", () => {
    const component = render(<List list={listData} />);
    const listEls = getAllByTestId(component.container, "list-el");

    expect(listEls.length).toEqual(2);
    expect(component).toMatchSnapshot();
  });
});
