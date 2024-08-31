import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import useaxios from "../../../../../../Hooks/useAxios";
import 'react-datepicker/dist/react-datepicker.css';
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";

function ViewAdmissionJournal() {
  const [admissionDate, setAdmissionDate] = useState('f');
  const [admissionTime, setAdmissionTime] = useState('');
  const [contact, setContact] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [admissionDepartment, setAdmissionDepartment] = useState('');
  const [nurse, setNurse] = useState('');
  const [admittingUnit, setAdmittingUnit] = useState('');
  const [room, setRoom] = useState('');
  const [condition, setCondition] = useState('');
  const [currentPreviousDiagnosis, setCurrentPreviousDiagnosis] = useState('');
  const [progressHistory, setProgressHistory] = useState('');
  const [ongoingPrescription, setOngoingPrescription] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bp, setBp] = useState('');
  const [nutritionStatus, setNutritionStatus] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [breathingRate, setBreathingRate] = useState('');
  const [systemicExamination, setSystemicExamination] = useState('');
  const [clinicalSummary, setClinicalSummary] = useState('');
  const [plannedLabDiagnostics, setPlannedLabDiagnostics] = useState('');
  const [plannedImagingDiagnostics, setPlannedImagingDiagnostics] = useState('');
  const [physiology, setPhysiology] = useState('');
  const [plannedTreatment, setPlannedTreatment] = useState('');
  const [progressDiagnosis, setProgressDiagnosis] = useState('');
  const [referral, setReferral] = useState('');
  
  const { id } = useParams();
  const request = useaxios();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `patientJournal/${id}`,
        body: {},
        auth: false,
      });
      if (res !== "error") {
        const data = res?.data;
        setAdmissionDate(res?.data.admissionDate);
        setAdmissionTime(data.admissionTime);
        setContact(data.contact);
        setNurse(data.nurse);
        setAdmittingUnit(data.admittingUnit);
        setRoom(data.room);
        setWeight(data.weight);
        setHeight(data.height);
        setPulseRate(data.pulseRate);
        setBreathingRate(data.breathingRate);
        setBp(data.bloodPressure);
        setBmi(data.patientBMI);
        setConsultationType(data.consultationType);
        setAdmissionDepartment(data.selectedDepartment)
        setCondition(data.condition);
        setCurrentPreviousDiagnosis(data.currentPreviousDiagnosis);
        setProgressHistory(data.progressHistory);
        setOngoingPrescription(data.ongoingPrescription);
        setWeight(data.patientWeight);
        setHeight(data.patientHeight);
        // patientBMI
        setBp(data.patientBP);
        setNutritionStatus(data.patientNutrition);
        setPulseRate(data.patientPulse);
        setBreathingRate(data.patientBreathing);
        setSystemicExamination(data.systemicExamination);
        setClinicalSummary(data.clinicalSummary);
        setPlannedLabDiagnostics(data.plannedLabDiagnostics);
        setPlannedImagingDiagnostics(data.plannedImagingDiagnostics);
        setPhysiology(data.physiology);
        setPlannedTreatment(data.plannedTreatment);
        setProgressDiagnosis(data.progressDiagnosis);
        setReferral(data.plannedRefferral);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={grayPanel()}>
      <div className="">
      <form className={outerDiv} type="submit">
        <h1 className={headers}>View Journal</h1>
        <div className={divStyle}>
        <div className="p-6 bg-white rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput 
          label="Admission Date"
          directInput={true}
          required={false}
          stateInput={admissionDate}
          setStateInput={setAdmissionDate}
          disabled={true}
          />
          <TextInput label="Admission Time" directInput={true} required={false} stateInput={admissionTime} setStateInput={setAdmissionTime} disabled />
          </div>
          <TextInput label="Contact" directInput={true} required={false} stateInput={contact} setStateInput={setContact} disabled />
          <TextInput label="Consultation Type" directInput={true} required={false} stateInput={consultationType} setStateInput={setConsultationType} disabled/>
          <TextInput label="Admission Department" directInput={true} required={false} stateInput={admissionDepartment} setStateInput={setAdmissionDepartment} disabled />
          <TextInput label="Nurse" directInput={true} required={false} stateInput={nurse} setStateInput={setNurse} disabled/>
          <TextInput label="Admitting Unit" directInput={true} required={false} stateInput={admittingUnit} setStateInput={setAdmittingUnit} disabled />
          <TextInput label="Admitting Room" directInput={true} required={false} stateInput={room} setStateInput={setRoom} disabled />
          <TextArea label="Condition" directInput={true} required={false} stateInput={condition} setStateInput={setCondition} disabled />
          <TextArea label="Current Previous Diagnosis" directInput={true} required={false} stateInput={currentPreviousDiagnosis} setStateInput={setCurrentPreviousDiagnosis} disabled />
          <TextArea label="Progress History" directInput={true} required={false} stateInput={progressHistory} setStateInput={setProgressHistory} disabled />
          <TextArea label="Ongoing Prescription" directInput={true} required={false} stateInput={ongoingPrescription} setStateInput={setOngoingPrescription} disabled />
          <TextInput label="Weight" directInput={true} required={false} stateInput={weight} setStateInput={setWeight} disabled />
          <TextInput label="Height" directInput={true} required={false} stateInput={height} setStateInput={setHeight} disabled />
          <TextInput label="BMI" directInput={true} required={false} stateInput={bmi} setStateInput={setBmi} disabled />
          <TextInput label="Blood Pressure" directInput={true} required={false} stateInput={bp} setStateInput={setBp} disabled />
          <TextInput label="Nutrition Status" directInput={true} required={false} stateInput={nutritionStatus} setStateInput={setNutritionStatus} disabled />
          <TextInput label="Pulse Rate" directInput={true} required={false} stateInput={pulseRate} setStateInput={setPulseRate} disabled />
          <TextInput label="Breathing Rate" directInput={true} required={false} stateInput={breathingRate} setStateInput={setBreathingRate} disabled />
          <TextArea label="Systemic Examination" directInput={true} required={false} stateInput={systemicExamination} setStateInput={setSystemicExamination} disabled />
          <TextArea label="Clinical Summary" directInput={true} required={false} stateInput={clinicalSummary} setStateInput={setClinicalSummary} disabled />
          <TextArea label="Planned Lab Diagnostics" directInput={true} required={false} stateInput={plannedLabDiagnostics} setStateInput={setPlannedLabDiagnostics} disabled />
          <TextArea label="Planned Imaging Diagnostics" directInput={true} required={false} stateInput={plannedImagingDiagnostics} setStateInput={setPlannedImagingDiagnostics} disabled />
          <TextArea label="Planned Physiology" directInput={true} required={false} stateInput={physiology} setStateInput={setPhysiology} disabled />
          <TextArea label="Planned Treatment" directInput={true} required={false} stateInput={plannedTreatment} setStateInput={setPlannedTreatment} disabled />
          <TextInput label="Diagnosis" directInput={true} required={false} stateInput={progressDiagnosis} setStateInput={setProgressDiagnosis} disabled />
          <TextArea label="Referral" directInput={true} required={false} stateInput={referral} setStateInput={setReferral} disabled />
          </div>
          </div>
      </form>
      </div>
    </div>
  );
}

export default ViewAdmissionJournal;
