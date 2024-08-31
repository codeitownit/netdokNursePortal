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
function ViewPatientJournal({ text = "Edit Journal" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [condition, setCondition] = useState('');
  const [contact, setContact] = useState('');
  const [observation, setObservation] = useState('');
  const [clinicalSummary, setClinicalSummary] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [temp, setTemp] = useState('');
  const [pulse, setPulse] = useState('');
  const [breathing, setBreathing] = useState('');
  const [bp, setBp] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [pulseOximeter, setPulseOximeter] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [medication, setMedication] = useState('');
  const [managementPlan, setManagementPlan] = useState('');
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
        setTime(res?.data.time);
        setCondition(res?.data.condition);
        setContact(res?.data.contact);
        setObservation(res?.data.clinicalObservation);
        setClinicalSummary(res?.data.clinicalSummary);
        setDiagnosis(res?.data.progressDiagnosis);
        setWeight(res?.data.weight);
        setHeight(res?.data.height);
        setTemp(res?.data.temperature);
        setPulse(res?.data.pulseRate);
        setBreathing(res?.data.breathingRate);
        setBp(res?.data.bloodPressure);
        setPulseOximeter(res?.data.pulseOximeter);
        setBloodSugar(res?.data.bloodSugar);
        setSymptoms(res?.data.symptoms);
        setMedication(res?.data.medication);
        setManagementPlan(res?.data.managementPlan);
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
        label="Date"
        directInput={true}
        required={false}
        stateInput={admissionDate}
        setStateInput={setAdmissionDate}
        disabled={true}
      />
    </div>
        <TextInput
          label="Time"
          directInput={true}
          required={false}
          stateInput={time}
          setStateInput={setTime}
          disabled={true}
        />
      </div>
      <TextInput
          label="Contact"
          directInput={true}
          required={false}
          stateInput={contact}
          setStateInput={setContact}
          disabled={true}
        />
      <TextArea
        label="Condition"
        directInput={true}
        required={false}
        stateInput={condition}
        setStateInput={setCondition}
        disabled={true}
      />
      <h3 className="text-xl font-bold mt-6 mb-4">Vital Parameters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Weight (Kg)"
          directInput={true}
          required={true}
          stateInput={weight}
          setStateInput={setWeight}
          disabled={true}
        />
        <TextInput
          label="Height (cm)"
          directInput={true}
          required={false}
          stateInput={height}
          setStateInput={setHeight}
          disabled={true}
        />
        <TextInput
          label="Temp (°C)"
          directInput={true}
          required={false}
          stateInput={temp}
          setStateInput={setTemp}
          disabled={true}
        />
        <TextInput
          label="Pulse Rate (bpm)"
          directInput={true}
          required={false}
          stateInput={pulse}
          setStateInput={setPulse}
          disabled={true}
        />
        <TextInput
          label="Breathing Rate (bpm)"
          directInput={true}
          required={false}
          stateInput={breathing}
          setStateInput={setBreathing}
          disabled={true}
        />
        <TextInput
          label="Blood Pressure (mm Hg)"
          directInput={true}
          required={false}
          stateInput={bp}
          setStateInput={setBp}
          disabled={true}
        />
        <TextInput
          label="Pulse Oximeter (%)"
          directInput={true}
          required={false}
          stateInput={pulseOximeter}
          setStateInput={setPulseOximeter}
          disabled={true}
        />
        <TextInput
          label="Blood Sugar (mmol/L)"
          directInput={true}
          required={false}
          stateInput={bloodSugar}
          setStateInput={setBloodSugar}
          disabled={true}
        />
      </div>
      <TextArea
        label="Symptoms"
        directInput={true}
        required={false}
        stateInput={symptoms}
        setStateInput={setSymptoms}
        disabled={true}
      />
      <TextArea
        label="Medication"
        directInput={true}
        required={false}
        stateInput={medication}
        setStateInput={setMedication}
        disabled={true}
      />
      <TextArea
        label="Clinical Observation"
        directInput={true}
        required={false}
        stateInput={observation}
        setStateInput={setObservation}
        disabled={true}
      />
      <TextArea
        label="Clinical Summary"
        directInput={true}
        required={false}
        stateInput={clinicalSummary}
        setStateInput={setClinicalSummary}
        disabled={true}
      />
        <TextArea
          label="Management Plan"
          directInput={true}
          required={false}
          stateInput={managementPlan}
          setStateInput={setManagementPlan}
          disabled={true}
        />
        <TextArea
        label="Diagnosis"
        directInput={true}
        required={false}
        stateInput={diagnosis}
        setStateInput={setDiagnosis}
        disabled={true}
      />
    </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewPatientJournal;
