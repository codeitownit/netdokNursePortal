import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import 'react-datepicker/dist/react-datepicker.css';
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";

function AddMedFitness({ text = "Add Medical Fitness" }) {
  const [formData, setFormData] = useState({
    patientName: "",
    suffering: "",
    condition: "",
    programme: "",
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

    const res = await request({
      method: "POST",
      url: "death-certificate",
      data: formData,
      auth: true,
    });

    if (res !== "error") {
      navigate(`/viewPatient/${formData.patientId}`);
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
    <div className="bg-white p-20 rounded-md">
      <form onSubmit={handleSubmit}>
      <div className=" flex flex-row justify-between items-center">
            <h1 className="text-xl font-bold mb-4">{text}</h1>
            <AddEdit text='Submit' type="submit" />
        </div>
        <TextInput
          label="This is to certify that I have examined"
          required={true}
          directInput={true}
          stateInput={formData.patientName}
          setStateInput={(value) => setFormData({ ...formData, patientName: value })}
        />

        <p>
          He/she is <input
            className="border-2 border-solid"
            name="suffering"
            value={formData.suffering}
            onChange={handleInputChange}
          />
          from following diseases
        </p>

        <textarea
          className="border-2 border-solid"
          name="causeOfDeath"
          value={formData.causeOfDeath}
          onChange={handleInputChange}
        ></textarea>

        <p>and have undertaken all vaccination.</p>

        <TextInput
          label="Any other major disease (Please specify)"
          name="employersName"
          directInput={true}
          stateInput={formData.employersName}
          setStateInput={(value) => setFormData({ ...formData, employersName: value })}
        />

        <p>
          I certify that <input
            className="border-2 border-solid"
            name="patientName"
            value={formData.patientName}
            onChange={handleInputChange}
          />
          is physically, mentally & psychologically <input
            className="border-2 border-solid"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
          />
          for <input
            className="border-2 border-solid"
            name="programme"
            value={formData.programme}
            onChange={handleInputChange}
          />
          Programme.
        </p>
      </form>
    </div>
  );
}

export default AddMedFitness;
