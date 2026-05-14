import {
  LayoutDashboard,
  Flag,
  LogOut,
  Settings,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      {/* Logo */}
      <div className="mb-10">

        {/* <h1 className="text-3xl font-bold text-blue-400">
          Admin Panel
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Feature Flag System
        </p> */}

      </div>

      {/* Menu */}
      <div className="space-y-3">

        <Link
          to="/dashboard"
          className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-2xl"
        >
          <LayoutDashboard size={20} />

          <span className="text-sm">
            Dashboard
          </span>
        </Link>

        <Link
          to="/features"
          className="w-full flex items-center gap-3 hover:bg-gray-800 transition-all p-4 rounded-2xl"
        >
          <Flag size={20} />

          <span className="text-sm">
            Features
          </span>
        </Link>

        {/* <Link
          to="/settings"
          className="w-full flex items-center gap-3 hover:bg-gray-800 transition-all p-4 rounded-2xl"
        >
          <Settings size={20} />

          <span className="text-sm">
            Settings
          </span>
        </Link> */}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 hover:bg-red-600 transition-all p-4 rounded-2xl text-gray-300 hover:text-white"
        >
          <LogOut size={20} />

          <span className="text-sm">
            Logout
          </span>
        </button>

      </div>

    </div>
  );
}