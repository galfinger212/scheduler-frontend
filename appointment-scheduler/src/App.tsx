import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Scheduler } from "./pages/Scheduler";
import Menu from "./components/Menu/Menu";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MyAppointments from "./pages/MyAppoiments";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/scheduler"
          element={
            <PrivateRoute>
              <Menu />
              <Scheduler />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Menu />
              <div>Profile Page</div>
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <Menu />
              <MyAppointments />
            </PrivateRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
