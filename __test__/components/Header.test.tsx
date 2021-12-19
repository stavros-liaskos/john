import React from "react";
import { render } from "@testing-library/react";
import HeadMeta from "../../components/HeadMeta/HeadMeta";

describe("List", () => {
  it("renders without data without crashing", () => {
    const component = render(<HeadMeta />);
    expect(component).toMatchSnapshot();
  });
});
