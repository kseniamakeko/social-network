import { render, screen } from "@testing-library/react";
import SamuraiJSApp from "./App";

test("renders learn react link", () => {
  render(<SamuraiJSApp />);

  const linkElement = screen.getByAltText(/learn react/i);
  expect(linkElement).toBeDefined();
});
