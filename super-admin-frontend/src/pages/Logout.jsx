import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout successfully");

    navigate("/");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}