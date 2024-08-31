import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import DropdownBtn from "../../../../../../Components/Buttons/Dropdown-btn";


// eslint-disable-next-line react/prop-types
function AddOperation({ text = "Add Journal" }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [anesthesia, setAnesthesia] = useState('');
  const [operation, setOperation] = useState('');
  const [indication, setIndication] = useState('');
  const [procedure, setProcedure] = useState('');
  const [findings, setFindings] = useState('');
  const [complications, setComplications] = useState('');
  const [managementPlan, setManagementPlan] = useState('');
  const [treatment, setTreatment] = useState('');
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

  function handleSubmit(statusCode) {
    const formData = {
        date: date,
        time: time,
        anesthesia: anesthesia,
        operation: operation,
        indication: indication,
        procedure: procedure,
        findings: findings,
        complications: complications,
        postPlan: managementPlan,
        treatment: treatment,
        progressDiagnosis: progressDiagnosis,
        doctorEmail: localStorage.getItem("primeDoctorUserEmail"),
        doctorName: localStorage.getItem("universalDoctorName"),
        doctorPhone: localStorage.getItem("universalDoctorPhone"),
        type: "nurseMidwivesOperation",
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
    async function post() {
      try {
        const res = await request({
          method: "POST",
          url: 'patientJournal',
          data: formData,
          auth: false,
        });
        // Check if the response is not an error
        if (res !== "error") {
            console.log(formData)
          navigate(`/viewPatient/${pId}`);
        }
        //console.log("success");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    post();
  }
  const dropdownItems = [
    { label: "Save Signed", onClick: () => handleSubmit(1)},
    { label: "Save Unsigned", onClick: () => handleSubmit(0) }
  ];

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit">
          <div className=" flex flex-row justify-between data-center">
            <h1 className={headers}>Add Operation Journal</h1>
            <DropdownBtn txt={text} dropdownItems={dropdownItems}/>
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <DateInput
        label="Date"
        directInput={true}
        required={false}
        stateInput={date}
        setStateInput={setDate}
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
        label="Anesthesia"
        directInput={true}
        required={false}
        stateInput={anesthesia}
        setStateInput={setAnesthesia}
      />
      <TextArea
        label="Operation"
        directInput={true}
        required={false}
        stateInput={operation}
        setStateInput={setOperation}
      />
      <TextArea
        label="Indication for the operation"
        directInput={true}
        required={false}
        stateInput={indication}
        setStateInput={setIndication}
      />
      <TextArea
        label="Operations Procedure"
        directInput={true}
        required={false}
        stateInput={procedure}
        setStateInput={setProcedure}
      />
        <TextArea
          label="Operation Findings"
          directInput={true}
          required={false}
          stateInput={findings}
          setStateInput={setFindings}
        />
        <TextArea
          label="Complications"
          directInput={true}
          required={false}
          stateInput={complications}
          setStateInput={setComplications}
        />
        <TextArea
          label="Post operation Management Plan"
          directInput={true}
          required={false}
          stateInput={managementPlan}
          setStateInput={setManagementPlan}
        />
        <TextArea
          label="Treatment"
          directInput={true}
          required={false}
          stateInput={treatment}
          setStateInput={setTreatment}
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
    </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOperation;
