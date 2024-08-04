import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useNavigate } from 'react';
import Login from "../Modules/Dashboard/Pages/Login";
import NotFound from "../Modules/Dashboard/Pages/NotFound";
import Dashboard from "../Modules/Dashboard";

import ViewClass from "../Modules/Dashboard/Pages/NurseReports/ViewClass";
import AddClass from "../Modules/Dashboard/Pages/NurseReports/AddClass";
import EditClass from "../Modules/Dashboard/Pages/NurseReports/EditClass";

import Discharge from "../Modules/Dashboard/Pages/Discharge";
import ListDischarge from "../Modules/Dashboard/Pages/Discharge/List";
import AddDischarge from "../Modules/Dashboard/Pages/Discharge/Add";
import EditDischarge from "../Modules/Dashboard/Pages/Discharge/Edit";

import DashPage from "../Modules/Dashboard/Pages/DashPage";
import Dashboard2 from "../Modules/Dashboard2/Dashboard";
import DashPage2 from "../Modules/Dashboard2/Dashboard/Pages/DashPage";

import Lab from "../Modules/Dashboard2/Dashboard/Pages/Lab";
import LabList from "../Modules/Dashboard2/Dashboard/Pages/Lab/List";

import ImagingReq from "../Modules/Dashboard2/Dashboard/Pages/Imaging";
import ImagingList from "../Modules/Dashboard2/Dashboard/Pages/Imaging/List";

import ContactJournals from "../Modules/Dashboard2/Dashboard/Pages/Contact";
import ContactList from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList";

import Transfer from "../Modules/Dashboard/Pages/Transfer";
import ListTransfer from "../Modules/Dashboard/Pages/Transfer/List";

import CalendarContainer from "../Modules/Dashboard/Pages/CalendarTodo";
import CalendarList from "../Modules/Dashboard/Pages/CalendarTodo/ListCalendar";

import NurseReports from "../Modules/Dashboard2/Dashboard/Pages/NurseReports";
import ListNurseReports from "../Modules/Dashboard2/Dashboard/Pages/NurseReports/ListClass";
import AddNurseReport from "../Modules/Dashboard2/Dashboard/Pages/NurseReports/AddClass";
import ProtectedRoute from "./PrivateRoute";

function AllRoutes() {
  const [status, setStatus] = useState(false);
  const doctor = localStorage.getItem("primeDoctorUserId");

  useEffect(() => {
    if (doctor && doctor !== "") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [doctor]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact" element={<CalendarList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
