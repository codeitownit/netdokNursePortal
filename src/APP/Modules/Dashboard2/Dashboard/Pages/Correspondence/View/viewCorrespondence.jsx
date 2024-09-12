import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prop-types
function ViewCorrespondence({ text = "Add Correspondence" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [correspondence, setCorrespondence] = useState('');
  const [data, setData] = useState([]);
  
  const hospitalId = localStorage.getItem("universalHospitalId")
  const doctorEmail = localStorage.getItem("primeDoctorUserEmail")
  const doctorId = localStorage.getItem("primeDoctorUserId");
  const pName = localStorage.getItem("universalPatientName");
  const patientId = localStorage.getItem("universalPatientId");
  const doctorName = localStorage.getItem("universalDoctorName");
  const doctorPhone = localStorage.getItem("universalDoctorPhone");
  const navigate = useNavigate();
  const request = useaxios();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `correspondence/${id}`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        const result = res?.data;
        // console.log(result);
        setData(result || []);
        setAdmissionDate(result?.date || "")
        setTime(result?.time || "")
        setCorrespondence(result?.details || "")
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
            <h1 className={headers}>View Correspondence</h1>
            {/* <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" /> */}
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateInput 
        label="Date"
        directInput={true}
        required={true}
        stateInput={admissionDate}
        setStateInput={setAdmissionDate}
        readOnly={true}
        />
        <TimeInput
        label="Time"
        directInput={true}
        required={true}
        stateInput={time}
        setStateInput={setTime}
        readOnly={true}
         />
      </div>

      <TextArea
        label="Correspondence"
        directInput={true}
        required={false}
        stateInput={correspondence}
        setStateInput={setCorrespondence}
        readOnly={true}
      />
    </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewCorrespondence;
