import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./components/Redux/Redux-store";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const linkElement = screen.getByAltText(/learn react/i);
  expect(linkElement).toBeDefined();
});
