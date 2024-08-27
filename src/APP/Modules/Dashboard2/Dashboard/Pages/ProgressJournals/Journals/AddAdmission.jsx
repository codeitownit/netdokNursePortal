import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { TextArea } from "../../../../../../Components/Inputs";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import 'react-datepicker/dist/react-datepicker.css';
import DropdownBtn from "../../../../../../Components/Buttons/Dropdown-btn";


// eslint-disable-next-line react/prop-types
function AddAdmission({ text = "Add Journal" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [condition, setCondition] = useState('');
  const [history, setHistory] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [temp, setTemp] = useState('');
  const [pulse, setPulse] = useState('');
  const [breathing, setBreathing] = useState('');
  const [bp, setBp] = useState('');
  const [previousTreatment, setPreviousTreatment] = useState('');
  const [pulseOximeter, setPulseOximeter] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [procedures, setProcedures] = useState('');
  const [tests, setTests] = useState('');
  const [review, setReview] = useState('');
  const [carePlan, setCarePlan] = useState('');
  const [icd10Code, setIcd10Code] = useState('');
  const [progressDiagnosis, setProgressDiagnosis] = useState('');
  const icd10InputRef = useRef(null);
  
  const pId = localStorage.getItem("universalPatientId")

  const navigate = useNavigate();
  const request = useaxios();

  useEffect(() => {
    const autocompleter = new window.Def.Autocompleter.Search(
        'icd10', 
        'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name', 
        {
            tableFormat: false,
            valueCols: [1],
            colHeaders: ['Name'],
            divTag: 'div',
            divClass: 'autocomplete-suggestions',
            zIndex: 9999,
            position: 'absolute'
        }
    );

    return () => {
        autocompleter.destroy();
    };
  }, []);

  const handleICD10Change = (e) => {
    setIcd10Code(e.target.value);
  };

  const handleICD10Defined = (e) => {
    if (e.key === ' ') {
      setProgressDiagnosis((prev) => `${prev}${e.target.value}\n`);
      setIcd10Code('');
    }
  };

  async function handleSubmit(statusCode) {
    const formData = {
        bloodPressure: bp,
        bloodSugar: bloodSugar,
        previousTreatment: previousTreatment,
        nursingProcedures: procedures,
        breathingRate: breathing,
        review: review,
        temperature: temp,
        progressDiagnosis: progressDiagnosis,
        height: height,
        pulseOximeter: pulseOximeter,
        complaints: history,
        weight: weight,
        conditionAtAdmission: condition,
        tests: tests,
        pulseRate: pulse,
        time: time,
        date: admissionDate,
        carePlan: carePlan,
        doctorEmail: localStorage.getItem("primeDoctorUserEmail"),
        doctorName: localStorage.getItem("universalDoctorName"),
        doctorPhone: localStorage.getItem("universalDoctorPhone"),
        type: "nurseMidwives",
        docId: localStorage.getItem("primeDoctorUserId"),
        fromVideoCall: false,
        // document: documentId,
        patient: pId,
        createdByName: localStorage.getItem("universalDoctorName"),
        createdBy: localStorage.getItem("primeDoctorUserId"),
        createdByEmail: localStorage.getItem("primeDoctorUserEmail"),
        train: false,
        status: "active",
        statusCode: statusCode,
        hospitalId: localStorage.getItem("universalHospitalId"),
        timestamp: new Date(),
      };
      const res = await request({
        method: "POST",
        url: "patientJournal",
        data: formData,
        auth: false,
      });
  
      console.log(res);
  
      if (res !== "error") {
        console.log(formData);
        navigate(`/viewPatient/${pId}`);
        return;
      }
  }
  const dropdownItems = [
    { label: "Save Signed", onClick: () => handleSubmit(1)},
    { label: "Save Unsigned", onClick: () => handleSubmit(0) }
  ];

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv}>
          <div className=" flex flex-row justify-between data-center">
            <h1 className={headers}>Add Journal</h1>
            <DropdownBtn txt={text} dropdownItems={dropdownItems}/>
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
        label="Condition At Admission"
        directInput={true}
        required={false}
        stateInput={condition}
        setStateInput={setCondition}
      />
      <TextArea
        label="History of the Presenting Complaints"
        directInput={true}
        required={false}
        stateInput={history}
        setStateInput={setHistory}
      />
      <TextArea
        label="Previous Treatment & outcomes"
        directInput={true}
        required={false}
        stateInput={previousTreatment}
        setStateInput={setPreviousTreatment}
      />
      <div className="col-sm-12">
                <div className="form-group">
                  <label>Working Diagnosis</label>
                  <input
                    type="text"
                    id="icd10"
                    ref={icd10InputRef}
                    value={icd10Code}
                    onChange={handleICD10Change}
                    onKeyDown={handleICD10Defined} // Trigger on Enter key press
                    placeholder="ICD10 Code"
                    className="border-2 rounded-lg py-2 px-4 mb-8 w-full"
                  />
                  <textarea
                    className="border-2 rounded-lg py-2 px-4 mb-8 w-full"
                    id="progressDiagnosis"
                    name="Text1"
                    cols="20"
                    rows="6"
                    value={progressDiagnosis} // Reflect the updated progress diagnosis
                  />
                </div>
              </div>

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
          required={false}
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
          label="Breathing Rate (bpm)"
          directInput={true}
          required={false}
          stateInput={breathing}
          setStateInput={setBreathing}
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
        <TextArea
          label="Nursing Procedures"
          directInput={true}
          required={false}
          stateInput={procedures}
          setStateInput={setProcedures}
        />
        <TextArea
          label="Planned Procedures & Tests"
          directInput={true}
          required={false}
          stateInput={tests}
          setStateInput={setTests}
        />
        <TextArea
          label="Review & Consultations"
          directInput={true}
          required={false}
          stateInput={review}
          setStateInput={setReview}
        />
        <TextArea
          label="Care Plan"
          directInput={true}
          required={false}
          stateInput={carePlan}
          setStateInput={setCarePlan}
        />
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAdmission;
