import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Editor } from "./editor/editor";
import { Pages } from "./pages/pages";

export const RoutePages = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/pages" element={<Pages />} />
        <Route exact path="/" element={<Pages />} />
        <Route exact path="/editor/:pageId" element={<Editor />} />
      </Routes>
    </Router>
  );
};
