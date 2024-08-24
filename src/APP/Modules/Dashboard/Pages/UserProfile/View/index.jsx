import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style"
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import TextInput from "../../../../../Components/Inputs/TextInput";
import { TextArea } from "../../../../../Components/Inputs";
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prop-types
function ViewProfile({ text = "Edit Profile" }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [docDocumentId, setDocDocumentId] = useState('')
 
  const doctorId = localStorage.getItem("primeDoctorUserId");

  // const handleDateChange = (event) => {
  //   setAdmissionDate(event.target.value);
  // };

  const navigate = useNavigate();
  const request = useaxios();
  

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await request({
          method: "GET",
          url: `primeDoctor/userinfo/${doctorId}`,
          auth: false,
        });

        // Check if the response is not an error
        if (res !== "error") {
          console.log(res)

            res?.data.forEach((item)=>{
          setFirstName(item?.FirstName)
          setLastName(item?.lastName)
          setEmail(item?.email)
          setGender(item?.gender||item?.Gender)
          setDob(item?.dob)
          setBio(item?.Biography)
          setDocDocumentId(item?.documentId)
            })
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
      FirstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      Biography: bio,
      dob: dob,
    };

    console.log(formData);

    const res = await request({
      method: "PUT",
      url: `primeDoctor/${docDocumentId}`,
      data: formData,
      auth: false,
    });

    console.log(res);

    if (res !== "error") {
      console.log(formData)
      navigate(`/dashboard`);
      return;
    }
  }
  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Edit Profile</h1>
            <AddEdit text={text} type="submit" />
          </div>
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextInput
        label="First Name"
        directInput={true}
        required={false}
        stateInput={firstName}
        setStateInput={setFirstName}
      />
      <TextInput
        label="Last Name"
        directInput={true}
        required={false}
        stateInput={lastName}
        setStateInput={setLastName}
      />
      <TextInput
        label="Email"
        directInput={true}
        disabled={false}
        required={false}
        stateInput={email}
        setStateInput={setEmail}
      />
      <TextInput
        label="Gender"
        directInput={true}
        required={false}
        stateInput={gender}
        setStateInput={setGender}
      />
      <TextInput
        label="Date of Birth"
        directInput={true}
        required={false}
        stateInput={dob}
        setStateInput={setDob}
      />
      </div>
      <TextArea
        label="Bio"
        directInput={true}
        required={false}
        stateInput={bio}
        setStateInput={setBio}
      />
      
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewProfile;
