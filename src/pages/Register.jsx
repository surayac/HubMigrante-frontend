import React, { useState } from "react";
import api from "../services/ApiUser";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/v1/users", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      toast.error("Error creating account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Register
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
        >
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;
