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
function ViewNurseOperation({ text = "Edit Journal" }) {
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
  const [diagnosis, setDiagnosis] = useState('');
  
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
        setDate(res?.data.date);
        setTime(res?.data.time);
        setAnesthesia(res?.data.anesthesia);
        setOperation(res?.data.operation);
        setIndication(res?.data.indication);
        setProcedure(res?.data.procedure);
        setFindings(res?.data.findings);
        setComplications(res?.data.complications);
        setManagementPlan(res?.data.postPlan);
        setTreatment(res?.data.treatment);
        setDiagnosis(res?.data.progressDiagnosis);
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



  function handleEdit(e) {
    e.preventDefault();
    const formData = {
        anesthesia: anesthesia,
        operation: operation,
        indication: indication,
        procedure: procedure,
        findings: findings,
        complications: complications,
        postPlan: managementPlan,
        treatment: treatment,
        progressDiagnosis: diagnosis,
      };
    async function patch() {
      try {
        const res = await request({
          method: "PUT",
          url: `patientJournal/${id}`,
          data: formData,
          auth: false,
        });
        // Check if the response is not an error
        if (res !== "error") {
          navigate(`/viewPatient/${pId}/progressJournals`);
        }
        //console.log("success");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    patch();
  }

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className="" type="submit" onSubmit={handleEdit}>
          <div className="flex flex-row justify-between data-center">
            <h1 className={headers}>View Journal</h1>
            {/* <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" /> */}
          </div>
          <div className="">
          <div className="p-6 bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInput
        label="Date"
        directInput={true}
        required={false}
        stateInput={date}
        setStateInput={setDate}
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
      <TextArea
        label="Anesthesia"
        directInput={true}
        required={false}
        stateInput={anesthesia}
        setStateInput={setAnesthesia}
        disabled={true}
      />
      <TextArea
        label="Operation"
        directInput={true}
        required={false}
        stateInput={operation}
        setStateInput={setOperation}
        disabled={true}
      />
      <TextArea
        label="Indication for the operation"
        directInput={true}
        required={false}
        stateInput={indication}
        setStateInput={setIndication}
        disabled={true}
      />
      <TextArea
        label="Operations Procedure"
        directInput={true}
        required={false}
        stateInput={procedure}
        setStateInput={setProcedure}
        disabled={true}
      />
        <TextArea
          label="Operation Findings"
          directInput={true}
          required={false}
          stateInput={findings}
          setStateInput={setFindings}
          disabled={true}
        />
        <TextArea
          label="Complications"
          directInput={true}
          required={false}
          stateInput={complications}
          setStateInput={setComplications}
          disabled={true}
        />
        <TextArea
          label="Post operation Management Plan"
          directInput={true}
          required={false}
          stateInput={managementPlan}
          setStateInput={setManagementPlan}
          disabled={true}
        />
        <TextArea
          label="Treatment"
          directInput={true}
          required={false}
          stateInput={treatment}
          setStateInput={setTreatment}
          disabled={true}
        />
        <TextArea
          label="Diagnoses & Procedures Codes"
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

export default ViewNurseOperation;
