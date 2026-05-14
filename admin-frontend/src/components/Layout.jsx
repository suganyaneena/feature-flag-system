import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-[250px] w-full">
        <Header />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}