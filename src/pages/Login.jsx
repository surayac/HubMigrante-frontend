import React, { useState } from "react";
import api from "../services/ApiUser";
import toast from "react-hot-toast";
import MyToast from "../components/MyToast";

function Login() {
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

            localStorage.setItem("token", token);

            toast.custom(
                <MyToast
                    title="Welcome back!"
                    message="Authentication successful!"
                    type="success"
                />
            );

            setTimeout(() => {
                window.location.href = "/";
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
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

                {error && (
                    <p className="text-red-500 text-center font-medium">{error}</p>
                )}

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
