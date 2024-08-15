import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useNavigate } from 'react';
import Login from "../Modules/Dashboard/Pages/Login";
import NotFound from "../Modules/Dashboard/Pages/NotFound";
import Dashboard from "../Modules/Dashboard";

import Discharge from "../Modules/Dashboard/Pages/Discharge";
import ListDischarge from "../Modules/Dashboard/Pages/Discharge/List";
import AddDischarge from "../Modules/Dashboard/Pages/Discharge/Add";

import DashPage from "../Modules/Dashboard/Pages/DashPage";
import Dashboard2 from "../Modules/Dashboard2/Dashboard";
import DashPage2 from "../Modules/Dashboard2/Dashboard/Pages/DashPage";

import Lab from "../Modules/Dashboard2/Dashboard/Pages/Lab";
import LabList from "../Modules/Dashboard2/Dashboard/Pages/Lab/List";

import ImagingReq from "../Modules/Dashboard2/Dashboard/Pages/Imaging";
import ImagingList from "../Modules/Dashboard2/Dashboard/Pages/Imaging/List";

import ContactJournals from "../Modules/Dashboard2/Dashboard/Pages/Contact";
import ContactList from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList";

import ProgressJournals from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals";
import ProgressList from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/ContactList";
import AdmissionTemplate from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/AdmissionJournal";
import OperationTemplate from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/OperationTemplate";
import TelephoneTemplate from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/TelephoneTemplate";
import ProgressTemplate from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/ProgressTemplate";

import Transfer from "../Modules/Dashboard/Pages/Transfer";
import ListTransfer from "../Modules/Dashboard/Pages/Transfer/List";

import CalendarContainer from "../Modules/Dashboard/Pages/CalendarTodo";
import CalendarList from "../Modules/Dashboard/Pages/CalendarTodo/ListCalendar";

import NurseReports from "../Modules/Dashboard2/Dashboard/Pages/NurseReports";
import ListNurseReports from "../Modules/Dashboard2/Dashboard/Pages/NurseReports/ListReport";
import AddNurseReport from "../Modules/Dashboard2/Dashboard/Pages/NurseReports/AddReport";
import EditNurseReport from "../Modules/Dashboard2/Dashboard/Pages/NurseReports/EditReport";

import Refer from "../Modules/Dashboard2/Dashboard/Pages/Referrals";
import ListRefer from "../Modules/Dashboard2/Dashboard/Pages/Referrals/List";

import Med from "../Modules/Dashboard2/Dashboard/Pages/Medicine";
import ListMed from "../Modules/Dashboard2/Dashboard/Pages/Medicine/List";
import PrevPrescriptions from "../Modules/Dashboard2/Dashboard/Pages/Medicine/List/previousPrescriptions";

import Fluid from "../Modules/Dashboard2/Dashboard/Pages/Fluid";
import AddFluid from "../Modules/Dashboard2/Dashboard/Pages/Fluid/Add";

import Vitals from "../Modules/Dashboard2/Dashboard/Pages/Vitals";
import ListVitals from "../Modules/Dashboard2/Dashboard/Pages/Vitals/ListVitals";

import AddCorrespondence from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/Add";
import Correspondence from "../Modules/Dashboard2/Dashboard/Pages/Correspondence";

import Profile from "../Modules/Dashboard/Pages/UserProfile";
import ViewProfile from "../Modules/Dashboard/Pages/UserProfile/View";

import ProtectedRoute from "./PrivateRoute";

function AllRoutes() {
  const [status, setStatus] = useState(false);
  const doctor = localStorage.getItem("primeDoctorUserId");
  const id = localStorage.getItem("universalPatientId")

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
          <Route path="fluidChart" element={<Fluid />}>
            <Route index element={<AddFluid />} />
          </Route>
        <Route path="correspondence" element={<Correspondence />}>
            <Route index element={<AddCorrespondence />} />
          </Route>
          <Route path="vitals" element={<Vitals />}>
            <Route index element={<ListVitals />} />
          </Route>
          <Route path="discharge" element={<Discharge />}>
            <Route index element={<AddDischarge />} />
          </Route>
          <Route path="contact" element={<ContactJournals />}>
            <Route index element={<ContactList />} />
          </Route>
          <Route path="progressJournals" element={<ProgressJournals />}>
            <Route index element={<ProgressList />} />
            <Route path="admission/edit/:id" element={<AdmissionTemplate />}/>
            <Route path="telephone/edit/:id" element={<TelephoneTemplate />}/>
            <Route path="progress/edit/:id" element={<ProgressTemplate />}/>
            <Route path="operation/edit/:id" element={<OperationTemplate />}/>

          </Route>
          <Route path="referral" element={<Refer />}>
            <Route index element={<ListRefer />} />
          </Route>
          <Route path="medicine" element={<Med />}>
            <Route index element={<ListMed />} />
            <Route path="previousPrescriptions" element={<PrevPrescriptions />}/>
          </Route>
          <Route path="nurseReports" element={<NurseReports />}>
            <Route index element={<ListNurseReports />} />
            <Route path=":id" element={<ListNurseReports />} />
            <Route path="add" element={<AddNurseReport />} />
            <Route path="edit/:id" element={<EditNurseReport />} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        {/* <ProtectedRoute path="/dashboard" element={<Dashboard/>} /> */}
          <Route index element={<DashPage />} />
          <Route path="transfer" element={<Transfer />}>
            <Route index element={<ListTransfer />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route index element={<ViewProfile />} />
          </Route>
          <Route path="calendar" element={<CalendarContainer />}>
            <Route index element={<CalendarList />} />
          </Route>
          <Route path="discharged" element={<Discharge />}>
            <Route index element={<ListDischarge />} />
            {/* <Route path="add" element={<AddDischarge />} /> */}
            {/* <Route path="edit/:id" element={<EditDischarge />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
