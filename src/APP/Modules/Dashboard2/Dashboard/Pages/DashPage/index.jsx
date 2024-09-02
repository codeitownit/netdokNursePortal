import { headers } from "./sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputReadonly from "../../../../../Components/Inputs/InputReadonly";
import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv, divStyle } from "./sections/style";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import DropdownBtnJournals from "../../../../../Components/Buttons/DropdownJournals";
import { TextArea } from "../../../../../Components/Inputs";

function DashPage2() {
  const [patientData, setPatientData] = useState([]);
  const [data, setData] = useState(null);
  const [medData, setMedData] = useState(null);
  const [currentMed, setCurrentMed] = useState(null);
  const [prevC, setprevC] = useState(null);
  const patientName = localStorage.getItem("universalPatientName")
  const pId = localStorage.getItem("universalPatientId")


  const navigate = useNavigate();
  const request = useaxios();
  const documentId = localStorage.getItem('universalPatientDocumentId')
  const admDate = localStorage.getItem("universalPatientAdmissionDate")
  let su = [];
  let medicineList = [];


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
        showLoader: false,
      });
      const res3 = await request({
        method: "GET",
        url: `patientJournal`,
        body: {},
        auth: false,
        showLoader: false,
      });
      const res4 = await request({
        method: "GET",
        url: `prescriptions/prescriptionsWhere/userUid/${pId}`,
        body: {},
        auth: false,
        showLoader: false,
      });
      // Check if the response is not an error
      if (res !== "error" ) {
        console.log(res?.data);
        setPatientData(res?.data || []);  
        localStorage.setItem("universalPatientAge", res?.data.userAge)

      }
     
      if (res3 !== "error") {
        console.log("res3 data:", res3?.data);
        setData(Array.isArray(res3?.data) ? res3?.data : []);
      }
      if (res4 !== "error") {
        console.log("res4 data:", res4?.data);
        setMedData(Array.isArray(res4?.data) ? res4?.data : []);
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

  //  async function contacts(){
  //   console.log(su)
  //   }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      data.map((doc, index) => {
        let s;
        if (doc.type.includes("nurseMidwives")) {
          s = "Nurse";
        } else if (doc.type.includes("physiotherapy")) {
          s = "Physiotherapist";
        } else if (doc.type.includes("occupationalTherapy")) {
          s = "Occupational Therapist";
        } else if (doc.type.includes("psychology")) {
          s = "Psychologist";
        } else if (doc.type.includes("pediatric")) {
          s = "Pediatrician";
        } else {
          s = "Doctor";
        }
        su.push(`${doc.date}-${s}-${doc.progressDiagnosis}\n`);
      });

      setprevC(su.slice(0, 10));
    }
  }, [data]);
  useEffect(() => {
    if (Array.isArray(medData)) {
      medData.map((doc, index) => {
        if(!doc?.medStatus || doc?.medStatus === "current"){
        medicineList.push(`${doc?.medName}\n`);
      }});

      setCurrentMed(medicineList.slice(0, 5));
    }
  }, [data]);
  const dropdownItems = [
    { label: "Add New Admission Journal", onClick: () => navigate(`/viewPatient/${pId}/add-admission-journal`)},
    { label: "Add Telephone Journal", onClick: () => navigate(`/viewPatient/${pId}/add-telephone-journal`) },
    { label: "Add Progress Journal", onClick: () => navigate(`/viewPatient/${pId}/add-progress-journal`) },
    { label: "Add Operation Journal", onClick: () => navigate(`/viewPatient/${pId}/add-operation-journal`) }
  ];

  return (
    <div className={grayPanel()}>
      <div className="mb-20">
        <form className={outerDiv}>
          <div className=" flex justify-center p-0 m-0">
            <h1 className="text-xl text-secondary font-bold text-center">View Patient Information</h1>
          </div>
          <h4>{su.slice(0, 5)}</h4>
          <div className={divStyle}>
          <div className="px-96 mt-0 pt-0 bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
        stateInput={patientData.diagnosis}
        disabled={true}
        rows={1}
      />
      <TextArea
        label="Ongoing Treatment"
        directInput={true}
        required={false}
        stateInput={currentMed}
        disabled={true}
        rows={1}
      />
      <TextArea
        label="Previous Contacts"
        directInput={true}
        required={false}
        stateInput={prevC}
        disabled={true}
        rows={1}
      />
      <TextArea
        label="Medicine"
        directInput={true}
        required={false}
        stateInput={patientData.userMedications}
        disabled={true}
        rows={1}
      />
      <TextArea
        label="Brief Summary"
        directInput={true}
        required={false}
        stateInput={patientData.description}
        disabled={true}
        rows={1}
      />
      </div>
    </div>
          </div>
          <div className="pt-0 mt-0 flex flex-row justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <DropdownBtnJournals
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashPage2;
