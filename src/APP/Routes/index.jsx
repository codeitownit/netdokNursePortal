import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useNavigate } from 'react';
import Landing from "../Modules/Dashboard/Pages/Landing";
import Login from "../Modules/Dashboard/Pages/Login";
import NotFound from "../Modules/Dashboard/Pages/NotFound";
import Dashboard from "../Modules/Dashboard";

import ViewClass from "../Modules/Dashboard/Pages/NurseReports/ViewClass";
import AddClass from "../Modules/Dashboard/Pages/NurseReports/AddClass";
import EditClass from "../Modules/Dashboard/Pages/NurseReports/EditClass";

import Exam from "../Modules/Dashboard/Pages/Exam";
import AddExam from "../Modules/Dashboard/Pages/Exam/AddExam";
import EditExam from "../Modules/Dashboard/Pages/Exam/EditExam";
import ListExam from "../Modules/Dashboard/Pages/Exam/ListExam";

import Report from "../Modules/Dashboard/Pages/Exam/Report/Report";

import AddGS from "../Modules/Dashboard/Pages/Exam/GradingSys/AddGS";
import EditGS from "../Modules/Dashboard/Pages/Exam/GradingSys/EditGS";
import ListGS from "../Modules/Dashboard/Pages/Exam/GradingSys/ListGS";

import Student from "../Modules/Dashboard/Pages/Student";
import StudentList from "../Modules/Dashboard/Pages/Student/StudentList";
import StudentProfile from "../Modules/Dashboard/Pages/Student/StudentProfile";
import AddStudent from "../Modules/Dashboard/Pages/Student/AddStudent";
import EditStudent from "../Modules/Dashboard/Pages/Student/EditStudent";

import Parent from "../Modules/Dashboard/Pages/Parent";

import Discharge from "../Modules/Dashboard/Pages/Discharge";
import ListDischarge from "../Modules/Dashboard/Pages/Discharge/List";
import AddDischarge from "../Modules/Dashboard/Pages/Discharge/Add";
import EditDischarge from "../Modules/Dashboard/Pages/Discharge/Edit";

import Member from "../Modules/Dashboard/Pages/Member";
import AddMember from "../Modules/Dashboard/Pages/Member/AddMember";
import EditMember from "../Modules/Dashboard/Pages/Member/Edit";
import DeleteMember from "../Modules/Dashboard/Pages/Member/DeleteMember";
import MemberList from "../Modules/Dashboard/Pages/Member/List";

import SchoolAttendance from "./../Modules/Dashboard/Pages/SchoolAttendance";

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
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/viewPatient/:id" element={<Dashboard2 />}>
          <Route index element={<DashPage2 />} />
          <Route path="labRequests" element={<Lab />}>
            <Route index element={<LabList />} />
          </Route>
          <Route path="imaging" element={<ImagingReq />}>
            <Route index element={<ImagingList />} />
          </Route>
          <Route path="contact" element={<ContactJournals />}>
            <Route index element={<ContactList />} />
          </Route>
          <Route path="nurseReports" element={<NurseReports />}>
            <Route index element={<ListNurseReports />} />
            <Route path=":id" element={<ViewClass />} />
            <Route path="add" element={<AddNurseReport />} />
            <Route path="edit/:id" element={<EditClass />} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute ><Dashboard /></ProtectedRoute>}>
        {/* <ProtectedRoute path="/dashboard" element={<Dashboard/>} /> */}
          <Route index element={<DashPage />} />
          <Route path="transfer" element={<Transfer />}>
            <Route index element={<ListTransfer />} />
          </Route>
          <Route path="calendar" element={<CalendarContainer />}>
            <Route index element={<CalendarList />} />
          </Route>
          <Route path="students" element={<Student />}>
            <Route index element={<StudentList />} />
            <Route path="profile/:id" element={<StudentProfile />} />
            <Route path="add" element={<AddStudent />} />
            <Route path="edit/:id" element={<EditStudent />} />
          </Route>
          <Route path="calendar" element={<Member />}>
            <Route index element={<MemberList />} />
            <Route path="add" element={<AddMember />} />
            <Route path="edit/:id" element={<EditMember />} />
            <Route path="delete/:id" element={<DeleteMember />} />
          </Route>
          <Route path="parent" element={<Parent />} />
          <Route path="discharged" element={<Discharge />}>
            <Route index element={<ListDischarge />} />
            <Route path="add" element={<AddDischarge />} />
            <Route path="edit/:id" element={<EditDischarge />} />
          </Route>
          <Route path="exam" element={<Exam />}>
            <Route index element={<ListExam />} />
            <Route path="add" element={<AddExam />} />
            <Route path="edit/:id" element={<EditExam />} />
            <Route path="listGrade" element={<ListGS />} />
            <Route path="addGrade" element={<AddGS />} />
            <Route path="editGrade/:id" element={<EditGS />} />
            <Route path="report" element={<Report />} />
          </Route>
          <Route path="school-attendance" element={<SchoolAttendance />} />
          <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
