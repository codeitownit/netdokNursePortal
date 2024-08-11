import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "../../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';


// eslint-disable-next-line react/prop-types
function TelephoneTemplate({ text = "Edit Journal" }) {
  const [condition, setCondition] = useState('');
  const [history, setHistory] = useState('');
  const [clinicalSummary, setClinicalSummary] = useState('');
  const [managementPlan, setManagementPlan] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  
  const { id } = useParams();
  const pId = localStorage.getItem("universalPatientId")

  const navigate = useNavigate();
  const request = useaxios();

  const fetchData = async () => {
    
    try {
      const res = await request({
        method: "GET",
        url: `patientJournal/${id}`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data.date);
        setCondition(res?.data.condition);
        setHistory(res?.data.progressHistory);
        setClinicalSummary(res?.data.clinicalSummary);
        setManagementPlan(res?.data.managementPlan);
        setDiagnosis(res?.data.progressDiagnosis);
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



  function handleEdit(e) {
    e.preventDefault();
    const formData = {
        condition: condition,
        progressHistory: history,
        clinicalSummary: clinicalSummary,
        managementPlan: managementPlan,
        progressDiagnosis: diagnosis,
      };
    async function patch() {
      try {
        const res = await request({
          method: "PUT",
          url: `patientJournal/${id}`,
          data: formData,
          auth: false,
        });
        // Check if the response is not an error
        if (res !== "error") {
          navigate(`/viewPatient/${pId}/progressJournals`);
        }
        //console.log("success");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    patch();
  }

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleEdit}>
          <div className=" flex flex-row justify-between data-center">
            <h1 className={headers}>View Journal</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md shadow-md">
      <TextArea
        label="Condition"
        directInput={true}
        required={false}
        stateInput={condition}
        setStateInput={setCondition}
      />
      <TextArea
        label="History of Prevailing Condition"
        directInput={true}
        required={false}
        stateInput={history}
        setStateInput={setHistory}
      />
      <TextArea
        label="Clinical Summary"
        directInput={true}
        required={false}
        stateInput={clinicalSummary}
        setStateInput={setClinicalSummary}
      />
      <TextArea
        label="Management Plan"
        directInput={true}
        required={false}
        stateInput={managementPlan}
        setStateInput={setManagementPlan}
      />
        
        <TextArea
          label="Working Diagnosis"
          directInput={true}
          required={false}
          stateInput={diagnosis}
          setStateInput={setDiagnosis}
        />
      
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default TelephoneTemplate;
