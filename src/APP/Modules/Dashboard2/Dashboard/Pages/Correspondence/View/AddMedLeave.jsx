import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import grayPanel from "../../../../../../Components/Container/Container";
import 'react-datepicker/dist/react-datepicker.css';
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";

function AddMedLeave({ text = "Add Medical Leave" }) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAddress: "",
    name: "",
    diagnosis: "",
    days: "",
    causeOfDeath: "",
    basisOfDiagnosis: "",
    employersName: "",
    phoneNumber: "",
    attendingPhysician: "",
    attendingPhysicianEmail: "",
    date: ""
  });

  const request = useaxios();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await request({
        method: "POST",
        url: "medicalLeaveCertificate",
        data: formData,
        auth: true,
      });

      if (res !== "error") {
        navigate(`/viewPatient/${formData.patientId}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={grayPanel()}>
      <div className="bg-white p-20 rounded-md">
        <form onSubmit={handleSubmit}>
        <div className=" flex flex-row justify-between items-center">
            <h1 className="text-xl font-bold mb-4">{text}</h1>
            <AddEdit text='Submit' type="submit" />
        </div>
          <TextInput
            label="This is to certify that:"
            required={true}
            name="patientName"
            directInput={true}
            stateInput={formData.patientName}
            setStateInput={(value) => setFormData({ ...formData, patientName: value })}
          />
          <TextInput
            label="of address :"
            required={true}
            name="patientAddress"
            directInput={true}
            stateInput={formData.patientAddress}
            setStateInput={(value) => setFormData({ ...formData, patientAddress: value })}
          />

          <TextInput
            label="employed by :"
            name="employersName"
            directInput={true}
            stateInput={formData.employersName}
            setStateInput={(value) => setFormData({ ...formData, employersName: value })}
          />
          <TextArea
            label="Diagnosis"
            name="diagnosis"
            directInput={true}
            stateInput={formData.diagnosis}
            setStateInput={(value) => setFormData({ ...formData, diagnosis: value })}
            required={true}
          />
          <TextArea
            label="Cause of Death"
            name="causeOfDeath"
            directInput={true}
            stateInput={formData.causeOfDeath}
            setStateInput={(value) => setFormData({ ...formData, causeOfDeath: value })}
          />
          <TextArea
            label="Contributing Diagnosis"
            name="contributingDiagnosis"
            directInput={true}
            stateInput={formData.contributingDiagnosis}
            setStateInput={(value) => setFormData({ ...formData, contributingDiagnosis: value })}
          />
          <p>
            Because of the ongoing treatment, he/she will be away from duty for 
            <input className="border-2 border-solid" value={formData.days} name="days" onChange={handleInputChange} /> days.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Kind regards:"
              name="attendingPhysician"
              directInput={true}
              stateInput={formData.attendingPhysician}
              setStateInput={(value) => setFormData({ ...formData, attendingPhysician: value })}
            />
            <TextInput
              label="Physician email :"
              name="attendingPhysicianEmail"
              directInput={true}
              stateInput={formData.attendingPhysicianEmail}
              setStateInput={(value) => setFormData({ ...formData, attendingPhysicianEmail: value })}
            />
            <TextInput
              label="Phone Number :"
              name="phoneNumber"
              directInput={true}
              stateInput={formData.phoneNumber}
              setStateInput={(value) => setFormData({ ...formData, phoneNumber: value })}
            />
            <TextInput
              label="Date"
              required={true}
              name="date"
              directInput={true}
              stateInput={formData.date}
              setStateInput={(value) => setFormData({ ...formData, date: value })}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMedLeave;
