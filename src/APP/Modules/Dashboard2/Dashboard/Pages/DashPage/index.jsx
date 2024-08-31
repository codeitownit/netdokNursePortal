import { headers } from "./sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputReadonly from "../../../../../Components/Inputs/InputReadonly";
import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv, divStyle } from "./sections/style";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import DropdownBtn from "../../../../../Components/Buttons/Dropdown-btn";
import { TextArea } from "../../../../../Components/Inputs";

function DashPage2() {
  const [patientData, setPatientData] = useState([]);
  
  const patientName = localStorage.getItem("universalPatientName")
  const pId = localStorage.getItem("universalPatientId")


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
      const res2 = await request({
        method: "GET",
        url: `userProfile/orderBy/uid/${pId}`,
        body: {},
        auth: true,
      });

      // Check if the response is not an error
      if (res !== "error" ) {
        console.log(res?.data);
        setPatientData(res?.data || []);  
        localStorage.setItem("universalPatientAge", res?.data.userAge)

      }
      if (res2 !== "error") {
        console.log(res2?.data);
        res2?.data.map((snap)=>{
          console.log(snap);
          localStorage.setItem("universalPatientWeight", snap?.Weight)
          localStorage.setItem("universalPatientDOB", snap?.DOB)
          localStorage.setItem("universalPatientGender", snap?.gender)
          localStorage.setItem("universalPatientAge", snap?.age)

        })
        
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
  const dropdownItems = [
    { label: "Add New Admission Journal", onClick: () => navigate(`/viewPatient/${pId}/add-admission-journal`)},
    { label: "Add Telephone Journal", onClick: () => navigate(`/viewPatient/${pId}/add-telephone-journal`) },
    { label: "Add Progress Journal", onClick: () => navigate(`/viewPatient/${pId}/add-progress-journal`) },
    { label: "Add Operation Journal", onClick: () => navigate(`/viewPatient/${pId}/add-operation-journal`) }
  ];

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Patient Name: {patientName}</h1>
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
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
      <TextArea
        label="Diagnosis"
        directInput={true}
        required={false}
        stateInput={patientData.condition}
        disabled={true}
      />
      <TextArea
        label="Ongoing Treatment"
        directInput={true}
        required={false}
        stateInput={admDate}
        disabled={true}
      />
      <TextArea
        label="Previous Contacts"
        directInput={true}
        required={false}
        stateInput={admDate}
        disabled={true}
      />
      <TextArea
        label="Medicine"
        directInput={true}
        required={false}
        stateInput={patientData.medication}
        disabled={true}
      />
      <TextArea
        label="Brief Summary"
        directInput={true}
        required={false}
        stateInput={patientData.description}
        disabled={true}
      />
      </div>
    </div>
          </div>
          <div className="flex flex-row justify-center">
          <DropdownBtn
      txt="Nurse Journals"
      dropdownItems={dropdownItems}
    />
          <AddEdit text="Fluid Chart" 
          onClick={() =>navigate(`/viewPatient/${pId}/fluidChart`)}
          />
          <AddEdit text="Vital Parameters" 
          onClick={() =>navigate(`/viewPatient/${pId}/vitals`)}
          />
          <AddEdit text="Discharge Journal"
          onClick={() =>navigate(`/viewPatient/${pId}/discharge`)}
          />
          <AddEdit text="Admission Treatment Module"
          onClick={() =>navigate(`/viewPatient/${pId}/admissionTreatment`)}
            />
          <AddEdit text="Correspondence" 
          onClick={() =>navigate(`/viewPatient/${pId}/correspondence`)}
          />
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashPage2;
