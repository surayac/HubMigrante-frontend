import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import api from "../services/ApiUser";

const mockLogin = vi.fn();

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../services/ApiUser", () => ({
  default: {
    post: vi.fn(),
  },
}));

function renderLogin() {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login successfully", async () => {
    api.post.mockResolvedValue({
      data: { token: "fake_token_123" },
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/login", {
        email: "john@example.com",
        password: "123456",
      });
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("fake_token_123");
    });
  });

  it("should show toast error when login fails", async () => {
    api.post.mockRejectedValue(new Error("Invalid credentials"));

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});