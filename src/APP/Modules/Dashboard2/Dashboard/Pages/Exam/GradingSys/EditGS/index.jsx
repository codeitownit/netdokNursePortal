import React, { useState } from "react";
import useaxios from "../../../../../../Hooks/useAxios";
import { useParams } from "react-router-dom";
import grayPanel from "../../../../../../Components/Container/Container";
import BasicModal from "../../../../../../Components/Modals/BasicModal";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import TextInput2 from "../../../../../../Components/Inputs/TextInput2";
import { SelectInput, NumberInput } from "../../../../../../Components/Inputs";

import {
  Table,
  Tbody,
  Thead,
  Td,
  Tht,
  Tr,
} from "../../../../../../Components/Table";

function EditGradeSys({ gsData }) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectList, setSubjectsList] = useState([]);
  const [subjectId, setSubjectId] = useState();
  const [ranges, SetRanges] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [grade, setGrade] = useState("");
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("0");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsData = await useaxios().request({
          method: "GET",
          url: "subjects",
          auth: true,
          showLoader: true,
          showError: true,
        });

        setSubjectsList(subjectsData);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [gsData]);

  useEffect(() => {
    if (gsData) {
      setName(gsData.name || "");
      setSubject(gsData.subject || "");
      SetRanges(gsData.ranges || "");
    }
  }, [gsData]);

  const handleCreate = async () => {
    try {
      const data = await useaxios().request({
        method: "POST",
        url: "grading_system_subject",
        auth: true,
        showLoader: true,
        showError: true,
        body: {
          name,
          subject_id: parseInt(subjectId),
          ranges,
        },
      });

      //console.log("Data created:", data);
      navigate("/dashboard/listGrade");

      setName("");
      setSubject("");
      setSubjectId("");
      SetRanges([]);
    } catch (error) {
      console.error("Error creating gradelist entry:", error);
    }
  };

  //console.log(grade);

  function submitAddRange() {
    //console.log(grade, min, max);

    if (grade == "" || min == "" || max == "") return;
    SetRanges([...ranges, { grade, min, max }]);
    setGrade("");
    setMax("0");
    setMin("0");
    setOpenModal(false);
  }

  return (
    <div className={`${grayPanel()} w-full`}>
      <div className=" flex md:flex-row">
        <TextInput2
          label="Name"
          placeholder="Name"
          directInput={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
          stateInput={name}
          setStateInput={name}
        />

        <SelectInput
          label="Subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            const selectedSubject = subjectList.find(
              (subjectItem) => subjectItem.name === e.target.value
            );
            setSubjectId(selectedSubject?.id || "");
          }}
        >
          <option disabled={false} value="Select Subject">
            Select Subject
          </option>
          {subjectList.map((subjectItem, index) => {
            return (
              <option key={subjectItem.id} value={subjectItem.name}>
                {subjectItem.name}
              </option>
            );
          })}
        </SelectInput>
      </div>

      <div className=" flex justify-end w-full">
        <span
          onClick={() => setOpenModal(true)}
          className=" cursor-pointer active:opacity-50  bg-primary text-white font-bold p-2 m-4 rounded-md"
        >
          Add Range
        </span>
      </div>
      <Table>
        <Thead>
          <Tht txt="Grade" />
          <Tht txt="Min" />
          <Tht txt="Max" />
          <Tht txt="Actions" />
        </Thead>
        <Tbody>
          {ranges.map((range, index) => {
            return (
              <Tr key={index}>
                <Td name="Grade">{range.grade}</Td>
                <Td name="Min">{range.min}</Td>
                <Td name="Max">{range.max}</Td>
                <Td name="Actions">
                  <MdDelete className="text-red-700" />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <BasicModal showModal={openModal} setShowModal={setOpenModal}>
        <div>
          <div>
            <NumberInput
              label="Grade"
              directInput={true}
              required={false}
              stateInput={grade}
              setStateInput={setGrade}
              maxChar={854}
            />
            <NumberInput
              label="Min"
              directInput={true}
              required={false}
              stateInput={min}
              setStateInput={setMin}
            />
            <NumberInput
              label="Max"
              required={false}
              directInput={true}
              stateInput={max}
              setStateInput={setMax}
            />
          </div>
          <div className=" flex w-full justify-center">
            <span
              onClick={() => submitAddRange(true)}
              className=" cursor-pointer active:opacity-50  bg-primary text-white p-2 m-4 font-bold rounded-lg"
            >
              ADD
            </span>
          </div>
        </div>
      </BasicModal>
      <div className=" flex justify-end w-full">
        <span
          className=" cursor-pointer active:opacity-50  bg-primary text-white font-bold p-2 m-4 rounded-md"
          onClick={handleCreate}
        >
          Create
        </span>
      </div>
    </div>
  );
}

export default EditGradeSys;
