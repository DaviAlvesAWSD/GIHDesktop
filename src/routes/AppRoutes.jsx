import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
 

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />   
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}