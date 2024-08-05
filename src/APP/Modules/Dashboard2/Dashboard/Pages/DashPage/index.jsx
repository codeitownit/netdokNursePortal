import { Tbody, Thead, Table, Tht } from "../../../../../Components/Table";
import Rows from "./sections/Rows";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { headers } from "./sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputReadonly from "../../../../../Components/Inputs/InputReadonly";
import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv, divStyle } from "./sections/style";

function DashPage2() {
  const [data, setData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [bmi, setBmi] = useState("");
  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [condition, setCondition] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [allergies, setAllergies] = useState("")
  const [admDate, setAdmDate] = useState("")
  const patientName = localStorage.getItem("universalPatientName")


  const navigate = useNavigate();
  const request = useaxios();
  const documentId = localStorage.getItem('universalPatientDocumentId')
  const fetchData = async () => {
    
    try {
      const res = await request({
        method: "GET",
        url: `conditions/primeConditions/${documentId}`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data);
        setPatientData(res?.data || []);
        setBmi(patientData.userBMI)
        setBp(patientData.userBp)
        setPulse(patientData.pulseRate)
        setCondition(patientData.condition)
        setGender(patientData.userGender)
        setAge(patientData.userAge)
        setWeight(patientData.userWeight)
        setAllergies("none")
        setAdmDate("")

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


  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Patient Name: {patientName}</h1>
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInputReadonly
          label="Gender"
          directInput={true}
          required={false}
          stateInput={gender}
          setStateInput={setGender}
        />
    </div>
        <TextInputReadonly
          label="Age"
          directInput={true}
          required={false}
          stateInput={age}
          setStateInput={setAge}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInputReadonly
          label="Weight"
          directInput={true}
          required={false}
          stateInput={weight}
          setStateInput={setWeight}
        />
    </div>
    <TextInputReadonly
        label="Condition"
        directInput={true}
        required={false}
        stateInput={condition}
        setStateInput={setCondition}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInputReadonly
        label="Allergies"
        directInput={true}
        required={false}
        stateInput={allergies}
        setStateInput={setAllergies}
      />
      <TextInputReadonly
        label="Date of Admission"
        directInput={true}
        required={false}
        stateInput={admDate}
        setStateInput={setAdmDate}
      />
      </div>

      
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashPage2;
