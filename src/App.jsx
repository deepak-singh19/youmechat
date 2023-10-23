import { useState } from "react";
import "./App.css";
import Form from "./page/form";
import Dashboard from "./page/dashboard";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const ProtectedRoutes = ({ children, auth=false }) => {
    const isLoggedIn = localStorage.getItem("user:token") !== null || false;

    if (!isLoggedIn && auth) {
      return <Navigate to={"/sign-in"} />;
    } else if (
      isLoggedIn &&
      ["/sign-in", "/sign-up"].includes(window.location.pathname)
    ) {
      return <Navigate to={"/"} />;
    }

    return children;
  };

  return (
    <div className="w-full h-full">
      <Routes>
        <Route
          path="/sign-in"
          element={
            <ProtectedRoutes>
              <Form isSignPage={true} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/sign-up"
          element={
            <ProtectedRoutes>
              <Form isSignPage={false} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoutes auth={true}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
