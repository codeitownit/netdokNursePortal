import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';
import grayPanel from "../../../../../../Components/Container/Container";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";

function AddLiveBirth({ text = "Add Live Birth" }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    time: "",
    dob: "",
    thisbirth: "",
    childorder: "",
    gestationalage: "",
    birthweight: "",
    birthlength: "",
    placeofbirth: "",
    hospital: "",
    mothername: "",
    mothernationality: "",
    motherage: "",
    race: "",
    motheroccupation: "",
    motherresidence: "",    
    mothervalid: "",
    motheridno: "",
    fathername: "",
    fathernationality: "",
    fatherage: "",
    fatheroccupation: "",
    fatherresidence: "",    
    fathervalid: "",
    fatheridno: ""
  });

  const request = useaxios();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await request({
      method: "POST",
      url: "birth-registration",
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
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
          <h3 className="text-xl font-bold mt-6 mb-4">Neonate</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Neonate Name :"
              required={true}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextInput
              label="Gender"
              required={true}
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
            <TimeInput
              label="Time of Birth"
              name="time"
              value={formData.time}
              onChange={(value) => setFormData({ ...formData, time: value })}
            />
            <DateInput
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={(value) => setFormData({ ...formData, dob: value })}
              required={true}
            />
            <TextInput
              label="This Birth :"
              required={true}
              name="thisbirth"
              value={formData.thisbirth}
              onChange={handleInputChange}
            />
            <TextInput
              label="If Twins or Triplet, was child :"
              name="childorder"
              value={formData.childorder}
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            label="Gestational Age (in weeks) :"
            required={true}
            name="gestationalage"
            value={formData.gestationalage}
            onChange={handleInputChange}
          />
          <TextInput
            label="Birth Weight :"
            required={true}
            name="birthweight"
            value={formData.birthweight}
            onChange={handleInputChange}
          />
          <TextInput
            label="Birth Length (in cm) :"
            required={true}
            name="birthlength"
            value={formData.birthlength}
            onChange={handleInputChange}
          />
          <TextInput
            label="Place of Birth :"
            name="placeofbirth"
            value={formData.placeofbirth}
            onChange={handleInputChange}
          />
          <TextInput
            label="Hospital of Birth :"
            name="hospital"
            value={formData.hospital}
            onChange={handleInputChange}
          />

          <h3 className="text-xl font-bold mt-6 mb-4">Mother</h3>
          <TextInput
            label="Name of Mother :"
            required={true}
            name="mothername"
            value={formData.mothername}
            onChange={handleInputChange}
          />
          <TextInput
            label="Nationality :"
            required={true}
            name="mothernationality"
            value={formData.mothernationality}
            onChange={handleInputChange}
          />
          <TextInput
            label="Age"
            name="motherage"
            value={formData.motherage}
            onChange={handleInputChange}
          />
          <TextInput
            label="Race / Ethnic Group :"
            name="race"
            value={formData.race}
            onChange={handleInputChange}
            required={true}
          />
          <TextInput
            label="Usual residence of Mother :"
            required={true}
            name="motherresidence"
            value={formData.motherresidence}
            onChange={handleInputChange}
          />
          <TextInput
            label="Occupation :"
            name="motheroccupation"
            value={formData.motheroccupation}
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Valid ID :"
              required={true}
              name="mothervalid"
              value={formData.mothervalid}
              onChange={handleInputChange}
            />
            <TextInput
              label="ID Number :"
              required={true}
              name="motheridno"
              value={formData.motheridno}
              onChange={handleInputChange}
            />
          </div>

          <h3 className="text-xl font-bold mt-6 mb-4">Father</h3>
          <TextInput
            label="Name of Father :"
            required={true}
            name="fathername"
            value={formData.fathername}
            onChange={handleInputChange}
          />
          <TextInput
            label="Nationality :"
            required={true}
            name="fathernationality"
            value={formData.fathernationality}
            onChange={handleInputChange}
          />
          <TextInput
            label="Age"
            name="fatherage"
            value={formData.fatherage}
            onChange={handleInputChange}
          />
          <TextInput
            label="Race / Ethnic Group :"
            name="race"
            value={formData.race}
            onChange={handleInputChange}
            required={true}
          />
          <TextInput
            label="Usual residence of Father :"
            required={true}
            name="fatherresidence"
            value={formData.fatherresidence}
            onChange={handleInputChange}
          />
          <TextInput
            label="Occupation :"
            name="fatheroccupation"
            value={formData.fatheroccupation}
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Valid ID :"
              required={true}
              name="fathervalid"
              value={formData.fathervalid}
              onChange={handleInputChange}
            />
            <TextInput
              label="ID Number :"
              required={true}
              name="fatheridno"
              value={formData.fatheridno}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLiveBirth;
