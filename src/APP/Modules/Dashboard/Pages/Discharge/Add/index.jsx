import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../Components/Inputs/TextInput";
import { TextArea } from "../../../../../Components/Inputs";
import DateInput from "../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../Components/Inputs/TimeInput";
import AppContext from "../../../../../Provider/Context";
import 'react-datepicker/dist/react-datepicker.css';
import {  hospitalId,
  doctorEmail, 
  doctorId, 
  pName, 
  patientId, 
  doctorName, 
  doctorPhone } from "../../../../../Components/globals";

function AddDischarge({ text = "Discharge Patient" }) {
  const [dischargeDate, setDischargeDate] = useState('');
  const [time, setTime] = useState('');
  const [progressHistory, setProgressHistory] = useState('');
  const [progress, setProgress] = useState('');
  const [condition, setCondition] = useState('');
  const [managementReport, setManagementReport] = useState('');
  const [dischargePlan, setDischargePlan] = useState('');
  const [dischargePrescription, setDischargePrescription] = useState('');
  const [followUpPlan, setFollowUpPlan] = useState('');
  const [icd10Code, setIcd10Code] = useState('');
  const [progressDiagnosis, setProgressDiagnosis] = useState('');
  const icd10InputRef = useRef(null);

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
    if (e.key === 'Enter') {
      setProgressDiagnosis((prev) => `${prev}${e.target.value}\n`);
      setIcd10Code('');
    }
  };

  const navigate = useNavigate();
  const request = useaxios();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      // admissionDate: admissionDate.value,
      dischargeDate: dischargeDate,
      time:time,
      // contact: contact.value,
      progressHistory: progressHistory,
      progress: progress,
      condition: condition,
      managementReport: managementReport,
      dischargePlan: dischargePlan,
      dischargePrescription: dischargePrescription,
      followUpPlan: followUpPlan,
      progressDiagnosis: progressDiagnosis,
      type: "discharge",
      doctorEmail: doctorEmail,
      doctorName: doctorName,
      doctorPhone: doctorPhone,
      docId: doctorId,
      fromVideoCall: false,
      patient: patientId,
      patientName: pName,
      createdByName: doctorName,
      createdBy: doctorId,
      createdByEmail: doctorEmail,
      train: false,
      predictive: false,
      status: "active",
      statusCode: 0,
      hospitalId: hospitalId,
    };

    console.log(formData);

    const res = await request({
      method: "POST",
      url: "patientJournal",
      data: formData,
      auth: false,
    });

    console.log(res);

    if (res !== "error") {
      console.log(formData);
      // navigate(`/viewPatient/:id/nurseReports`);
      return;
    }
  }

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Discharge Report</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
            <div className="p-6 bg-white rounded-md shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="cal-icon">
                  <DateInput
                    label="Discharge Date"
                    directInput={true}
                    required={false}
                    stateInput={dischargeDate}
                    setStateInput={setDischargeDate}
                  />
                </div>
                <TimeInput
                  label="Discharge Time"
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
                label="History of Prevailing Condition"
                directInput={true}
                required={false}
                stateInput={progressHistory}
                setStateInput={setProgressHistory}
              />
              <TextArea
                label="Progress"
                directInput={true}
                required={false}
                stateInput={progress}
                setStateInput={setProgress}
              />
              <TextArea
                label="Report of Management"
                directInput={true}
                required={false}
                stateInput={managementReport}
                setStateInput={setManagementReport}
              />
              <TextArea
                label="Discharge Plan"
                directInput={true}
                required={false}
                stateInput={dischargePlan}
                setStateInput={setDischargePlan}
              />
              <TextArea
                label="Prescription on Discharge"
                directInput={true}
                required={false}
                stateInput={dischargePrescription}
                setStateInput={setDischargePrescription}
              />
              <TextArea
                className="w-10"
                label="Follow up plan"
                directInput={true}
                required={false}
                stateInput={followUpPlan}
                setStateInput={setFollowUpPlan}
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
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDischarge;
