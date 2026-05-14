import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateOrganization from "./pages/CreateOrganization";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (

      <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organization/create" element={<CreateOrganization />} />
          <Route path="/Layout" element={<Layout />} />
        </Route>
      </Routes>

     </>
  );
}