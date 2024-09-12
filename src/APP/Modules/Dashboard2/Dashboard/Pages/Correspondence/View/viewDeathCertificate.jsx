import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';

function ViewDeathCertificate({ text = "View Death Certificate" }) {
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
    autopsy: "",    
    forensicAutopsyPlace: "",
    certClinic: "",
    deathRegDate: "",
    specialistName: ""
  });

  const request = useaxios();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `deathCertificate/${id}`,
        body: {},
        auth: false,
      });

      if (res !== "error") {
        const result = res?.data;
        console.log(result)
        setFormData({
          ...formData,
          currentDate: result?.["current-date"] || "",
          currentTime: result?.['current-time'] || "",
          name: result?.name || "",
          hospitalRegNo: result?.['hospital-reg-no'] || "",
          dob: result?.dob || "",
          gender: result?.gender || "",
          dateOfAdmission: result?.['date-of-admission'] || "",
          dateOfDeath: result?.['date-of-death'] || "",
          timeOfDeath:  result?.['time-of-death'] || "",
          ageAtDeath: result?.['age-at-time-of-death']|| "",
          maritalStatus: result?.['marital-status'] || "",
          locationOfDeath: result?.['location-of-death'] || "",
          abodePlace: result?.['place-of-abode'] || "",
          causeOfDeath: result?.['cause-of-death-icd10code-0'] + result?.['cause-of-death-name-0'] || "",
          contributingDiagnosis: result?.['contributing-diagnosis-icd10code-0'] + result?.['contributing-diagnosis-name-0']  || "",
          basisOfDiagnosis: "",
          forensicAutopsyPlace: result?.['forensic-autopsy-place'] || "",
          certClinic: result?.['cert-issuer-clinic-or-department'] || "",
          deathRegDate: result?.['forensic-autopsy-place'] || "",
          specialistName: result?.['specialist-name'] || ""
          // and other fields from the result...
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">{text}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Date"
            required={true}
            directInput={true}
            stateInput={formData.currentDate}
            setStateInput={(value) => setFormData({ ...formData, currentDate: value })}
            readOnly={true}
          />
          <TextInput
            label="Time"
            required={true}
            directInput={true}
            stateInput={formData.currentTime}
            setStateInput={(value) => setFormData({ ...formData, currentTime: value })}
            readOnly={true}
          />

          <TextInput
            label="Patient Name"
            name="name"
            directInput={true}
            stateInput={formData.name}
            setStateInput={(value) => setFormData({ ...formData, name: value })}
            readOnly={true}
          />
          <TextInput
            label="Hospital Reg No."
            name="hospitalRegNo"
            directInput={true}
            stateInput={formData.hospitalRegNo}
            setStateInput={(value) => setFormData({ ...formData, hospitalRegNo: value })}
            readOnly={true}
            required={true}
          />
          <TextInput
            label="Date of Birth"
            required={true}
            directInput={true}
            stateInput={formData.dob}
            setStateInput={(value) => setFormData({ ...formData, dob: value })}
            readOnly={true}
          />
          <TextInput
            label="Gender"
            name="gender"
            directInput={true}
            options={["Select", "Male", "Female"]}
            stateInput={formData.gender}
            setStateInput={setFormData}
            readOnly={true}
          />
          <TextInput
            label="Date of Admission"
            required={true}
            directInput={true}
            stateInput={formData.dateOfAdmission}
            setStateInput={(value) => setFormData({ ...formData, dateOfAdmission: value })}
            readOnly={true}
          />
          <TextInput
            label="Date of Death"
            required={true}
            directInput={true}
            stateInput={formData.dateOfDeath}
            setStateInput={(value) => setFormData({ ...formData, dateOfDeath: value })}
            readOnly={true}
          />
          <TextInput
            label="Time of Death"
            required={true}
            directInput={true}
            stateInput={formData.timeOfDeath}
            setStateInput={(value) => setFormData({ ...formData, timeOfDeath: value })}
            readOnly={true}
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
            readOnly={true}
          />
          <TextInput
            label="Location of Death"
            name="locationOfDeath"
            directInput={true}
            stateInput={formData.locationOfDeath}
            setStateInput={(value) => setFormData({ ...formData, locationOfDeath: value })}
            readOnly={true}
          />
          <TextInput
            label="Place of Abode (Town, Village, Zone)"
            name="abodePlace"
            directInput={true}
            stateInput={formData.abodePlace}
            setStateInput={(value) => setFormData({ ...formData, abodePlace: value })}
            readOnly={true}
          />
          <TextArea
            label="Cause of Death"
            name="causeofdeath"
            directInput={true}
            stateInput={formData.causeOfDeath}
            setStateInput={(value) => setFormData({ ...formData, causeOfDeath: value })}
            readOnly={true}
          />
          <TextArea
            label="Contributing Diagnosis"
            name="ContributingDiagnosis"
            directInput={true}
            stateInput={formData.contributingDiagnosis}
            setStateInput={(value) => setFormData({ ...formData, contributingDiagnosis: value })}
            readOnly={true}
          />
          <TextArea
            label="Basis for Diagnosis"
            name="BasisforDiagnosis"
            directInput={true}
            stateInput={formData.contributingDiagnosis}
            setStateInput={(value) => setFormData({ ...formData, contributingDiagnosis: value })}
            readOnly={true}
          />

          {/* Checkboxes for diagnosis */}
          {/* <div className="col-span-2 grid grid-cols-2 gap-2">
            <label>
              <input type="checkbox" name="clinicalExamination" checked={formData.clinicalExamination} onChange={handleCheckboxChange} />
              Clinical Examination Before Death
            </label>
            <label>
              <input type="checkbox" name="cytology" checked={formData.cytology} onChange={handleCheckboxChange} />
              Cytology
            </label>
            <label>
              <input type="checkbox" name="imagingProcedure" checked={formData.imagingProcedure} onChange={handleCheckboxChange} />
              Imaging Procedure Before Death
            </label>
            <label>
              <input type="checkbox" name="operationWithoutHistopathology" checked={formData.operationWithoutHistopathology} onChange={handleCheckboxChange} />
              Operation Without Histopathology
            </label>
            <label>
              <input type="checkbox" name="biopsyOrHistopathology" checked={formData.biopsyOrHistopathology} onChange={handleCheckboxChange} />
              Biopsy or Operation with Histopathology
            </label>
            <label>
              <input type="checkbox" name="postmortemWithoutHistopathology" checked={formData.postmortemWithoutHistopathology} onChange={handleCheckboxChange} />
              Postmortem Without Histopathology
            </label>
            <label>
              <input type="checkbox" name="postmortemWithHistopathology" checked={formData.postmortemWithHistopathology} onChange={handleCheckboxChange} />
              Postmortem With Histopathology
            </label>
            <label>
              <input type="checkbox" name="otherMethods" checked={formData.otherMethods} onChange={handleCheckboxChange} />
              Other Methods
            </label>
          </div> */}

          {/* Forensic Autopsy, Cert Clinic, Death Reg Date, Specialist Name */}
          <TextInput
            label="Forensic Autopsy Place"
            name="forensicAutopsyPlace"
            directInput={true}
            stateInput={formData.forensicAutopsyPlace}
            setStateInput={(value) => setFormData({ ...formData, forensicAutopsyPlace: value })}
            readOnly={true}
          />
          <TextInput
            label="Cert Clinic or Department"
            name="certClinic"
            directInput={true}
            stateInput={formData.certClinic}
            setStateInput={(value) => setFormData({ ...formData, certClinic: value })}
            readOnly={true}
          />
          <TextInput
            label="Death Registration Date"
            required={true}
            directInput={true}
            stateInput={formData.deathRegDate}
            setStateInput={(value) => setFormData({ ...formData, deathRegDate: value })}
            readOnly={true}
          />
          <TextInput
            label="Name of Specialist"
            name="specialistName"
            directInput={true}
            stateInput={formData.specialistName}
            setStateInput={(value) => setFormData({ ...formData, specialistName: value })}
            readOnly={true}
          />
        </div>
      </form>
    </div>
  );
}

export default ViewDeathCertificate;
