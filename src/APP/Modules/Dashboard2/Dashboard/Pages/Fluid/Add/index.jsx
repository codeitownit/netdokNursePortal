import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../../Components/Container/Container";
// import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../../Components/Inputs";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


// eslint-disable-next-line react/prop-types
function AddFluid() {
  const[surname, setSurname] = useState("")
  const[firstName, setFirstName] = useState("")
  const[regNo, setRegNo] = useState("")
  const[dob, setDob] = useState("")
  const[date, setDate] = useState("")
  const[weight, setWeight] = useState("")
  const[instructions, setInstructions] = useState("")
  const request = useaxios()
  const navigate = useNavigate()
  const hospitalId = localStorage.getItem("universalHospitalId")
  const pName = localStorage.getItem("universalPatientName");
  const pWeight = localStorage.getItem("universalPatientWeight");
  const pDOB = localStorage.getItem("universalPatientDOB");

  const columns = ['Oral', 'Enternal', 'IV', 'Other', 'Total in'];
  const columnsOut = ['Oral', 'Enternal', 'IV', 'Other', 'Total Out', 'Fluid Balance'];
  const rows = [
    '00:00hrs', '01:00hrs', '02:00hrs', '03:00hrs', '04:00hrs', '05:00hrs',
    '06:00hrs', '07:00hrs', '08:00hrs', '09:00hrs', '10:00hrs', '11:00hrs',
    '12:00hrs', '13:00hrs', '14:00hrs', '15:00hrs', '16:00hrs', '17:00hrs',
    '18:00hrs', '19:00hrs', '20:00hrs', '21:00hrs', '22:00hrs', '23:00hrs'
  ];
  
  const [inputValues, setInputValues] = useState(
    rows.map(() => Array(columns.length).fill(null))
  );
  const [inputValuesOut, setInputValuesOut] = useState(
    rows.map(() => Array(columnsOut.length).fill(null))
  );

  const [formData, setFormData] = useState({
    surName: surname,
    firstName: pName,
    hospitalRegNum: regNo,
    dob: dob,
    date: date,
    weight: pWeight,
    instructions: instructions
  });

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedValues = [...inputValues];
    updatedValues[rowIndex][colIndex] = parseFloat(value) || 0;
    updatedValues[rowIndex][4] = updatedValues[rowIndex].slice(0, 4).reduce((sum, val) => sum + val, 0);
    setInputValues(updatedValues);

    const totalIn = updatedValues[rowIndex][4];
    const totalOut = inputValuesOut[rowIndex][4] || 0;
    updateFluidBalance(rowIndex, totalIn, totalOut);
  };

  const handleInputChangeOut = (rowIndex, colIndex, value) => {
    const updatedValues = [...inputValuesOut];
    updatedValues[rowIndex][colIndex] = parseFloat(value) || 0;
    updatedValues[rowIndex][4] = updatedValues[rowIndex].slice(0, 4).reduce((sum, val) => sum + val, 0);
    setInputValuesOut(updatedValues);

    const totalIn = inputValues[rowIndex][4] || 0;
    const totalOut = updatedValues[rowIndex][4];
    updateFluidBalance(rowIndex, totalIn, totalOut);
  };

  const updateFluidBalance = (rowIndex, totalIn, totalOut) => {
    const updatedValuesOut = [...inputValuesOut];
    updatedValuesOut[rowIndex][5] = totalIn - totalOut;
    setInputValuesOut(updatedValuesOut);
  };

  // const handleInputChangeText = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allData = {
      ...formData,
      fluidInput: inputValues,
      fluidOutput: inputValuesOut
    };

    // Here, you can handle the form submission, e.g., send `allData` to an API or process it as needed.
    console.log('Form submitted:', allData);
    const res = await request({
      method: "POST",
      url: "fluidBalanceChart",
      data: allData,
      auth: true,
    });

    console.log(res);

    if (res !== "error") {
      console.log(allData)
      // navigate(`/viewPatient/${patientId}`);
      return;
    }
    
  };

  return (
    <form id="form" className="w-100 tint mb-4 mt-4" onSubmit={handleSubmit}>
      <div className="flex-grow-1 m-3 p-4 d-flex flex-col gap-2 bg-light-green outline rounded">
        <div className="logo-wrapper d-flex flex-col items-center m-0">
          <img src="images/logo.svg" width="30" alt="NetDoctorLogo" />
          <p className="fz-md m-0">NET DOCTOR</p>
        </div>
        <h3 className="self-center font-bold">
          <u>fluid_balance</u>
        </h3>
        <div className="_row tint">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="personal-data p-2 rounded d-flex flex-col flex-grow-1">
            <TextInput
        label="Surname"
        directInput={true}
        required={false}
        stateInput={pName}
        setStateInput={setSurname}
      />
              <TextInput
                label="First Name"
                directInput={true}
                required={false}
                stateInput={pName}
                setStateInput={setFirstName}
              />
              <TextInput
                label="Hospital Reg No"
                directInput={true}
                required={false}
                stateInput={hospitalId}
                setStateInput={setRegNo}
              />
              <TextInput
                label="Date of birth"
                directInput={true}
                required={false}
                stateInput={pDOB}
                setStateInput={setDob}
              />
              <TextInput
                label="Date"
                directInput={true}
                required={false}
                stateInput={new Date().toISOString().split('T')[0]}
                setStateInput={setDate}
              />
              <TextInput
                label="Weight"
                directInput={true}
                required={false}
                stateInput={pWeight}
                setStateInput={setWeight}
              />
            </div>
            <div className="personal-data p-2 rounded d-flex flex-col flex-grow-1 mb-0">
              <TextArea
                label="Indication/Instructions for recording Fluid Balance"
                directInput={true}
                required={false}
                stateInput={instructions}
                setStateInput={setInstructions}
              />
            </div>
          </div>
        </div>

        {/* Fluid input and output tables... */}

        <div className="flex flex-row">
          <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th colSpan={5} className="border border-gray-300 px-4 py-2 bg-gray-200">FLUID INPUT</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">Time</th>
              {columns.map((col, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2 bg-gray-200">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 px-4 py-2 bg-gray-200">{time}</td>
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-4 py-2">
                    {colIndex < 4 ? (
                      <input
                        type="number"
                        value={inputValues[rowIndex][colIndex]}
                        className="w-full p-1 border border-gray-300 rounded"
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                      />
                    ) : (
                      <span>{inputValues[rowIndex][colIndex]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th colSpan={7} className="border border-gray-300 px-4 py-2 bg-gray-200">FLUID OUTPUT</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-200">Time</th>
              {columnsOut.map((col, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2 bg-gray-200">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 px-4 py-2 bg-gray-200">{time}</td>
                {columnsOut.map((_, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-4 py-2">
                    {colIndex < 4 ? (
                      <input
                        type="number"
                        value={inputValuesOut[rowIndex][colIndex]}
                        className="w-full p-1 border border-gray-300 rounded"
                        onChange={(e) =>
                          handleInputChangeOut(rowIndex, colIndex, e.target.value)
                        }
                      />
                    ) : (
                      <span>{inputValuesOut[rowIndex][colIndex]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
        <AddEdit text="save" type="submit"/>
      </div>
    </form>
  );
}

export default AddFluid;
