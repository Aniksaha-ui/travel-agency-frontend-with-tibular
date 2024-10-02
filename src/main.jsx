import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Views/Login/Login.jsx";
import { RecoilRoot } from "recoil";
import Users from "./Views/Users/Users.jsx";
import RouteInformation from "./Views/Routes/Routes.jsx";
import AddRoutes from "./Views/Routes/AddRoutes.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VehicleInformation from "./Views/Vehicles/Vehicles.jsx";
import AddVehicles from "./Views/Vehicles/AddVehicles.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer></ToastContainer>
    <RecoilRoot>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="admin/routes" element={ <RouteInformation />}></Route>
          <Route path="admin/routes/add" element={ <AddRoutes />}></Route>
          <Route path="/admin/users" element={<Users />}></Route>
          <Route path="admin/vehicles" element={ <VehicleInformation />}></Route>
          <Route path="admin/vehicles/add" element={ <AddVehicles />}></Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>
);
