import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const store = mockStore({});
export default function renderWithProviders(props: React.ReactNode) {
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{props}</MemoryRouter>
      </Provider>,
    ),
    history,
  };
}
