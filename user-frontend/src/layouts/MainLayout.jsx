import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP NAVBAR */}
      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6">

          {children}

        </div>
      </div>
    </div>
  );
}