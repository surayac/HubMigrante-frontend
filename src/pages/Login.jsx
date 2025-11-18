import React, { useState } from "react";
import api from "../services/ApiUser";
import toast from "react-hot-toast";
import MyToast from "../components/MyToast";
import { useAuth } from "../context/AuthContext";

function Login() {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            const token = response.data.token;

            login(token);

            toast.custom(
                <MyToast
                    title="Welcome back!"
                    message="Authentication successful!"
                    type="success"
                />
            );

            setTimeout(() => {
                window.location.href = "/profile";
            }, 1200);


        } catch (err) {
            toast.custom(
                <MyToast
                    title="Login failed"
                    message="Incorrect email or password."
                    type="error"
                />
            );
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-5"
                aria-labelledby="login-title"
            >
                <h2
                    id="login-title"
                    className="text-3xl font-bold text-center text-gray-800">Login</h2>

                {error && (
                    <p aria-live="assertive" className="text-red-500 text-center font-medium">{error}</p>
                )}

                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <section className="flex justify-between mt-4 gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                    >
                        Login
                    </button>
                    <a
                        href="/register"
                        className="flex-1 text-center bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                        aria-label="Go to registration page"
                    >
                        Register
                    </a>
                </section>

            </form>
        </div>
    );
}

export default Login;
