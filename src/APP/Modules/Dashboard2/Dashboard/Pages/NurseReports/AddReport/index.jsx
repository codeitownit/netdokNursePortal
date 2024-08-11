import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { TextArea } from "../../../../../../Components/Inputs";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import 'react-datepicker/dist/react-datepicker.css';
import { 
  hospitalId,
  doctorEmail, 
  doctorId, 
  pName, 
  patientId, 
  doctorName, 
  doctorPhone 
} from "../../../../../../Components/globals";

// eslint-disable-next-line react/prop-types
function AddNurseReport({ text = "Add Nurse Report" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [nutritionalState, setNutritionalState] = useState('');
  const [crp, setCrp] = useState('');
  const [fluid, setFluid] = useState('');
  const [pGlucose, setPGlucose] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [temp, setTemp] = useState('');
  const [pulse, setPulse] = useState('');
  const [bp, setBp] = useState('');
  const [pulseOximeter, setPulseOximeter] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [drinks, setDrinks] = useState('');
  const [urine, setUrine] = useState('');
  const [iv, setIv] = useState('');
  const [vomiting, setVomiting] = useState('');
  const [drainage, setDrainage] = useState('');
  const [stoma, setStoma] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [feaces, setFeaces] = useState('');
  const [diet, setDiet] = useState('');

  // const handleDateChange = (event) => {
  //   setAdmissionDate(event.target.value);
  // };

  const navigate = useNavigate();
  const request = useaxios();


  // useEffect(() => {
  //   async function fetchMember() {
  //     try {
  //       const res = await request({
  //         method: "GET",
  //         url: "member",

  //         auth: false,
  //       });

  //       // Check if the response is not an error
  //       if (res !== "error") {
  //         setMembers(res.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchMember();
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      date: admissionDate,
      time: time.toLowerCase(),
      // document: documentId,
      weight: weight,
      height: height,
      temperature: temp,
      pulseRate: pulse,
      bloodPressure: bp,
      pulseOximeter: pulseOximeter,
      bloodSugar: bloodSugar,
      nutritionalState: nutritionalState,
      fluid: fluid,
      crp: crp,
      pglucose: pGlucose,
      oxygen: oxygen,
      currentState: currentState,
      feaces: feaces,
      diet: diet,
      drinks: drinks,
      urine: urine,
      iv: iv,
      stoma: stoma,
      vomiting: vomiting,
      drainage: drainage,
      type: "admissionReport",
      doctorEmail: doctorEmail,
      doctorName: doctorName,
      doctorPhone: doctorPhone,
      docId: doctorId,
      fromVideoCall: false,
      patient: patientId,
      patientName: pName,
      // userGender: userGender.toLowerCase(),
      // userWeight: userWeight,
      createdByName: doctorName,
      createdBy: doctorId,
      createdByEmail: doctorEmail,
      train: false,
      predictive: false,
      status: "active",
      statusCode: 0,
      hospitalId: hospitalId,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()

    };

    console.log(formData);

    const res = await request({
      method: "POST",
      url: "patientJournal",
      data: formData,
      auth: true,
    });

    console.log(res);

    if (res !== "error") {
      console.log(formData)
      // navigate(`/viewPatient/:id/nurseReports`);
      return;
    }
  }
  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Add Nurse Report</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <DateInput
        label="Date"
        directInput={true}
        required={false}
        stateInput={admissionDate}
        setStateInput={setAdmissionDate}
      />
    </div>
        <TimeInput
          label="Time"
          directInput={true}
          required={false}
          stateInput={time}
          setStateInput={setTime}
        />
      </div>

      <TextArea
        label="Nutritional State"
        directInput={true}
        required={false}
        stateInput={nutritionalState}
        setStateInput={setNutritionalState}
      />
      <TextArea
        label="CRP Rapid Test"
        directInput={true}
        required={false}
        stateInput={crp}
        setStateInput={setCrp}
      />
      <TextInput
        label="Urinalysis Bedside Test"
        directInput={true}
        required={false}
        stateInput={fluid}
        setStateInput={setFluid}
      />
      <TextInput
        label="p-glucose"
        directInput={true}
        required={false}
        stateInput={pGlucose}
        setStateInput={setPGlucose}
      />
      <TextInput
        label="Oxygen Saturation"
        directInput={true}
        required={false}
        stateInput={oxygen}
        setStateInput={setOxygen}
      />

      <h3 className="text-xl font-bold mt-6 mb-4">Vital Parameters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Weight (Kg)"
          directInput={true}
          required={true}
          stateInput={weight}
          setStateInput={setWeight}
        />
        <TextInput
          label="Height (cm)"
          directInput={true}
          required={true}
          stateInput={height}
          setStateInput={setHeight}
        />
        <TextInput
          label="Temp (°C)"
          directInput={true}
          required={false}
          stateInput={temp}
          setStateInput={setTemp}
        />
        <TextInput
          label="Pulse Rate (bpm)"
          directInput={true}
          required={false}
          stateInput={pulse}
          setStateInput={setPulse}
        />
        <TextInput
          label="Blood Pressure (mm Hg)"
          directInput={true}
          required={false}
          stateInput={bp}
          setStateInput={setBp}
        />
        <TextInput
          label="Pulse Oximeter (%)"
          directInput={true}
          required={false}
          stateInput={pulseOximeter}
          setStateInput={setPulseOximeter}
        />
        <TextInput
          label="Blood Sugar (mmol/L)"
          directInput={true}
          required={false}
          stateInput={bloodSugar}
          setStateInput={setBloodSugar}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <TextInput
          label="Drinks (ml)"
          directInput={true}
          required={false}
          stateInput={drinks}
          setStateInput={setDrinks}
        />
        <TextInput
          label="Urine (ml)"
          directInput={true}
          required={false}
          stateInput={urine}
          setStateInput={setUrine}
        />
        <TextInput
          label="IV fluids/infusion (ml)"
          directInput={true}
          required={false}
          stateInput={iv}
          setStateInput={setIv}
        />
        <TextInput
          label="Vomiting (ml)"
          directInput={true}
          required={false}
          stateInput={vomiting}
          setStateInput={setVomiting}
        />
        <TextInput
          label="Drainage (ml)"
          directInput={true}
          required={false}
          stateInput={drainage}
          setStateInput={setDrainage}
        />
        <TextInput
          label="Stoma (ml)"
          directInput={true}
          required={false}
          stateInput={stoma}
          setStateInput={setStoma}
        />
      </div>

      <TextArea
        label="Current State"
        directInput={true}
        required={false}
        stateInput={currentState}
        setStateInput={setCurrentState}
      />
      <TextArea
      className="w-10"
        label="Feaces/Bowel Opening"
        directInput={true}
        required={false}
        stateInput={feaces}
        setStateInput={setFeaces}
      />
      <TextArea
        label="Diet"
        directInput={true}
        required={false}
        stateInput={diet}
        setStateInput={setDiet}
      />
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNurseReport;
