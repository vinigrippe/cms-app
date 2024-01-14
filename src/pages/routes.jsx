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
import { Websites } from "./websites/websites";
import { NotFound } from "./notFound/notFound";

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const isAuth = localStorage.getItem("token");
  return !isAuth ? <Outlet /> : <Navigate to="/websites" replace />;
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
          <Route exact path="*" element={<NotFound />} />
          <Route exact path="/websites" element={<Websites />} />
          <Route exact path="/website/:websiteId/pages" element={<Pages />} />
          <Route
            exact
            path="/website/:websiteId/page/:pageId/editor"
            element={<Editor />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
