import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// eslint-disable-next-line react/prop-types
function ViewPhysioConsultationJournal({ text = "Edit Journal" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [referringClinician, setReferringClinician] = useState('');
  const [clinic, setClinic] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [physiotherapist, setPhysiotherapist] = useState('');
  const [notes, setNotes] = useState('');
  const [reason, setReason] = useState('');
  const [locomotion, setLocomotion] = useState('');
  const [nervous, setNervous] = useState('');
  const [respiratory, setRespiratory] = useState('');
  const [ongoingTreatment, setOngoingTreatment] = useState('');

  const [data, setData] = useState([]);
  
  const { id } = useParams();
  const pId = localStorage.getItem("universalPatientId")

  const navigate = useNavigate();
  const request = useaxios();

  const fetchData = async () => {
    
    try {
      const res = await request({
        method: "GET",
        url: `patientJournal/${id}`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data.date);
        setData(res?.data || []);
        setAdmissionDate(res?.data.date);
        setTime(res?.data.admissionTime);
        setReferringClinician(res?.data.referringClinician);
        setClinic(res?.data.clinic);
        setDiagnosis(res?.data.progressDiagnosis);
        setPhysiotherapist(res?.data.physiotherapist);
        setNotes(res?.data.clinicalNotes)
        setReason(res?.data.reason);
        setLocomotion(res?.data.locomotion);
        setNervous(res?.data.nervousSystem);
        setRespiratory(res?.data.respiratorySystem);
        setOngoingTreatment(res?.data.ongoingTreatment);

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);



//   function handleEdit(e) {
//     e.preventDefault();
//     const formData = {
//         bloodPressure: bp,
//         bloodSugar: bloodSugar,
//         history: history,
//         nursingProcedures: procedures,
//         breathingRate: breathing,
//         review: review,
//         temperature: temp,
//         progressDiagnosis: diagnosis,
//         height: height,
//         pulseOximeter: pulseOximeter,
//         complaints: history,
//         weight: weight,
//         specialist: specialist,
//         tests: tests,
//         pulseRate: pulse,
//         time: time,
//         date: admissionDate,
//         carePlan: carePlan,
//       };
//     async function patch() {
//       try {
//         const res = await request({
//           method: "PUT",
//           url: `patientJournal/${id}`,
//           data: formData,
//           auth: false,
//         });
//         // Check if the response is not an error
//         if (res !== "error") {
//           navigate(`/viewPatient/${pId}/progressJournals`);
//         }
//         //console.log("success");
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     patch();
//   }

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" 
        // onSubmit={handleEdit}
        >
          <div className=" flex flex-row justify-between data-center">
            <h1 className={headers}>View Journal</h1>
            {/* <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" /> */}
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInput
        label="Admission Date"
        directInput={true}
        required={false}
        stateInput={admissionDate}
        setStateInput={setAdmissionDate}
        disabled={true}
      />
    </div>
        <TextInput
          label="Admission Time"
          directInput={true}
          required={false}
          stateInput={time}
          setStateInput={setTime}
          disabled={true}
        />
      </div>
      <TextInput
        label="Name of referring Clinician"
        directInput={true}
        required={false}
        stateInput={referringClinician}
        setStateInput={setReferringClinician}
        disabled={true}
      />
      <TextArea
        label="Name of Clinic"
        directInput={true}
        required={false}
        stateInput={clinic}
        setStateInput={setClinic}
        disabled={true}
      />
      <TextArea
        label="Name of Physiotherapist/Occupational Therapist"
        directInput={true}
        required={false}
        stateInput={physiotherapist}
        setStateInput={setPhysiotherapist}
        disabled={true}
      />
      <TextArea
        label="Diagnoses Codes"
        directInput={true}
        required={false}
        stateInput={diagnosis}
        setStateInput={setDiagnosis}
        disabled={true}
      />
      <TextArea
        label="Clinical Notes"
        directInput={true}
        required={false}
        stateInput={notes}
        setStateInput={setNotes}
        disabled={true}
      />
        <TextArea
          label="Reason for referral"
          directInput={true}
          required={false}
          stateInput={reason}
          setStateInput={setReason}
          disabled={true}
        />
        <TextArea
          label="Status of Locomotive system"
          directInput={true}
          required={false}
          stateInput={locomotion}
          setStateInput={setLocomotion}
          disabled={true}
        /><TextArea
        label="Status of Nervous System"
        directInput={true}
        required={false}
        stateInput={nervous}
        setStateInput={setNervous}
        disabled={true}
      /><TextArea
      label="Status of Respiratory System"
      directInput={true}
      required={false}
      stateInput={respiratory}
      setStateInput={setRespiratory}
      disabled={true}
    /><TextArea
    label="Ongoing Treatment"
    directInput={true}
    required={false}
    stateInput={ongoingTreatment}
    setStateInput={setOngoingTreatment}
    disabled={true}
  />
        
    </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewPhysioConsultationJournal;
