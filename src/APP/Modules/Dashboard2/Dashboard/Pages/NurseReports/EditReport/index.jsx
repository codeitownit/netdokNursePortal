import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  getCurrentDate, 
  formatTime
} from "../../../../../../Components/globals";

// eslint-disable-next-line react/prop-types
function EditNurseReport({ text = "Edit Nurse Report" }) {
  const [nutritionalState, setNutritionalState] = useState('');
  const [nutritionalStateComments, setNutritionalStateComments] = useState('');
  const [crp, setCrp] = useState('');
  const [crpComments, setCrpComments] = useState('');
  const [fluid, setFluid] = useState('');
  const [fluidComments, setFluidComments] = useState('');
  const [pGlucose, setPGlucose] = useState('');
  const [pGlucoseComments, setPGlucoseComments] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [oxygenComments, setOxygenComments] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [temp, setTemp] = useState('');
  const [pulse, setPulse] = useState('');
  const [bp, setBp] = useState('');
  const [pulseOximeter, setPulseOximeter] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [drinks, setDrinks] = useState('');
  const [urine, setUrine] = useState('');
  const [iv, setIv] = useState('');
  const [vomiting, setVomiting] = useState('');
  const [drainage, setDrainage] = useState('');
  const [stoma, setStoma] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [currentStateComments, setCurrentStateComments] = useState('');
  const [feaces, setFeaces] = useState('');
  const [feacesComments, setFeacesComments] = useState('');
  const [diet, setDiet] = useState('');
  const [dietComments, setDietComments] = useState('');


  // const handleDateChange = (event) => {
  //   setAdmissionDate(event.target.value);
  // };
  const hospitalId = localStorage.getItem("universalHospitalId")
  const doctorEmail = localStorage.getItem("primeDoctorUserEmail")
  const doctorId = localStorage.getItem("primeDoctorUserId");
  const pName = localStorage.getItem("universalPatientName");
  const patientId = localStorage.getItem("universalPatientId");
  const doctorName = localStorage.getItem("universalDoctorName");
  const doctorPhone = localStorage.getItem("universalDoctorPhone");
  const navigate = useNavigate();
  const request = useaxios();
  const {id} = useParams()
  

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await request({
          method: "GET",
          url: `patientJournal/${id}`,
          auth: true,
        });

        // Check if the response is not an error
        if (res !== "error") {
          setNutritionalState(res?.data.nutritionalState)
          setNutritionalStateComments(res?.data.nutritionalStateComments)
          setCrp(res?.data.crp)
          setCrpComments(res?.data.crpComments)
          setFluid(res?.data.fluid)
          setFluidComments(res?.data.fluidComments)
          setPGlucose(res?.data.pglucose)
          setPGlucoseComments(res?.data.pglucoseComments)
          setOxygen(res?.data.oxygen)
          setOxygenComments(res?.data.oxygenComments)
          setWeight(res?.data.weight)
          setHeight(res?.data.height)
          setTemp(res?.data.temperature)
          setPulse(res?.data.pulseRate)
          setBp(res?.data.bloodPressure)
          setPulseOximeter(res?.data.pulseOximeter)
          setBloodSugar(res?.data.bloodSugar)
          setDrinks(res?.data.drinks)
          setUrine(res?.data.urine)
          setIv(res?.data.iv)
          setVomiting(res?.data.vomiting)
          setDrainage(res?.data.drainage)
          setStoma(res?.data.stoma)
          setCurrentState(res?.data.currentState)
          setCurrentStateComments(res?.data.currentStateComments)
          setFeaces(res?.data.feaces)
          setFeacesComments(res?.data.feacesComments)
          setDiet(res?.data.diet)
          setDietComments(res?.data.dietComments)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      date: getCurrentDate(),
      time: formatTime(new Date()),
      // document: documentId,
      weight: weight,
      height: height,
      temperature: temp,
      pulseRate: pulse,
      bloodPressure: bp,
      pulseOximeter: pulseOximeter,
      bloodSugar: bloodSugar,
      nutritionalState: nutritionalState,
      nutritionalStateComments: nutritionalStateComments,
      fluid: fluid,
      fluidComments: fluidComments,
      crp: crp,
      crpComments: crpComments,
      pglucose: pGlucose,
      pglucoseComments: pGlucoseComments,
      oxygen: oxygen,
      oxygenComments: oxygenComments,
      currentState: currentState,
      currentStateComments: currentStateComments,
      feaces: feaces,
      feacesComments: feacesComments,
      diet: diet,
      dietComments: dietComments,
      drinks: drinks,
      urine: urine,
      iv: iv,
      stoma: stoma,
      vomiting: vomiting,
      drainage: drainage,
      type: "admissionReport",
      doctorEmail: doctorEmail,
      doctorName: doctorName,
      doctorPhone: doctorPhone,
      docId: doctorId,
      fromVideoCall: false,
      patient: patientId,
      patientName: pName,
      // userGender: userGender.toLowerCase(),
      // userWeight: userWeight,
      createdByName: doctorName,
      createdBy: doctorId,
      createdByEmail: doctorEmail,
      train: false,
      predictive: false,
      status: "active",
      statusCode: 0,
      hospitalId: hospitalId,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()

    };

    console.log(formData);

    const res = await request({
      method: "PUT",
      url: "patientJournal",
      data: formData,
      auth: true,
    });

    console.log(res);

    if (res !== "error") {
      console.log(formData)
      navigate(`/viewPatient/${patientId}/nurseReports`);
      return;
    }
  }
  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Edit Nurse Report</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextArea
        label="Nutritional State"
        directInput={true}
        required={false}
        stateInput={nutritionalState}
        setStateInput={setNutritionalState}
      />
      <TextArea
        label="Nutritional State Comments"
        directInput={true}
        required={false}
        stateInput={nutritionalStateComments}
        setStateInput={setNutritionalStateComments}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextArea
        label="CRP Rapid Test"
        directInput={true}
        required={false}
        stateInput={crp}
        setStateInput={setCrp}
      />
      <TextArea
        label="CRP Rapid Test Comments"
        directInput={true}
        required={false}
        stateInput={crpComments}
        setStateInput={setCrpComments}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInput
        label="Urinalysis Bedside Test"
        directInput={true}
        required={false}
        stateInput={fluid}
        setStateInput={setFluid}
      />
      <TextArea
        label="Urinalysis Bedside Test Comments"
        directInput={true}
        required={false}
        stateInput={fluidComments}
        setStateInput={setFluidComments}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInput
        label="p-glucose"
        directInput={true}
        required={false}
        stateInput={pGlucose}
        setStateInput={setPGlucose}
      />
      <TextArea
        label="p-glucose comments"
        directInput={true}
        required={false}
        stateInput={pGlucoseComments}
        setStateInput={setPGlucoseComments}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInput
        label="Oxygen Saturation"
        directInput={true}
        required={false}
        stateInput={oxygen}
        setStateInput={setOxygen}
      />
      <TextArea
        label="Oxygen Saturation Comments"
        directInput={true}
        required={false}
        stateInput={oxygenComments}
        setStateInput={setOxygenComments}
      />
</div>
      <h3 className="text-xl font-bold mt-6 mb-4">Vital Parameters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="Weight (Kg)"
          directInput={true}
          required={true}
          stateInput={weight}
          setStateInput={setWeight}
        />
        <TextInput
          label="Height (cm)"
          directInput={true}
          required={true}
          stateInput={height}
          setStateInput={setHeight}
        />
        <TextInput
          label="Temp (°C)"
          directInput={true}
          required={false}
          stateInput={temp}
          setStateInput={setTemp}
        />
        <TextInput
          label="Pulse Rate (bpm)"
          directInput={true}
          required={false}
          stateInput={pulse}
          setStateInput={setPulse}
        />
        <TextInput
          label="Blood Pressure (mm Hg)"
          directInput={true}
          required={false}
          stateInput={bp}
          setStateInput={setBp}
        />
        <TextInput
          label="Pulse Oximeter (%)"
          directInput={true}
          required={false}
          stateInput={pulseOximeter}
          setStateInput={setPulseOximeter}
        />
        <TextInput
          label="Blood Sugar (mmol/L)"
          directInput={true}
          required={false}
          stateInput={bloodSugar}
          setStateInput={setBloodSugar}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <TextInput
          label="Drinks (ml)"
          directInput={true}
          required={false}
          stateInput={drinks}
          setStateInput={setDrinks}
        />
        <TextInput
          label="Urine (ml)"
          directInput={true}
          required={false}
          stateInput={urine}
          setStateInput={setUrine}
        />
        <TextInput
          label="IV fluids/infusion (ml)"
          directInput={true}
          required={false}
          stateInput={iv}
          setStateInput={setIv}
        />
        <TextInput
          label="Vomiting (ml)"
          directInput={true}
          required={false}
          stateInput={vomiting}
          setStateInput={setVomiting}
        />
        <TextInput
          label="Drainage (ml)"
          directInput={true}
          required={false}
          stateInput={drainage}
          setStateInput={setDrainage}
        />
        <TextInput
          label="Stoma (ml)"
          directInput={true}
          required={false}
          stateInput={stoma}
          setStateInput={setStoma}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TextArea
        label="Current State"
        directInput={true}
        required={false}
        stateInput={currentState}
        setStateInput={setCurrentState}
      />
      <TextArea
        label="Current State Comments"
        directInput={true}
        required={false}
        stateInput={currentStateComments}
        setStateInput={setCurrentStateComments}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TextArea
      className="w-10"
        label="Feaces/Bowel Opening"
        directInput={true}
        required={false}
        stateInput={feaces}
        setStateInput={setFeaces}
      />
      <TextArea
      className="w-10"
        label="Feaces/Bowel Opening Comments"
        directInput={true}
        required={false}
        stateInput={feacesComments}
        setStateInput={setFeacesComments}
      />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TextArea
        label="Diet"
        directInput={true}
        required={false}
        stateInput={diet}
        setStateInput={setDiet}
      />
      <TextArea
        label="Diet Comments"
        directInput={true}
        required={false}
        stateInput={dietComments}
        setStateInput={setDietComments}
      />
      </div>
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNurseReport;
