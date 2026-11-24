import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../application/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";

function renderAt(path) {
    return render(
        <AuthProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/login" element={<p>Login page</p>} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <p>Profile page</p>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    );
}

describe("PrivateRoute", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("keeps a logged-in user on the page after a reload", () => {
        localStorage.setItem("token", "stored_token");

        renderAt("/profile");

        expect(screen.getByText("Profile page")).toBeInTheDocument();
        expect(screen.queryByText("Login page")).not.toBeInTheDocument();
    });

    it("redirects to login when there is no token", () => {
        renderAt("/profile");

        expect(screen.getByText("Login page")).toBeInTheDocument();
    });
});
