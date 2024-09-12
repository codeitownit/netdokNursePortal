import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import grayPanel from "../../../../../../Components/Container/Container";
import 'react-datepicker/dist/react-datepicker.css';

function ViewMedFitness({ text = "View Medical Fitness" }) {
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
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `medicalFitnessCertificate/${id}`,
        body: {},
        auth: false,
      });

      if (res !== "error") {
        const result = res?.data;
        console.log(result)
        setFormData({
          ...formData,
          patientName: result?.["patient-name"] || "",
          suffering: result?.suffering || "",
          otherdisease: result?.['other-major-disease'] || "",
          condition: result?.condition|| "",
          programme: result?.programme || "",
          contributingDiagnosis: result?.['contributing-diagnosis-icd10code-0'] + result?.['contributing-diagnosis-name-0']  || "",
          employersName: result?.['employers-name'] || "",
          phoneNumber: result?.['attending-physician-phone-number'] || "",
          attendingPhysician: result?.['attending-physician'] || "",
          attendingPhysicianEmail: result?.['attending-physician-email'] || "",
          date: result?.['filled-on-date'] || ""
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
    <div className={grayPanel()}>
    <div className="bg-white p-20 rounded-md">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">{text}</h1>

          <TextInput
            label="This is to certify that I have examined"
            required={true}
            directInput={true}
            stateInput={formData.patientName}
            setStateInput={(value) => setFormData({ ...formData, patientName: value })}
            readOnly={true}
          />
          <p>
          He/she is <input className="border-2 border-solid" readOnly value={formData.suffering} onChange={(value) => setFormData({ ...formData, suffering: value })}/>
          from following diseases</p>
          <textarea className="border-2 border-solid" readOnly value={formData.days} onChange={(value) => setFormData({ ...formData, days: value })}></textarea>
          <p>
          and have undertaken all vaccination.
            </p>

          <TextInput
            label="Any other major disease (Please specify) -"
            name="name"
            directInput={true}
            stateInput={formData.employersName}
            setStateInput={(value) => setFormData({ ...formData, employersName: value })}
            readOnly={true}
          />
          <p>
          I certify that  <input className="border-2 border-solid" readOnly value={formData.patientName} onChange={(value) => setFormData({ ...formData, patientName: value })}/>
          is physically, mentally & &  Psychologically <input className="border-2 border-solid" readOnly value={formData.condition} onChange={(value) => setFormData({ ...formData, condition: value })}/>
          for <input className="border-2 border-solid" readOnly value={formData.programme} onChange={(value) => setFormData({ ...formData, programme: value })}/> Programme.
            </p>   
      </form>
    </div>
    </div>
  );
}

export default ViewMedFitness;
