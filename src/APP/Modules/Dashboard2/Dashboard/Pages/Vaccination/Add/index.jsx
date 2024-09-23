import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';
import TextInput from "../../../../../../Components/Inputs/TextInput";
import RadioInput from "../../../../../../Components/Inputs/RadioInput";
import SelectInput from "../../../../../../Components/Inputs/SelectInput";

// eslint-disable-next-line react/prop-types
function AddVaccination({ text = "Add Vaccination" }) {
  const [booster, setBooster] = useState('');
  const [child, setChild] = useState('');
  const [other, setOther] = useState('');
  const [pandemic, setPandemic] = useState('');
  const [travel, setTravel] = useState('');
  const [boosterR, setBoosterR] = useState('');
  const [childR, setChildR] = useState('');
  const [otherR, setOtherR] = useState('');
  const [pandemicR, setPandemicR] = useState('');
  const [travelR, setTravelR] = useState('');

  // const handleDateChange = (event) => {
  //   setAdmissionDate(event.target.value);
  // };
  const patientId = localStorage.getItem("universalPatientId");
  const navigate = useNavigate();
  const request = useaxios();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
       travelVaccine: travel,
       boosterVroute: boosterR,
       pandemicVaccine: pandemic,
       boosterVaccine: booster,
       travelVroute: travelR,
       otherVroute: otherR,
       otherVaccine: other,
       pandemicVroute: pandemicR,
       childhoodVaccine: child,
       childVroute: childR,
       userId: patientId,
       timestamp: new Date().toISOString()
    };

    console.log(formData);

    const res = await request({
      method: "POST",
      url: "vaccination",
      data: formData,
    //   auth: true,
    });

    console.log(res);

    if (res !== "error") {
      console.log(formData)
      navigate(`/viewPatient/${patientId}/vaccination/view`);
      return;
    }
  }
  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Add Vaccination</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
      <TextArea
        label="1. Received Childhood Vaccinations"
        directInput={true}
        required={false}
        stateInput={child}
        setStateInput={setChild}
      />
      <SelectInput 
        directInput={true}
        required={false}
        stateInput={childR}
        setStateInput={setChildR}>
        <option value="">Oral Administration</option>
        <option value="oral">Oral</option>
        <option value="Im">Im</option>
        <option value="sc">sc</option>
        <option value="other">other</option>
  </SelectInput>
      <TextArea
        label="2. Booster Vaccinations"
        directInput={true}
        required={false}
        stateInput={booster}
        setStateInput={setBooster}
      />
      <SelectInput 
        directInput={true}
        required={false}
        stateInput={boosterR}
        setStateInput={setBoosterR}>
        <option value="">Oral Administration</option>
        <option value="oral">Oral</option>
        <option value="Im">Im</option>
        <option value="sc">sc</option>
        <option value="other">other</option>
  </SelectInput>
      <TextArea
        label="3. Travel Vaccinations"
        directInput={true}
        required={false}
        stateInput={travel}
        setStateInput={setTravel}
      />
      <SelectInput 
        directInput={true}
        required={false}
        stateInput={travelR}
        setStateInput={setTravelR}>
        <option value="">Oral Administration</option>
        <option value="oral">Oral</option>
        <option value="Im">Im</option>
        <option value="sc">sc</option>
        <option value="other">other</option>
  </SelectInput>
      <TextArea
      label="4. Pandemic & Epidermic Vaccinations"
      directInput={true}
      required={false}
      stateInput={pandemic}
      setStateInput={setPandemic}
    />
    <SelectInput 
        directInput={true}
        required={false}
        stateInput={pandemicR}
        setStateInput={setPandemicR}>
        <option value="">Oral Administration</option>
        <option value="oral">Oral</option>
        <option value="Im">Im</option>
        <option value="sc">sc</option>
        <option value="other">other</option>
    </SelectInput>
    <TextArea
        label="5. Other Vaccinations"
        directInput={true}
        required={false}
        stateInput={other}
        setStateInput={setOther}
  />
  <SelectInput 
    directInput={true}
    required={false}
    stateInput={otherR}
    setStateInput={setOtherR}>
    <option value="">Oral Administration</option>
    <option value="oral">Oral</option>
    <option value="Im">Im</option>
    <option value="sc">sc</option>
    <option value="other">other</option>
  </SelectInput>
</div>
        </form>
      </div>
    </div>
  );
}

export default AddVaccination;
