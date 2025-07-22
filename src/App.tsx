import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";

const App: React.FC = () => (
  <BrowserRouter>
    <NavBar />
    <AppRoutes />
  </BrowserRouter>
);

export default App;