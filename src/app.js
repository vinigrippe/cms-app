import React from "react";
import { RoutePages } from "./pages/routes";
import { AuthProvider } from "./context/authContext";
import { GlobalProvider } from "./context/globalContext";

const App = () => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <RoutePages />
      </GlobalProvider>
    </AuthProvider>
  );
};

export default App;
