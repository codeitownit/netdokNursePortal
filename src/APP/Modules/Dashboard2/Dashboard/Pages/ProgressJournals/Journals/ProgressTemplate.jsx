import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "../../../../../../Components/Inputs";


// eslint-disable-next-line react/prop-types
function ProgressTemplate({ text = "Edit Journal" }) {
  const [nursingStatus, setNursingStatus] = useState('');
  const [procedures, setProcedures] = useState('');
  const [carePlan, setCarePlan] = useState('');
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
        setNursingStatus(res?.data.nursingStatus);
        setProcedures(res?.data.nursingProcedures);
        setCarePlan(res?.data.carePlan);
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
        nursingStatus: nursingStatus,
        nursingProcedures: procedures,
        carePlan: carePlan,
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
        label="Nursing Status"
        directInput={true}
        required={false}
        stateInput={nursingStatus}
        setStateInput={setNursingStatus}
      />
      <TextArea
        label="Nursing Procedures"
        directInput={true}
        required={false}
        stateInput={procedures}
        setStateInput={setProcedures}
      />
      <TextArea
        label="Care Plan"
        directInput={true}
        required={false}
        stateInput={carePlan}
        setStateInput={setCarePlan}
      />
        <TextArea
          label="Diagnoses"
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

export default ProgressTemplate;
