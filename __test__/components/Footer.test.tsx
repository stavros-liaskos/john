import React from "react";
import { getByTestId, render } from "@testing-library/react";
import Footer from "../../components/Footer/Footer";
import { footerI18n } from "../../components/Footer/Footer.data";

describe("List", () => {
  it("renders without data without crashing", () => {
    // @ts-ignore
    render(<Footer />);
  });

  it("renders with data", () => {
    const component = render(<Footer i18n={footerI18n} />);
    const footerPowered = getByTestId(component.container, "footer-powered");

    expect(footerPowered).toContainHTML(footerI18n.powered);
    expect(component).toMatchSnapshot();
  });
});
