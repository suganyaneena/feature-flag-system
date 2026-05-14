import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/FeatureForm.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PROTECTED ROUTE
function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/" />;
}

function App() {
  return (
    // <BrowserRouter>
      <>

          <ToastContainer
            position="top-right"
            autoClose={3000}
          />

          <Routes>

            {/* LOGIN */}
            <Route
              path="/"
              element={<Login />}
            />

            {/* SIGNUP */}
            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/features"
              element={<Features />}
            />

          </Routes>

      </>
    // </BrowserRouter>
  );
}

export default App;