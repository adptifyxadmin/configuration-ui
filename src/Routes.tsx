// src/Routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import TreatmentPage from "./features/treatment/pages/TreatmentPage"
import RoomTypePage from "./features/roomtype/pages/RoomTypePage"
import RoomPage from "./features/room/pages/RoomPage";

const ApplicationRoutes: React.FC = () => {
    return (
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="treatments" element={<TreatmentPage />} />
              <Route path="roomtypes" element={<RoomTypePage />} />
              <Route path="rooms" element={<RoomPage />} />
      </Route>
    </Routes>
    );
};

export default ApplicationRoutes;
