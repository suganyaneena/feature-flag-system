import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", path: "/dashboard"},
    { name: "Create Organization", path: "/organization/create"},
    // { name: "Logout", path: "/logout" }, 
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");

    toast.success("Logout successfully");

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="w-[250px] h-screen bg-gray-900 text-white fixed left-0 top-0 p-5">
      <h1 className="text-2xl font-bold mb-10">
        Super Admin
      </h1>

      <div className="flex flex-col gap-3">
        {/* {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`px-4 py-3 rounded-lg transition ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {menu.name}
          </Link>
        ))} */}
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`px-4 py-3 rounded-lg transition ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {menu.name}
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="text-left px-4 py-3 rounded-lg transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}