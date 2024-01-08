import React from "react";
import { RoutePages } from "./pages/routes";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <AuthProvider>
      <RoutePages />
    </AuthProvider>
  );
};

export default App;
