import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';
import TextInput from "../../../../../../Components/Inputs/TextInput";


// eslint-disable-next-line react/prop-types
function ViewDischarge({ text = "Edit Journal" }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [admDate, setAdmDate] = useState('');
  const [contact, setContact] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [condition, setCondition] = useState('');
  const [history, setHistory] = useState('');
  const [progress, setProgress] = useState('');
  const [managementPlan, setManagementPlan] = useState('');
  const [dischargePlan, setDischargePlan] = useState('');
  const [prescription, setPrescription] = useState('');
  const [followUpPlan, setFollowUpPlan] = useState('');

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
        setDate(res?.data.dischargeDate);
        setTime(res?.data.time);
        setAdmDate(res?.data.admissionDate)
        setContact(res?.data.contact);
        setCondition(res?.data.condition);
        setSpecialist(res?.data.responsibleSpecialist);
        setHistory(res?.data.progressHistory);
        setProgress(res?.data.progress);
        setManagementPlan(res?.data.managementReport);
        setDischargePlan(res?.data.dischargePlan);
        setPrescription(res?.data.dischargePrescription);
        setFollowUpPlan(res?.data.followUpPlan);
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



//   function handleEdit(e) {
//     e.preventDefault();
//     const formData = {
//         condition: condition,
//         progressHistory: history,
//         clinicalSummary: clinicalSummary,
//         managementPlan: managementPlan,
//         progressDiagnosis: diagnosis,
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
        <form className={outerDiv} type="submit">
          <div className=" flex flex-row justify-between data-center">
            <h1 className={headers}>View Journal</h1>
            {/* <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" /> */}
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInput
        label="Discharge Date"
        directInput={true}
        required={false}
        stateInput={date}
        setStateInput={setDate}
        disabled={true}
      />
    </div>
        <TextInput
          label="Discharge Time"
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
      <TextInput
        label="Admission Date"
        directInput={true}
        required={false}
        stateInput={admDate}
        setStateInput={setAdmDate}
        disabled={true}
      />
      <TextInput
        label="Responsible Specialist"
        directInput={true}
        required={false}
        stateInput={specialist}
        setStateInput={setSpecialist}
        disabled={true}
      />
      <TextArea
        label="Condition at Admission"
        directInput={true}
        required={false}
        stateInput={condition}
        setStateInput={setCondition}
        disabled={true}
      />
      <TextArea
        label="History of Prevailing Condition"
        directInput={true}
        required={false}
        stateInput={history}
        setStateInput={setHistory}
        disabled={true}
      />
      <TextArea
        label="Progress"
        directInput={true}
        required={false}
        stateInput={progress}
        setStateInput={setProgress}
        disabled={true}
      />
      <TextArea
        label="Report of Management"
        directInput={true}
        required={false}
        stateInput={managementPlan}
        setStateInput={setManagementPlan}
        disabled={true}
      />
      <TextArea
        label="Discharge Plan"
        directInput={true}
        required={false}
        stateInput={dischargePlan}
        setStateInput={setDischargePlan}
        disabled={true}
      />
      <TextArea
        label="Prescription on Discharge"
        directInput={true}
        required={false}
        stateInput={prescription}
        setStateInput={setPrescription}
        disabled={true}
      />
      <TextArea
        label="Follow up plan"
        directInput={true}
        required={false}
        stateInput={followUpPlan}
        setStateInput={setFollowUpPlan}
        disabled={true}
      />
        
        <TextArea
          label="Working Diagnosis"
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

export default ViewDischarge;
