import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
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
function AddCorrespondence({ text = "Add Correspondence" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [correspondence, setCorrespondence] = useState('');
  

  const navigate = useNavigate();
  const request = useaxios();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      date: admissionDate,
      time: time.toLowerCase(),
    //   document: documentId,
      details: correspondence,
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
      url: "correspondence",
      data: formData,
      auth: true,
    });

    console.log(res);

    if (res !== "error") {
      console.log(formData)
      navigate(`/viewPatient/${patientId}`);
      return;
    }
  }
  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Add Correspondence</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateInput 
        label="Date"
        directInput={true}
        required={true}
        stateInput={admissionDate}
        setStateInput={setAdmissionDate}

        />
        <TimeInput
        label="Time"
        directInput={true}
        required={true}
        stateInput={time}
        setStateInput={setTime}
         />
      </div>

      <TextArea
        label="Correspondence"
        directInput={true}
        required={false}
        stateInput={correspondence}
        setStateInput={setCorrespondence}
      />
      
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCorrespondence;
