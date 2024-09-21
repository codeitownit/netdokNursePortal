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
import ConcludedLabList from "../Modules/Dashboard2/Dashboard/Pages/Lab/List/ConcludedLab";

import ImagingReq from "../Modules/Dashboard2/Dashboard/Pages/Imaging";
import ImagingList from "../Modules/Dashboard2/Dashboard/Pages/Imaging/List";
import ConcludedImagingList from "../Modules/Dashboard2/Dashboard/Pages/Imaging/List/Concluded";

import ContactJournals from "../Modules/Dashboard2/Dashboard/Pages/Contact";
import ContactList from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList";
import ViewNurseJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewNurse";
import ViewNurseOperation from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewNurseOp";
import ViewNurseProgress from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewNurseProgress.jsx";
import ViewNurseTelephone from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewNurseTel.jsx";
import ViewPhysioJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/ViewPhysiotherapy.jsx";
import ViewPhysioProgressJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/ViewPhysiotherapyProgress.jsx";
import ViewPhysioTelephoneJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/ViewPhysiotherapyTel.jsx";
import ViewPhysioConsultationJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/ViewPhysiotherapyConsultation.jsx";
import ViewPsychJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPsyc.jsx";
import ViewPsychTelephoneJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPsychTelephone.jsx";
import ViewPsychProgressJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPsychProgress.jsx";
import ViewPsychConsultationJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPsychConsultation.jsx";
import ViewOccupationalJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewOccupational.jsx";
import ViewOccupationalTelephoneJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewOccupationalTel.jsx";
import ViewOccupationalProgressJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewOccupationalProgress.jsx";
import ViewDischarge from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewDischarge.jsx";
import ViewProgressJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewProgress.jsx";
import ViewTelephoneJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewTelephone.jsx";
import ViewOperationJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewOperation.jsx";
import ViewPatientJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPatientJournal.jsx";
import ViewAdmissionJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewAdmission.jsx";
import ViewPediatricJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPediatric.jsx";
import ViewPediatricTelephoneJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPedTelephone.jsx";
import ViewPediatricProgressJournal from "../Modules/Dashboard2/Dashboard/Pages/Contact/ContactList/viewPedProgress.jsx";

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
import ConcludedListRefer from "../Modules/Dashboard2/Dashboard/Pages/Referrals/List/ConcludedReferral";

import Med from "../Modules/Dashboard2/Dashboard/Pages/Medicine";
import ListMed from "../Modules/Dashboard2/Dashboard/Pages/Medicine/List";
import PosedPrescriptions from "../Modules/Dashboard2/Dashboard/Pages/Medicine/Posed";
import PrevPrescriptions from "../Modules/Dashboard2/Dashboard/Pages/Medicine/PreviousList";
import OrderPrescriptions from "../Modules/Dashboard2/Dashboard/Pages/Medicine/Order/index.jsx";

import Fluid from "../Modules/Dashboard2/Dashboard/Pages/Fluid";
import AddFluid from "../Modules/Dashboard2/Dashboard/Pages/Fluid/Add";

import Vitals from "../Modules/Dashboard2/Dashboard/Pages/Vitals";
import ListVitals from "../Modules/Dashboard2/Dashboard/Pages/Vitals/ListVitals";

import AddCorrespondence from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/Add";
import Correspondence from "../Modules/Dashboard2/Dashboard/Pages/Correspondence";
import ListCorrespondence from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/List/index.jsx";
import ViewCorrespondence from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/viewCorrespondence.jsx";
import ViewDeathCertificate from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/viewDeathCertificate.jsx";
import ViewMedLeave from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/viewMedLeave.jsx";
import ViewMedFitness from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/viewMedicalFitness.jsx";
import ViewLiveBirth from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/viewLiveBirth.jsx";
import AddMedLeave from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/AddMedLeave.jsx";
import AddMedFitness from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/AddMedicalFitness.jsx";
import AddLiveBirth from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/AddLiveBirth.jsx";
import AddDeathCertificate from "../Modules/Dashboard2/Dashboard/Pages/Correspondence/View/AddDeathCert.jsx";

import Profile from "../Modules/Dashboard/Pages/UserProfile";
import ViewProfile from "../Modules/Dashboard/Pages/UserProfile/View";

import SingleWard from "../Modules/Dashboard/Pages/SingleWard";
import ListSingleWard from "../Modules/Dashboard/Pages/SingleWard/List";

import SingleDep from "../Modules/Dashboard/Pages/SingleDepartment/index.jsx";
import ListSingleDep from "../Modules/Dashboard/Pages/SingleDepartment/List/index.jsx";

import AdmissionTreatment from "../Modules/Dashboard2/Dashboard/Pages/ATM";
import ATMList from "../Modules/Dashboard2/Dashboard/Pages/ATM/List";

import Notification from "../Modules/Dashboard/Pages/Notifications";
import ListNotifications from "../Modules/Dashboard/Pages/Notifications/List";

import AddAdmission from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/AddAdmission";
import AddProgress from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/AddProgress";
import AddTelephone from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/AddTelephone";
import AddOperation from "../Modules/Dashboard2/Dashboard/Pages/ProgressJournals/Journals/AddOperation";

// import ChatBox from "../Modules/Dashboard/Pages/Chat";
// import ChatCard from "../Modules/Dashboard/Pages/Chat/View";

import PrivateRoute from "./PrivateRoute";
import ViewMedicineJournal from "../Modules/Dashboard2/Dashboard/Pages/Medicine/List/viewMed.jsx";


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
        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/viewPatient/:id" element={<Dashboard2 />}>
          <Route index element={<DashPage2 />} />
          <Route path="labRequests" element={<Lab />}>
            <Route path="current" index element={<LabList />} />
            <Route path="concluded" element={<ConcludedLabList />} />
          </Route>
          <Route path="admissionTreatment" element={<AdmissionTreatment />}>
            <Route index element={<ATMList />} />
          </Route>
          <Route path="imaging" element={<ImagingReq />}>
            <Route path="current" index element={<ImagingList />} />
            <Route path="concluded" element={<ConcludedImagingList />} />
          </Route>
          <Route path="add-admission-journal" element={<AddAdmission />}/>
          <Route path="add-progress-journal" element={<AddProgress />}/>
          <Route path="add-telephone-journal" element={<AddTelephone />}/>
          <Route path="add-operation-journal" element={<AddOperation />}/>

          <Route path="medLeave" element={<AddMedLeave />}/>
          <Route path="fitness" element={<AddMedFitness />}/>
          <Route path="liveBirth" element={<AddLiveBirth />}/>
          <Route path="deathCertificate" element={<AddDeathCertificate />}/>

          <Route path="viewMed/:id" element={<ViewMedicineJournal />}/>

          <Route path="fluidChart" element={<Fluid />}>
            <Route index element={<AddFluid />} />
          </Route>
        <Route path="correspondence" element={<Correspondence />}>
            <Route index element={<AddCorrespondence />} />
            <Route path="list" element={<ListCorrespondence />} />
            <Route path="view/correspondenceJournal/:id" element={<ViewCorrespondence />} />
            <Route path="view/deathCertificate/:id" element={<ViewDeathCertificate />} />
            <Route path="view/medLeave/:id" element={<ViewMedLeave />} />
            <Route path="view/medFitness/:id" element={<ViewMedFitness />} />
            <Route path="view/medLiveBirth/:id" element={<ViewLiveBirth />} />
          </Route>
          <Route path="vitals" element={<Vitals />}>
            <Route index element={<ListVitals />} />
          </Route>
          <Route path="discharge" element={<Discharge />}>
            <Route index element={<AddDischarge />} />
          </Route>
          <Route path="contact" element={<ContactJournals />}>
            <Route index element={<ContactList />} />
            <Route path="nurse/:id" element={<ViewNurseJournal />}/>
            <Route path="nurseOperation/:id" element={<ViewNurseOperation />}/>
            <Route path="nurseProgress/:id" element={<ViewNurseProgress />}/>
            <Route path="nurseTelephone/:id" element={<ViewNurseTelephone />}/>
            <Route path="physiotherapy/:id" element={<ViewPhysioJournal />}/>
            <Route path="physiotherapyProgress/:id" element={<ViewPhysioProgressJournal />}/>
            <Route path="physiotherapyTelephone/:id" element={<ViewPhysioTelephoneJournal />}/>
            <Route path="physiotherapyConsultation/:id" element={<ViewPhysioConsultationJournal />}/>
            <Route path="psychology/:id" element={<ViewPsychJournal />}/>
            <Route path="psychologyTelephone/:id" element={<ViewPsychTelephoneJournal />}/>
            <Route path="psychologyProgress/:id" element={<ViewPsychProgressJournal />}/>
            <Route path="psychologyConsultation/:id" element={<ViewPsychConsultationJournal />}/>
            <Route path="occupational/:id" element={<ViewOccupationalJournal />}/>
            <Route path="occupationalTelephone/:id" element={<ViewOccupationalTelephoneJournal />}/>
            <Route path="occupationalProgress/:id" element={<ViewOccupationalProgressJournal />}/>
            <Route path="pediatric/:id" element={<ViewPediatricJournal />}/>
            <Route path="pediatricTelephone/:id" element={<ViewPediatricTelephoneJournal />}/>
            <Route path="pediatricProgress/:id" element={<ViewPediatricProgressJournal />}/>
            <Route path="discharge/:id" element={<ViewDischarge />}/>
            <Route path="progress/:id" element={<ViewProgressJournal />}/>
            <Route path="telephone/:id" element={<ViewTelephoneJournal />}/>
            <Route path="operation/:id" element={<ViewOperationJournal />}/>
            <Route path="patient/:id" element={<ViewPatientJournal />}/>
            <Route path="admission/:id" element={<ViewAdmissionJournal />}/>
          </Route>
          <Route path="progressJournals" element={<ProgressJournals />}>
            <Route index element={<ProgressList />} />
            <Route path="admission/edit/:id" element={<AdmissionTemplate />}/>
            <Route path="telephone/edit/:id" element={<TelephoneTemplate />}/>
            <Route path="progress/edit/:id" element={<ProgressTemplate />}/>
            <Route path="operation/edit/:id" element={<OperationTemplate />}/>

          </Route>
          <Route path="referral" element={<Refer />}>
            <Route path="current" index element={<ListRefer />} />
            <Route path="concluded" element={<ConcludedListRefer />} />
          </Route>
          <Route path="medicine" element={<Med />}>
            <Route path="current" index element={<ListMed />} />
            <Route path="paused" element={<PosedPrescriptions />}/>
            <Route path="previous" element={<PrevPrescriptions />}/>
            <Route path="order" element={<OrderPrescriptions />}/>
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
          <Route path="wards" element={<SingleWard />}>
            <Route path="view/:id" index element={<ListSingleWard />} />
          </Route>
          <Route path="departments" element={<SingleDep />}>
            <Route path="view/:id" index element={<ListSingleDep />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route index element={<ViewProfile />} />
          </Route>
          <Route path="calendar" element={<CalendarContainer />}>
            <Route index element={<CalendarList />} />
          </Route>
          {/* <Route path="chat" element={<ChatBox />}>
            <Route index element={<ChatCard />} />
          </Route> */}
          <Route path="notifications" element={<Notification />}>
            <Route index element={<ListNotifications />} />
          </Route>
          <Route path="discharged" element={<Discharge />}>
            <Route index element={<ListDischarge />} />
            {/* <Route path="add" element={<AddDischarge />} /> */}
            {/* <Route path="edit/:id" element={<EditDischarge />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
          </Route>
          {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
