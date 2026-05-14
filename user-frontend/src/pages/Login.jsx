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

  const [password,
  setPassword] =
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

        console.log('login Details',res.data)

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "organization_id",
          res.data.user.organization_id
        );

        localStorage.setItem(
          "name",
          res.data.user.name
        );
        localStorage.setItem(
          "email",
          res.data.user.email
        );
        localStorage.setItem(
          "role",
          res.data.user.role
        );
        localStorage.setItem(
          "organization_name",
          res.data.user.org_name
        );

        navigate("/dashboard");
        toast.success("Login successfully");

      } catch (error) {
        console.error(error);
        toast.error("Failed to login.");
      }
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-md w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          User Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
        >
          Login
        </button>

      </div>
    </div>
  );
}