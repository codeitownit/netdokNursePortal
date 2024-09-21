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
function ViewMedicineJournal({ text = "Edit Journal" }) {
  const [dose, setDose] = useState('');
  const [duration, setDuration] = useState('');
  const [form, setForm] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  
  const { id } = useParams();
  const pId = localStorage.getItem("universalPatientId")

  const navigate = useNavigate();
  const request = useaxios();

  const fetchData = async () => {
    
    try {
      const res = await request({
        method: "GET",
        url: `prescriptions/prescriptionsWhere/userUid/${pId}/${id}`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data.date);
        // setData(res?.data || []);
        setDose(res?.data.medDose);
        setDuration(res?.data.medDuration);
        setForm(res?.data.medForm);
        setName(res?.data.medName);
        setQty(res?.data.medQty);
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
            <h1 className={headers}>View Medicine Journal</h1>
            {/* <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" /> */}
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInput
        label="Medicine Dose"
        directInput={true}
        required={false}
        stateInput={dose}
        setStateInput={setDose}
        disabled={true}
      />
    </div>
        <TextInput
          label="Medicine Duration"
          directInput={true}
          required={false}
          stateInput={duration}
          setStateInput={setDuration}
          disabled={true}
        />
        <TextInput
          label="Medicine Form"
          directInput={true}
          required={false}
          stateInput={form}
          setStateInput={setForm}
          disabled={true}
        />
      </div>
      <TextInput
        label="Medicine Name"
        directInput={true}
        required={false}
        stateInput={name}
        setStateInput={setName}
        disabled={true}
      />
      <TextInput
        label="Medicine Qty"
        directInput={true}
        required={false}
        stateInput={qty}
        setStateInput={setQty}
        disabled={true}
      />
    </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewMedicineJournal;
