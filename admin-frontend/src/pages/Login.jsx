import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import API from "../api/api";
import { toast } from "react-toastify";

export default function Login() {

  const navigate =
  useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {
      try {

        const res =
        await API.post(
          "/admin/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        navigate("/dashboard");

        toast.success(" Admin Login successfully");

      } catch (err) {

        toast.error("Login failed. Please check your credentials.");
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-2xl font-bold mb-5">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-3 rounded"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Login
        </button>
            <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}

            <span
                onClick={() => navigate("/signup")}
                className="text-blue-500 cursor-pointer font-semibold"
            >
                Signup
            </span>

            </p>

      </div>
    </div>
  );
}