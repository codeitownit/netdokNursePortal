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
function ViewPhysioProgressJournal({ text = "Edit Journal" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [condition, setCondition] = useState('');
  const [presentCondition, setPresentCondition] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [clinicalExamination, setClinicalExamination] = useState('');
  const [procedure, setProcedure] = useState('');
  const [carePlan, setCarePlan] = useState('');
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
        setCondition(res?.data.conditionAtAdmission);
        setPresentCondition(res?.data.presentCondition);
        setDiagnosis(res?.data.progressDiagnosis);
        setClinicalExamination(res?.data.clinicalExamination);
        setProcedure(res?.data.procedure)
        setCarePlan(res?.data.carePlan);
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
      <TextArea
        label="Condition at Admission"
        directInput={true}
        required={false}
        stateInput={condition}
        setStateInput={setCondition}
        disabled={true}
      />
      <TextArea
        label="Present Condition"
        directInput={true}
        required={false}
        stateInput={presentCondition}
        setStateInput={setPresentCondition}
        disabled={true}
      />
      <TextArea
        label="Clinical Examination"
        directInput={true}
        required={false}
        stateInput={clinicalExamination}
        setStateInput={setClinicalExamination}
        disabled={true}
      />
      <TextArea
        label="Procedure"
        directInput={true}
        required={false}
        stateInput={procedure}
        setStateInput={setProcedure}
        disabled={true}
      />
        <TextArea
          label="Care Plan"
          directInput={true}
          required={false}
          stateInput={carePlan}
          setStateInput={setCarePlan}
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

export default ViewPhysioProgressJournal;
