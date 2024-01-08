import React from "react";
import { useAuth } from "../context/authContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Login } from "./login/login";
import { Editor } from "./editor/editor";
import { Pages } from "./pages/pages";

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const isAuth = localStorage.getItem("token");
  return !isAuth ? <Outlet /> : <Navigate to="/pages" replace />;
};

export const RoutePages = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route exact path="*" element={<Pages />} />
          <Route exact path="/" element={<Pages />} />
          <Route exact path="/pages" element={<Pages />} />
          <Route exact path="/editor/:pageId" element={<Editor />} />
        </Route>
      </Routes>
    </Router>
  );
};
