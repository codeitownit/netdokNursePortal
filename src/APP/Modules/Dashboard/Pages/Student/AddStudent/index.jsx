import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import React from "react";
import { useState, useEffect } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  TextInput,
  ImageInput,
  SelectInput,
} from "../../../../../Components/Inputs";
import { headers, divStyle, outerDiv } from "../sections/styles";
import AddParent from "../sections/addparent";
import SelectParent from "../sections/selectparent";
import Modal from "../../../../../Components/Modals/BasicModal";
import useaxios from "../../../../../Hooks/useAxios";
import {
  Table,
  Tbody,
  Thead,
  Td,
  Tht,
  Tr,
  Tt,
} from "../../../../../Components/Table";

const genders = { "1": "Male", "2": "Female" };

function AddStudent({ text = "Add Student", header = "Add Student" }) {
  const request = useaxios();
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);

  const [addParentModal, setAddParentModal] = useState(false);
  const [selectParentModal, setSelectParentModal] = useState(false);
  const [studentResponse, setStudentResponse] = useState("");
  const [parentResponse, setParentResponse] = useState("");
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [bloodGroup, setBloodGroup] = useState([]);

  const [allParents, setAllParents] = useState([]);
  const [singleParent, setSingleParent] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [student, setStudent] = useState({
    studentPic: "",
    studentName: "",
    studentGender: "",
    created: "",
    level: "",
    dob: "",
    admissionNumber: "",
    name0fRecord: "",
    description: "",
    allergic: "",
    emergencyName: "",
    emergencyNumber: "",
    hospital: "",
    bloodGroup: "",
    bloodGroupDescription: "",
    parentName: "",
    parentEmail: "",
    parentGender: "",
    parentPhone: "",
    parentAddress: "",
  });

  console.log(student);
  console.log(singleParent);
  console.log(allParents);


  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await request({
          method: "GET",
          url: "member",
          auth: false,
          showLoader: false,
        });

        if (res !== "error") {
          setMembers(res.data);
        }
      } catch (error) {
        console.error("Could not fetch members", error);
      }
    }
    fetchMembers();
  }, []);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await request({
          method: "GET",
          url: "classes",
          auth: false,
          showLoader: false,
        });

        if (res !== "error") {
          setClasses(res.data);
        }
      } catch (error) {
        console.error("Could not fetch classes", error);
      }
    }
    fetchClasses();
  }, []);

  useEffect(() => {
    async function fetchBloodGroup() {
      try {
        const res = await request({
          method: "GET",
          url: "Blood_group",
          auth: false,
          showLoader: false,
        });

        if (res !== "error") {
          setBloodGroup(res);
        }
      } catch (error) {
        console.error("Could not fetch classes", error);
      }
    }
    fetchBloodGroup();
  }, []);  

  function handleClick() {
    const parentFormData = allParents.map((singleParent) => {
      return {
        name: singleParent.name,
        gender_id: singleParent.gender,
        email: singleParent.email,
        phone: singleParent.phone,
        password: singleParent.password,
        address: singleParent.address,
      };
    });

    const formData = {
      name: student.studentName.toLowerCase(),
      dob: student.dob,
      gender_id: parseInt(student.studentGender),
      class_id: parseInt(student.level),
      created_by_member_id: parseInt(student.created),
      adm_no: student.admissionNumber,
      blood_group_id: parseInt(student.bloodGroup),
    };

    console.log(formData);

    async function postStudent() {
      try {
        const res = await request({
          method: "POST",
          url: "students",
          body: formData,
          auth: false,
          showLoader: false,
        });

        if (res !== "error") {
          setStudentResponse(res);
          console.log(`Student response: ${res}`);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    async function postParent() {
      try {
        const res = await request({
          method: "POST",
          url: "parents",
          body: parentFormData,
          auth: false,
          showLoader: false,
        });

        if (res !== "error") {
          setParentResponse(res);
          console.log(`Parent response: ${res}`);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    postStudent();
    // postParent();
  }

  return (
    <div className={outerDiv}>
      <div className=" rounded-3xl mb-3">
        <div className=" flex flex-row justify-between items-center">
          <h1 className={headers}>{header}</h1>
          <AddEdit
            text={text}
            icon={<IoPersonAddOutline />}
            onClick={(e) => handleClick(e)}
          />
        </div>
        <div className="pb-2.5">
          <ImageInput
            setFile={(value) => setStudent({ ...student, studentPic: value })}
            src={src}
            setSrc={setSrc}
            rounded="true"
          />
        </div>
        <div className={divStyle}>
          <TextInput
            label="Full name"
            transform="false"
            directInput={true}
            stateInput={student.studentName}
            setStateInput={(value) =>
              setStudent({ ...student, studentName: value })
            }
          />
          <SelectInput
            label="Gender"
            directInput={true}
            stateInput={student.studentGender}
            setStateInput={(value) =>
              setStudent({ ...student, studentGender: value })
            }
          >
            <option disabled hidden></option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </SelectInput>
          <SelectInput
            label="Class"
            directInput={true}
            stateInput={student.level}
            setStateInput={(value) => setStudent({ ...student, level: value })}
          >
            <option disabled hidden></option>
            {classes.map((clss) => (
              <option key={clss.id} value={clss.id}>
                {clss.name}
              </option>
            ))}
          </SelectInput>
        </div>
        <div className={divStyle}>
          <TextInput
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            directInput={true}
            stateInput={student.dob}
            setStateInput={(value) => setStudent({ ...student, dob: value })}
          />
          <TextInput
            label="Admission number"
            directInput={true}
            stateInput={student.admissionNumber}
            setStateInput={(value) =>
              setStudent({ ...student, admissionNumber: value })
            }
          />
          <SelectInput
            label="Created by"
            directInput={true}
            stateInput={student.created}
            setStateInput={(value) =>
              setStudent({ ...student, created: value })
            }
          >
            <option disabled hidden></option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </SelectInput>
        </div>
        <h1 className={headers}>Medical Records</h1>
        <div className={divStyle}>
          <TextInput
            label="Name of record"
            directInput={true}
            stateInput={student.name0fRecord}
            setStateInput={(value) =>
              setStudent({ ...student, name0fRecord: value })
            }
          />
          <TextInput
            label="Description"
            transform="false"
            directInput={true}
            stateInput={student.description}
            setStateInput={(value) =>
              setStudent({ ...student, description: value })
            }
          />
          <SelectInput
            label="Allergic"
            directInput={true}
            stateInput={student.allergic}
            setStateInput={(value) =>
              setStudent({ ...student, allergic: value })
            }
          >
            <option disabled hidden></option>
            <option>True</option>
            <option>False</option>
          </SelectInput>
          <TextInput
            label="Emergency contact name"
            directInput={true}
            stateInput={student.emergencyName}
            setStateInput={(value) =>
              setStudent({ ...student, emergencyName: value })
            }
          />
        </div>
        <div className={divStyle}>
          <TextInput
            label="Emergency contact number"
            directInput={true}
            stateInput={student.emergencyNumber}
            setStateInput={(value) =>
              setStudent({ ...student, emergencyNumber: value })
            }
          />
          <TextInput
            label="Preferred hospital"
            directInput={true}
            stateInput={student.hospital}
            setStateInput={(value) =>
              setStudent({ ...student, hospital: value })
            }
          />
          <SelectInput
            label="Blood group"
            directInput={true}
            stateInput={student.bloodGroup}
            setStateInput={(value) =>
              setStudent({ ...student, bloodGroup: value })
            }
          >
            <option disabled hidden></option>
            {bloodGroup.map((blood) => (
              <option key={blood.id} value={blood.id}>
                {blood.name}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            label="Blood group description"
            directInput={true}
            stateInput={student.bloodGroupDescription}
            setStateInput={(value) =>
              setStudent({ ...student, bloodGroupDescription: value })
            }
          >
            <option disabled hidden></option>
            <option>Positive</option>
            <option>Negative</option>
          </SelectInput>
        </div>
        <div className=" mt-7 flex justify-between">
          <AddEdit text="Add Parent" onClick={() => setAddParentModal(true)} />
          <AddEdit
            text="Select Parent"
            onClick={() => setSelectParentModal(true)}
          />
        </div>
        <div>
          <Table mt={1}>
            <Thead>
              <Tht txt="Parent Name" />
              <Tht txt="Email" />
              <Tht txt="Gender" />
              <Tht txt="Phone" />
              <Tht txt="Address" />
            </Thead>
            <Tbody>
              {allParents.map((singleParent, i) => {
                let gender;
                if (singleParent.gender === 1){
                  gender = "Male"
                } else{
                  gender = "Female"
                }
                return (
                  <Tr key={i}>
                    <Td>
                      <Tt txt={singleParent.name} />
                    </Td>
                    <Td>
                      <Tt txt={singleParent.email} />
                    </Td>
                    <Td>
                      <Tt txt={gender} />
                    </Td>
                    <Td>
                      <Tt txt={singleParent.phone} />
                    </Td>
                    <Td>
                      <Tt txt={singleParent.address} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      </div>
      <Modal showModal={addParentModal} setShowModal={setAddParentModal}>
        <AddParent
          singleParent={singleParent}
          setSingleParent={setSingleParent}
          allParents={allParents}
          setAllParents={setAllParents}
          setShowModal={setAddParentModal}
        />
      </Modal>
      <Modal showModal={selectParentModal} setShowModal={setSelectParentModal}>
        <SelectParent
          singleParent={singleParent}
          setSingleParent={setSingleParent}
          allParents={allParents}
          setAllParents={setAllParents}
          setShowModal={setSelectParentModal}
        />
      </Modal>
    </div>
  );
}

export default AddStudent;
