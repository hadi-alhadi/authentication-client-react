import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

test("renders home page with welcome message", () => {
  render(<HomePage />);
  const welcomeMessage = screen.getByText("Welcome to the application.");
  expect(welcomeMessage).toBeInTheDocument();
  expect(screen.getByTestId("home-wrapper")).toMatchSnapshot();
});
