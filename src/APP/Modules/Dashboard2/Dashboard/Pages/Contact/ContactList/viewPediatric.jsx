import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextInput, TextArea } from "../../../../../../Components/Inputs";
import useaxios from "../../../../../../Hooks/useAxios";
import grayPanel from "../../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";

function ViewPediatricJournal({ text = "Edit Journal" }) {
  const [admissionDate, setAdmissionDate] = useState('');
  const [time, setTime] = useState('');
  const [contactVisit, setContactVisit] = useState('');
  const [present, setPresent] = useState('');
  const [otherComments, setOtherComments] = useState('');
  const [healthHistory, setHealthHistory] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');
  const [skin, setSkin] = useState('');
  const [skinComments, setSkinComments] = useState('');
  const [limbMovements, setLimbMovements] = useState('');
  const [limbMovementsComments, setLimbMovementsComments] = useState('');
  const [walks, setWalks] = useState('');
  const [walksComments, setWalksComments] = useState('');
  const [handReflexes, setHandReflexes] = useState('');
  const [handReflexesComments, setHandReflexesComments] = useState('');
  const [back, setBack] = useState('');
  const [backComments, setBackComments] = useState('');
  const [lowExtremityAndReflexes, setLowExtremityAndReflexes] = useState('');
  const [lowExtremityAndReflexesComments, setLowExtremityAndReflexesComments] = useState('');
  const [skull, setSkull] = useState('');
  const [skullComments, setSkullComments] = useState('');
  const [lungsAndBreathing, setLungsAndBreathing] = useState('');
  const [lungsAndBreathingComments, setLungsAndBreathingComments] = useState('');
  const [femoralPulses, setFemoralPulses] = useState('');
  const [femoralPulsesComments, setFemoralPulsesComments] = useState('');
  const [abdomen, setAbdomen] = useState('');
  const [abdomenComments, setAbdomenComments] = useState('');
  const [externalGenitalia, setExternalGenitalia] = useState('');
  const [externalGenitaliaComments, setExternalGenitaliaComments] = useState('');
  const [eyesAndReflexes, setEyesAndReflexes] = useState('');
  const [eyesAndReflexesComments, setEyesAndReflexesComments] = useState('');
  const [earsAndHearing, setEarsAndHearing] = useState('');
  const [earsAndHearingComments, setEarsAndHearingComments] = useState('');
  const [mouth, setMouth] = useState('');
  const [mouthComments, setMouthComments] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [dentalScreening, setDentalScreening] = useState('');
  const [dentalScreeningComments, setDentalScreeningComments] = useState('');
  const [clinicalSummary, setClinicalSummary] = useState('');
  const [clinicalSummaryComments, setClinicalSummaryComments] = useState('');
  const [vaccination, setVaccination] = useState('');

  const { id } = useParams();
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

      if (res !== "error") {
        console.log(res.data)
        const data = res?.data;
        setAdmissionDate(data.date || '');
        setTime(data.admissionTime || '');
        setContactVisit(data.contactVisit || '');
        setPresent(data.present || '');
        setOtherComments(data.otherComments || '');
        setHealthHistory(data.healthHistory || '');
        setAge(data.age || '');
        setWeight(data.weight || '');
        setHeight(data.height || '');
        setHeadCircumference(data.headCircumference || '');
        setSkin(data.skin || '');
        setSkinComments(data.skinComments || '');
        setLimbMovements(data.limbMovements || '');
        setLimbMovementsComments(data.limbMovementsComments || '');
        setWalks(data.walks || '');
        setWalksComments(data.walksComments || '');
        setHandReflexes(data.handReflexes || '');
        setHandReflexesComments(data.handReflexesComments || '');
        setBack(data.back || '');
        setBackComments(data.backComments || '');
        setLowExtremityAndReflexes(data.lowExtremityAndReflexes || '');
        setLowExtremityAndReflexesComments(data.lowExtremityAndReflexesComments || '');
        setSkull(data.skull || '');
        setSkullComments(data.skullComments || '');
        setLungsAndBreathing(data.lungsAndBreathing || '');
        setLungsAndBreathingComments(data.lungsAndBreathingComments || '');
        setFemoralPulses(data.femoralPulses || '');
        setFemoralPulsesComments(data.femoralPulsesComments || '');
        setAbdomen(data.abdomen || '');
        setAbdomenComments(data.abdomenComments || '');
        setExternalGenitalia(data.externalGenitalia || '');
        setExternalGenitaliaComments(data.externalGenitaliaComments || '');
        setEyesAndReflexes(data.eyesAndReflexes || '');
        setEyesAndReflexesComments(data.eyesAndReflexesComments || '');
        setEarsAndHearing(data.earsAndHearing || '');
        setEarsAndHearingComments(data.earsAndHearingComments || '');
        setMouth(data.mouth || '');
        setMouthComments(data.mouthComments || '');
        setDiagnosis(data.progressDiagnosis || '');
        setDentalScreening(data.dentalScreening || '');
        setDentalScreeningComments(data.dentalScreeningComments || '');
        setClinicalSummary(data.clinicalSummary || '');
        setClinicalSummaryComments(data.clinicalSummaryComments || '');
        setVaccination(data.vaccination || '');
      }
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
        <form className={outerDiv} type="submit">
          <div className="flex flex-row justify-between data-center">
            <h1 className={headers}>View Journal</h1>
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInput
        label="Admission Date"
        directInput={true}
        required={false}
        stateInput={admissionDate}
        setStateInput={setAdmissionDate}
        disabled={true}
      />
    </div>
        <TextInput
          label="Admission Time"
          directInput={true}
          required={false}
          stateInput={time}
          setStateInput={setTime}
          disabled={true}
        />
      </div>
            <TextInput
              label="Contact Visit"
              directInput={true}
              required={false}
              stateInput={contactVisit}
              setStateInput={setContactVisit}
              disabled={true}
            />
            <TextInput
              label="Present"
              directInput={true}
              required={false}
              stateInput={present}
              setStateInput={setPresent}
              disabled={true}
            />
            <TextArea
              label="Other Comments"
              directInput={true}
              required={false}
              stateInput={otherComments}
              setStateInput={setOtherComments}
              disabled={true}
            />
            <TextArea
              label="Current Health History"
              directInput={true}
              required={false}
              stateInput={healthHistory}
              setStateInput={setHealthHistory}
              disabled={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Age (months)"
              directInput={true}
              required={false}
              stateInput={age}
              setStateInput={setAge}
              disabled={true}
            />
            <TextInput
              label="Weight (Kg)"
              directInput={true}
              required={false}
              stateInput={weight}
              setStateInput={setWeight}
              disabled={true}
            />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Height (cm)"
              directInput={true}
              required={false}
              stateInput={height}
              setStateInput={setHeight}
              disabled={true}
            />
            <TextInput
              label="Head Circumference"
              directInput={true}
              required={false}
              stateInput={headCircumference}
              setStateInput={setHeadCircumference}
              disabled={true}
            />
            </div>
            <TextInput
              label="Skin"
              directInput={true}
              required={false}
              stateInput={skin}
              setStateInput={setSkin}
              disabled={true}
            />
            <TextArea
              label="Skin Comments"
              directInput={true}
              required={false}
              stateInput={skinComments}
              setStateInput={setSkinComments}
              disabled={true}
            />
            <h3 className="text-xl font-bold mt-6 mb-4">Limbs and Movement Apparatus</h3>
            <TextInput
              label="Spontaneous Limb Movements"
              directInput={true}
              required={false}
              stateInput={limbMovements}
              setStateInput={setLimbMovements}
              disabled={true}
            />
            <TextArea
              label="Spontaneous Limb Movements Comments"
              directInput={true}
              required={false}
              stateInput={limbMovementsComments}
              setStateInput={setLimbMovementsComments}
              disabled={true}
            />
            <TextInput
              label="Walks & Moves"
              directInput={true}
              required={false}
              stateInput={walks}
              setStateInput={setWalks}
              disabled={true}
            />
            <TextArea
              label="Walks & Moves Comments"
              directInput={true}
              required={false}
              stateInput={walksComments}
              setStateInput={setWalksComments}
              disabled={true}
            />
            <TextInput
              label="Hand Reflexes"
              directInput={true}
              required={false}
              stateInput={handReflexes}
              setStateInput={setHandReflexes}
              disabled={true}
            />
            <TextArea
              label="Hand Reflexes Comments"
              directInput={true}
              required={false}
              stateInput={handReflexesComments}
              setStateInput={setHandReflexesComments}
              disabled={true}
            />
            <TextInput
              label="Back"
              directInput={true}
              required={false}
              stateInput={back}
              setStateInput={setBack}
              disabled={true}
            />
            <TextArea
              label="Back Comments"
              directInput={true}
              required={false}
              stateInput={backComments}
              setStateInput={setBackComments}
              disabled={true}
            />
            <TextInput
              label="Low Extremity and Reflexes"
              directInput={true}
              required={false}
              stateInput={lowExtremityAndReflexes}
              setStateInput={setLowExtremityAndReflexes}
              disabled={true}
            />
            <TextArea
              label="Low Extremity and Reflexes Comments"
              directInput={true}
              required={false}
              stateInput={lowExtremityAndReflexesComments}
              setStateInput={setLowExtremityAndReflexesComments}
              disabled={true}
            />
            <TextInput
              label="Skull"
              directInput={true}
              required={false}
              stateInput={skull}
              setStateInput={setSkull}
              disabled={true}
            />
            <TextArea
              label="Skull Comments"
              directInput={true}
              required={false}
              stateInput={skullComments}
              setStateInput={setSkullComments}
              disabled={true}
            />
            <TextInput
              label="Lungs and Breathing"
              directInput={true}
              required={false}
              stateInput={lungsAndBreathing}
              setStateInput={setLungsAndBreathing}
              disabled={true}
            />
            <TextArea
              label="Lungs and Breathing Comments"
              directInput={true}
              required={false}
              stateInput={lungsAndBreathingComments}
              setStateInput={setLungsAndBreathingComments}
              disabled={true}
            />
            <TextInput
              label="Cardiovascular: Femoral Pulses"
              directInput={true}
              required={false}
              stateInput={femoralPulses}
              setStateInput={setFemoralPulses}
              disabled={true}
            />
            <TextArea
              label="Cardiovascular: Femoral Pulses Comments"
              directInput={true}
              required={false}
              stateInput={femoralPulsesComments}
              setStateInput={setFemoralPulsesComments}
              disabled={true}
            />
            <TextInput
              label="Abdomen"
              directInput={true}
              required={false}
              stateInput={abdomen}
              setStateInput={setAbdomen}
              disabled={true}
            />
            <TextArea
              label="Abdomen Comments"
              directInput={true}
              required={false}
              stateInput={abdomenComments}
              setStateInput={setAbdomenComments}
              disabled={true}
            />
            <TextInput
              label="External Genitalia"
              directInput={true}
              required={false}
              stateInput={externalGenitalia}
              setStateInput={setExternalGenitalia}
              disabled={true}
            />
            <TextArea
              label="External Genitalia Comments"
              directInput={true}
              required={false}
              stateInput={externalGenitaliaComments}
              setStateInput={setExternalGenitaliaComments}
              disabled={true}
            />
            <TextInput
              label="Eyes and Reflexes"
              directInput={true}
              required={false}
              stateInput={eyesAndReflexes}
              setStateInput={setEyesAndReflexes}
              disabled={true}
            />
            <TextArea
              label="Eyes and Reflexes Comments"
              directInput={true}
              required={false}
              stateInput={eyesAndReflexesComments}
              setStateInput={setEyesAndReflexesComments}
              disabled={true}
            />
            <TextInput
              label="Ears and Hearing"
              directInput={true}
              required={false}
              stateInput={earsAndHearing}
              setStateInput={setEarsAndHearing}
              disabled={true}
            />
            <TextArea
              label="Ears and Hearing Comments"
              directInput={true}
              required={false}
              stateInput={earsAndHearingComments}
              setStateInput={setEarsAndHearingComments}
              disabled={true}
            />
            <TextInput
              label="Mouth, Nose & Oral Cavity"
              directInput={true}
              required={false}
              stateInput={mouth}
              setStateInput={setMouth}
              disabled={true}
            />
            <TextArea
              label="Mouth, Nose & Oral Cavity Comments"
              directInput={true}
              required={false}
              stateInput={mouthComments}
              setStateInput={setMouthComments}
              disabled={true}
            />
            <TextInput
              label="Dental Screening"
              directInput={true}
              required={false}
              stateInput={dentalScreening}
              setStateInput={setDentalScreening}
              disabled={true}
            />
            <TextArea
              label="Dental Screening Comments"
              directInput={true}
              required={false}
              stateInput={dentalScreeningComments}
              setStateInput={setDentalScreeningComments}
              disabled={true}
            />
            <TextInput
              label="Clinical Summary"
              directInput={true}
              required={false}
              stateInput={clinicalSummary}
              setStateInput={setClinicalSummary}
              disabled={true}
            />
            <TextArea
              label="Clinical Summary Comments"
              directInput={true}
              required={false}
              stateInput={clinicalSummaryComments}
              setStateInput={setClinicalSummaryComments}
              disabled={true}
            />
            <TextInput
              label="Vaccination"
              directInput={true}
              required={false}
              stateInput={vaccination}
              setStateInput={setVaccination}
              disabled={true}
            />
            <TextArea
              label="Diagnosis"
              directInput={true}
              required={false}
              stateInput={diagnosis}
              setStateInput={setDiagnosis}
              disabled={true}
            />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewPediatricJournal;
