import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import DateInput from "../../../../../../Components/Inputs/DateInput";
import TimeInput from "../../../../../../Components/Inputs/TimeInput";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';
import grayPanel from "../../../../../../Components/Container/Container";

function ViewLiveBirth({ text = "View Live Birth" }) {
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
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `medicalCertificateLifeBirth/${id}`,
        body: {},
        auth: false,
      });

      if (res !== "error") {
        const result = res?.data;
        console.log(result)
        setFormData({
          ...formData,
          name: result?.["neonate-name"] || "",
          gender: result?.gender || "",
          time: result?.['time-of-birth'] || "",
          dob: result?.dob || "",
          thisbirth: result?.['this-birth'] || "",
          childorder: result?.['child-order'] || "",
          gestationalage:  result?.['gestational-age'] || "",
          birthweight: result?.['birth-weight']|| "",
          birthlength: result?.['birth-length'] || "",
          placeofbirth: result?.['place-of-birth'] || "",
          hospital: result?.['hospital-of-birth'] || "",
          mothername: result?.['mother-name']|| "",
          mothernationality: result?.['mother-nationality']  || "",
          race: result?.['race-or-ethnic-grp'] || "",
          motheroccupation: result?.['mother-occupation'] || "",
          motherresidence: result?.['usual-mother-residence'] || "",
          motherage: result?.['mother-age'] || "",
          motheridno: result?.['mother-id-number'] || "",
          mothervalid: result?.['mother-valid-id'] || "",
          fathername: result?.['father-name']|| "",
          fathernationality: result?.['father-nationality']  || "",
          fatheroccupation: result?.['father-occupation'] || "",
          fatherresidence: result?.['usual-father-residence'] || "",
          fatherage: result?.['father-age'] || "",
          fatheridno: result?.['father-id-number'] || "",
          fathervalid: result?.['father-valid-id'] || "",

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

        <h3 className="text-xl font-bold mt-6 mb-4">Neonate</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Neonate Name :"
            required={true}
            directInput={true}
            stateInput={formData.name}
            setStateInput={(value) => setFormData({ ...formData, name: value })}
            readOnly={true}
          />
          <TextInput
            label="Gender"
            required={true}
            directInput={true}
            stateInput={formData.gender}
            setStateInput={(value) => setFormData({ ...formData, gender: value })}
            readOnly={true}
          />

          <TextInput
            label="Time of Birth"
            name="name"
            directInput={true}
            stateInput={formData.time}
            setStateInput={(value) => setFormData({ ...formData, time: value })}
            readOnly={true}
          />
          <TextInput
            label="Date of Birth"
            name="hospitalRegNo"
            directInput={true}
            stateInput={formData.dob}
            setStateInput={(value) => setFormData({ ...formData, dob: value })}
            readOnly={true}
            required={true}
          />
          <TextInput
            label="This Birth :"
            required={true}
            directInput={true}
            stateInput={formData.thisbirth}
            setStateInput={(value) => setFormData({ ...formData, thisbirth: value })}
            readOnly={true}
          />
          <TextInput
            label="If Twins or Triplet was child :"
            name="order"
            directInput={true}
            stateInput={formData.childorder}
            setStateInput={(value) => setFormData({ ...formData, childorder: value })}
            readOnly={true}
          />
          </div>
          <TextInput
            label="Gestational Age ((in weeks)) :"
            required={true}
            directInput={true}
            stateInput={formData.gestationalage}
            setStateInput={(value) => setFormData({ ...formData, gestationalage: value })}
            readOnly={true}
          />
          <TextInput
            label="Birth Weight "
            required={true}
            directInput={true}
            stateInput={formData.birthweight}
            setStateInput={(value) => setFormData({ ...formData, birthweight: value })}
            readOnly={true}
          />
          <TextInput
            label="Birth Length(in centiMeters) :"
            required={true}
            directInput={true}
            stateInput={formData.birthlength}
            setStateInput={(value) => setFormData({ ...formData, birthlength: value })}
            readOnly={true}
          />
          <TextInput
            label="Place of Birth "
            directInput={true}
            stateInput={formData.placeofbirth}
            setStateInput={(value) => setFormData({ ...formData, placeofbirth: value })}
          />
          <TextInput
            label="Hospital of Birth :"
            directInput={true}
            stateInput={formData.hospital}
            setStateInput={(value) => setFormData({ ...formData, hospital: value })}
            readOnly={true}
          />
          <h3 className="text-xl font-bold mt-6 mb-4">Mother</h3>
          <TextInput
            label="Name of Mother :"
            required={true}
            directInput={true}
            stateInput={formData.mothername}
            setStateInput={(value) => setFormData({ ...formData, mothername: value })}
            readOnly={true}
          />
          <TextInput
            label="Nationality :"
            required={true}
            directInput={true}
            stateInput={formData.mothernationality}
            setStateInput={(value) => setFormData({ ...formData, mothernationality: value })}
            readOnly={true}
          />

          <TextInput
            label="Age"
            directInput={true}
            stateInput={formData.motherage}
            setStateInput={(value) => setFormData({ ...formData, motherage: value })}
            readOnly={true}
          />
          <TextInput
            label="Race / Ethnic Group :"
            directInput={true}
            stateInput={formData.race}
            setStateInput={(value) => setFormData({ ...formData, race: value })}
            readOnly={true}
            required={true}
          />
          <TextInput
            label="Usual residence of Mother :"
            required={true}
            directInput={true}
            stateInput={formData.motherresidence}
            setStateInput={(value) => setFormData({ ...formData, motherresidence: value })}
            readOnly={true}
          />
          <TextInput
            label="Occupation :"
            name="gender"
            directInput={true}
            options={["Select", "Male", "Female"]}
            stateInput={formData.motheroccupation}
            setStateInput={setFormData}
            readOnly={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Valid ID :"
            required={true}
            directInput={true}
            stateInput={formData.mothervalid}
            setStateInput={(value) => setFormData({ ...formData, mothervalid: value })}
            readOnly={true}
          />
          <TextInput
            label="ID Number :"
            required={true}
            directInput={true}
            stateInput={formData.motheridno}
            setStateInput={(value) => setFormData({ ...formData, motheridno: value })}
            readOnly={true}
          />
            </div>
            <h3 className="text-xl font-bold mt-6 mb-4">Father</h3>
          <TextInput
            label="Name of Father :"
            required={true}
            directInput={true}
            stateInput={formData.fathername}
            setStateInput={(value) => setFormData({ ...formData, fathername: value })}
            readOnly={true}
          />
          <TextInput
            label="Nationality :"
            required={true}
            directInput={true}
            stateInput={formData.fathernationality}
            setStateInput={(value) => setFormData({ ...formData, fathernationality: value })}
            readOnly={true}
          />

          <TextInput
            label="Age"
            directInput={true}
            stateInput={formData.fatherage}
            setStateInput={(value) => setFormData({ ...formData, fatherage: value })}
            readOnly={true}
          />
          <TextInput
            label="Race / Ethnic Group :"
            directInput={true}
            stateInput={formData.race}
            setStateInput={(value) => setFormData({ ...formData, race: value })}
            readOnly={true}
            required={true}
          />
          <TextInput
            label="Usual residence of Mother :"
            required={true}
            directInput={true}
            stateInput={formData.fatherresidence}
            setStateInput={(value) => setFormData({ ...formData, fatherresidence: value })}
            readOnly={true}
          />
          <TextInput
            label="Occupation :"
            directInput={true}
            stateInput={formData.fatheroccupation}
            setStateInput={(value) => setFormData({ ...formData, fatheroccupation: value })}
            readOnly={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Valid ID :"
            required={true}
            directInput={true}
            stateInput={formData.fathervalid}
            setStateInput={(value) => setFormData({ ...formData, fathervalid: value })}
            readOnly={true}
          />
          <TextInput
            label="ID Number :"
            required={true}
            directInput={true}
            stateInput={formData.fatheridno}
            setStateInput={(value) => setFormData({ ...formData, fatheridno: value })}
            readOnly={true}
          />
            </div>
      </form>
    </div>
    </div>
  );
}

export default ViewLiveBirth;
