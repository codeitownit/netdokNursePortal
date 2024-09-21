import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";

function AddDeathCertificate({ text = "Add Death Certificate" }) {
  const [formData, setFormData] = useState({
    currentDate: "",
    currentTime: "",
    name: "",
    hospitalRegNo: "",
    dob: "",
    gender: "",
    dateOfAdmission: "",
    dateOfDeath: "",
    timeOfDeath: "",
    ageAtDeath: "",
    maritalStatus: "",
    locationOfDeath: "",
    abodePlace: "",
    causeOfDeath: "",
    basisOfDiagnosis: "",
    forensicAutopsyPlace: "",
    certClinic: "",
    deathRegDate: "",
    specialistName: ""
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
    <div className="bg-white p-6 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-row justify-between items-center">
            <h1 className="text-xl font-bold mb-4">{text}</h1>
            <AddEdit text='Submit' type="submit" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Date"
            required={true}
            directInput={true}
            stateInput={formData.currentDate}
            setStateInput={(value) => setFormData({ ...formData, currentDate: value })}
          />
          <TextInput
            label="Time"
            required={true}
            directInput={true}
            stateInput={formData.currentTime}
            setStateInput={(value) => setFormData({ ...formData, currentTime: value })}
          />

          <TextInput
            label="Patient Name"
            name="name"
            directInput={true}
            stateInput={formData.name}
            setStateInput={(value) => setFormData({ ...formData, name: value })}
          />
          <TextInput
            label="Hospital Reg No."
            name="hospitalRegNo"
            directInput={true}
            stateInput={formData.hospitalRegNo}
            setStateInput={(value) => setFormData({ ...formData, hospitalRegNo: value })}
            required={true}
          />
          <TextInput
            label="Date of Birth"
            required={true}
            directInput={true}
            stateInput={formData.dob}
            setStateInput={(value) => setFormData({ ...formData, dob: value })}
          />
          <TextInput
            label="Gender"
            name="gender"
            directInput={true}
            options={["Select", "Male", "Female"]}
            stateInput={formData.gender}
            setStateInput={(value) => setFormData({ ...formData, gender: value })}
          />
          <TextInput
            label="Date of Admission"
            required={true}
            directInput={true}
            stateInput={formData.dateOfAdmission}
            setStateInput={(value) => setFormData({ ...formData, dateOfAdmission: value })}
          />
          <TextInput
            label="Date of Death"
            required={true}
            directInput={true}
            stateInput={formData.dateOfDeath}
            setStateInput={(value) => setFormData({ ...formData, dateOfDeath: value })}
          />
          <TextInput
            label="Time of Death"
            required={true}
            directInput={true}
            stateInput={formData.timeOfDeath}
            setStateInput={(value) => setFormData({ ...formData, timeOfDeath: value })}
          />
          <TextInput
            label="Age at Time of Death (years-months-days)"
            name="ageAtDeath"
            directInput={true}
            stateInput={formData.ageAtDeath}
            setStateInput={(value) => setFormData({ ...formData, ageAtDeath: value })}
          />
          <TextInput
            label="Marital Status"
            name="maritalStatus"
            directInput={true}
            stateInput={formData.maritalStatus}
            setStateInput={(value) => setFormData({ ...formData, maritalStatus: value })}
          />
          <TextInput
            label="Location of Death"
            name="locationOfDeath"
            directInput={true}
            stateInput={formData.locationOfDeath}
            setStateInput={(value) => setFormData({ ...formData, locationOfDeath: value })}
          />
          <TextInput
            label="Place of Abode (Town, Village, Zone)"
            name="abodePlace"
            directInput={true}
            stateInput={formData.abodePlace}
            setStateInput={(value) => setFormData({ ...formData, abodePlace: value })}
          />
          <TextArea
            label="Cause of Death"
            name="causeofdeath"
            directInput={true}
            stateInput={formData.causeOfDeath}
            setStateInput={(value) => setFormData({ ...formData, causeOfDeath: value })}
          />
          <TextArea
            label="Contributing Diagnosis"
            name="ContributingDiagnosis"
            directInput={true}
            stateInput={formData.contributingDiagnosis}
            setStateInput={(value) => setFormData({ ...formData, contributingDiagnosis: value })}
          />
          <TextArea
            label="Basis for Diagnosis"
            name="BasisforDiagnosis"
            directInput={true}
            stateInput={formData.contributingDiagnosis}
            setStateInput={(value) => setFormData({ ...formData, contributingDiagnosis: value })}
          />

          <TextInput
            label="Forensic Autopsy Place"
            name="forensicAutopsyPlace"
            directInput={true}
            stateInput={formData.forensicAutopsyPlace}
            setStateInput={(value) => setFormData({ ...formData, forensicAutopsyPlace: value })}
          />
          <TextInput
            label="Cert Clinic or Department"
            name="certClinic"
            directInput={true}
            stateInput={formData.certClinic}
            setStateInput={(value) => setFormData({ ...formData, certClinic: value })}
          />
          <TextInput
            label="Death Registration Date"
            required={true}
            directInput={true}
            stateInput={formData.deathRegDate}
            setStateInput={(value) => setFormData({ ...formData, deathRegDate: value })}
          />
          <TextInput
            label="Name of Specialist"
            name="specialistName"
            directInput={true}
            stateInput={formData.specialistName}
            setStateInput={(value) => setFormData({ ...formData, specialistName: value })}
          />
        </div>
      </form>
    </div>
  );
}

export default AddDeathCertificate;
