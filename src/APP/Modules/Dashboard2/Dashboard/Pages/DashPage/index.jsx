import { headers } from "./sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputReadonly from "../../../../../Components/Inputs/InputReadonly";
import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv, divStyle } from "./sections/style";

function DashPage2() {
  const [patientData, setPatientData] = useState([]);
  
  const patientName = localStorage.getItem("universalPatientName")


  const navigate = useNavigate();
  const request = useaxios();
  const documentId = localStorage.getItem('universalPatientDocumentId')
  const admDate = localStorage.getItem("universalPatientAdmissionDate")

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
          stateInput={patientData.userGender}
        />
    </div>
        <TextInputReadonly
          label="Age"
          directInput={true}
          required={false}
          stateInput={patientData.userAge}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInputReadonly
          label="Weight"
          directInput={true}
          required={false}
          stateInput={patientData.userWeight}
        />
    </div>
    <TextInputReadonly
        label="Condition"
        directInput={true}
        required={false}
        stateInput={patientData.condition}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInputReadonly
        label="Allergies"
        directInput={true}
        required={false}
        stateInput={"none"}
      />
      <TextInputReadonly
        label="Date of Admission"
        directInput={true}
        required={false}
        stateInput={admDate}
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
