import React, { useState } from "react";
import api from "../services/ApiUser";
import { registerUser } from "../services/UserService";
import toast from "react-hot-toast";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser({
                name,
                email,
                password,
            });

            toast.success("Account created successfully!");

            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);

        } catch (err) {

            if (err.response && err.response.data) {

                if (Array.isArray(err.response.data.errors)) {
                    err.response.data.errors.forEach(msg => toast.error(msg));
                    return;
                }

                if (err.response.data.message) {
                    toast.error(err.response.data.message);
                    return;
                }
            }
            toast.error("Error creating account. Please try again.");
        }
    };

    return (
        <section aria-labelledby="register-title"
            className="flex justify-center items-center h-screen bg-gray-100">

            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-5"
                aria-labelledby="register-title"
            >
                <h2 id="register-title"
                    className="text-3xl font-bold text-center text-gray-800">
                    Register
                </h2>

                <section className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </section>

                <section className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </section>

                <section className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </section>

                <section className="flex justify-between mt-4 gap-4">
                    <button
                        type="submit"
                        href="/register"
                        className="flex-1 text-center bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-[#4C92E7] text-black transition cursor-pointer"
                    >
                        Register
                    </button>

                </section>
                <section className="text-center">
                    Already have an account? <a
                        href="/login"
                        className="text-gray-800 font-semibold py-2 hover:text-[#4C92E7] transition cursor-pointer"
                    >
                        Click to login
                    </a> </section>

            </form>


        </section>
    );
}

export default Register;
