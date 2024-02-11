import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders home page with welcome message", () => {
  render(<HomePage />);
  expect(screen.getByTestId("home-page-container")).toMatchSnapshot();
});
