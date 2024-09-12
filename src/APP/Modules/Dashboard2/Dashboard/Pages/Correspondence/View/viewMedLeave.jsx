import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import grayPanel from "../../../../../../Components/Container/Container";
import 'react-datepicker/dist/react-datepicker.css';

function ViewMedLeave({ text = "View Medical Leave" }) {
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
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `medicalLeaveCertificate/${id}`,
        body: {},
        auth: false,
      });

      if (res !== "error") {
        const result = res?.data;
        console.log(result)
        setFormData({
          ...formData,
          patientName: result?.["patient-name"] || "",
          patientAddress: result?.['patient-address'] || "",
          name: result?.name || "",
          diagnosis: result?.['diagnosis-icd10code-0'] + result?.['diagnosis-name-0'] || "",
          days: result?.['days-of-medical-attention'] || "",
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
            label="This is to certify that:"
            required={true}
            directInput={true}
            stateInput={formData.patientName}
            setStateInput={(value) => setFormData({ ...formData, patientName: value })}
            readOnly={true}
          />
          <TextInput
            label="of address :"
            required={true}
            directInput={true}
            stateInput={formData.patientAddress}
            setStateInput={(value) => setFormData({ ...formData, patientAddress: value })}
            readOnly={true}
          />

          <TextInput
            label="employed by :"
            name="name"
            directInput={true}
            stateInput={formData.employersName}
            setStateInput={(value) => setFormData({ ...formData, employersName: value })}
            readOnly={true}
          />
          <TextArea
            label="Diagnosis"
            name=""
            directInput={true}
            stateInput={formData.diagnosis}
            setStateInput={(value) => setFormData({ ...formData, diagnosis: value })}
            readOnly={true}
            required={true}
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
          <p>
            Because of the ongoing treatment, he/she will be away from duty for <input className="border-2 border-solid" readOnly value={formData.days} onChange={(value) => setFormData({ ...formData, days: value })}/>
            days.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
            label="Kind regards:"
            name="specialistName"
            directInput={true}
            stateInput={formData.attendingPhysician}
            setStateInput={(value) => setFormData({ ...formData, attendingPhysician: value })}
            readOnly={true}
          />
          <TextInput
            label="Physician email :"
            name=""
            directInput={true}
            stateInput={formData.attendingPhysicianEmail}
            setStateInput={(value) => setFormData({ ...formData, attendingPhysicianEmail: value })}
            readOnly={true}
          />
          <TextInput
            label="Phone Number :"
            name=""
            directInput={true}
            stateInput={formData.phoneNumber}
            setStateInput={(value) => setFormData({ ...formData, phoneNumber: value })}
            readOnly={true}
          />
          <TextInput
            label="Date"
            required={true}
            directInput={true}
            stateInput={formData.date}
            setStateInput={(value) => setFormData({ ...formData, date: value })}
            readOnly={true}
          />
          
        </div>
      </form>
    </div>
    </div>
  );
}

export default ViewMedLeave;
