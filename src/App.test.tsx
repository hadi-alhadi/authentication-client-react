import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import { authAPI } from "./services/auth.service";
import { generalReducer } from "./redux/slices/general.slice";
import { userReducer } from "./redux/slices/user.slice";
import { authReducer } from "./redux/slices/auth.slice";

const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    generalReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authAPI.middleware]),
});

test("should redirect to Sign In page when the user is not Authenticated", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(window.location.pathname).toBe("/signin");
});
