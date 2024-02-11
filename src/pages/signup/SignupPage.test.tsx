import React from "react";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import SignupPage from "./SignupPage";
import renderWithProviders from "../../testUtils/renderWithProviders"; // Adjust the import path as necessary

const mockSignupFn = jest.fn(() =>
  Promise.resolve({ data: { name: "Test User", email: "test@example.com" } }),
);
jest.mock("../../services/auth.service", () => ({
  authAPI: {
    useSignupMutation: () => [
      mockSignupFn,
      { isLoading: false, isSuccess: true },
    ],
  },
}));

describe("SignupPage", () => {
  beforeEach(() => {
    mockSignupFn.mockClear();
  });

  it("renders the sign-up page correctly", () => {
    renderWithProviders(<SignupPage />);
    expect(screen.getByTestId("signup-page-container")).toMatchSnapshot();
  });

  it("submits the form with name, email, and password", async () => {
    renderWithProviders(<SignupPage />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => expect(mockSignupFn).toHaveBeenCalledTimes(1));

    expect(mockSignupFn).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      password: "password123!",
    });
  });
});
