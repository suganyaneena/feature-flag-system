import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

export default function App() 
{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => 
    {
        try {
             const res = await API.post(
                "/super-admin/login",
                {
                email,
                password,
                }
            );

             localStorage.setItem(
                "token",
                res.data.token
            );
          
            toast.success("Super Admin Login successfully");

            //ROLE BASED NAVIGATION
            navigate("/dashboard");
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return (
      <div className="min-h-screen flex">
        
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-10">
          <div className="text-white max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Super Admin Panel
            </h1>

            <p className="text-lg text-blue-100">
              Manage organizations, feature flags, users,
              and application settings from one secure dashboard.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

            {/* Title */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2">
                Login to continue
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-5">

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  onChange={(e) => {setEmail(e.target.value)}}
                  placeholder="Enter your email"
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  placeholder="Enter your password"
                  className="w-full mt-2 border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Login
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-6">
              © 2026 Super Admin System
            </p>
          </div>
        </div>
      </div>
    );
}