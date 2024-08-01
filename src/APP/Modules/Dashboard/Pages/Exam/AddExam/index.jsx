import React, { useEffect, useState } from "react";
import grayPanel from "../../../../../Components/Container/Container";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import CheckBoxInput2 from "../../../../../Components/Inputs/CheckBoxInput2";
import useaxios from "../../../../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import TextInput2 from "../../../../../Components/Inputs/TextInput2";
import { TextArea, SelectInput } from "../../../../../Components/Inputs";

function AddExam() {
  const [examData, setExamData] = useState({
    name: "",
    start_date: "",
    description: "",
    grading_status: true,
    subject: "",
    level: "",
    gradingSystem: "",
  });

  const [subjectList, setSubjectList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [gradingList, setGradingList] = useState([]);

  const navigate = useNavigate();
  const request = useaxios();

  const fetchData = async (endpoint, stateSetter) => {
    try {
      const response = await request({
        method: "GET",
        url: endpoint,
        auth: false,
        showLoader: false,
        showError: true,
      });

      if (!response || response.error) {
        throw new Error(`Error fetching data from ${endpoint}`);
      }

      if (typeof stateSetter === "function") {
        stateSetter(response.data);
      } else {
        console.error(`Error: stateSetter is not a function for ${endpoint}`);
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint} :`, error);
    }
  };

  useEffect(() => {
    fetchData("subjects", setSubjectList);
    fetchData("streams", setLevelsList);
    fetchData("grading_system_subject", setGradingList);
  }, []);

  const handleChange = (field, value) => {
    setExamData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !examData.name ||
        !examData.start_date ||
        !examData.description ||
        !examData.grading_status
      ) {
        alert("Please fill in all required fields.");
        return;
      }
      const response = await request({
        method: "POST",
        url: "exams",
        body: examData,
        auth: false,
        showLoader: false,
        showError: true,
      });

      //console.log('Exam Data:', examData);

      if (response !== "error") {
        //console.log('Exam added successfully!');
        navigate("/dashboard/exam");
      }

      setExamData({
        name: "",
        start_date: "",
        description: "",
        grading_status: true,
        subject: "",
        level: "",
        gradingSystem: "",
      });
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Error submitting exam. Please try again.");
    }
  };

  return (
    <div className={`${grayPanel()} w-full`}>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl"> Add Exam</h1>
        </div>
        <div className="border-2w-full border-gray-400 rounded-lg p-8 m-5">
          <div className="text-gray-600 font-bold flex-1">
            {/* Replace TextInput2 with regular input */}
            <label className="block mb-2">
              {/* label for styling */}Exam Name
            </label>
            <input
              type="text"
              placeholder="Exam Name"
              value={examData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full h-10 p-2 border border-gray-300 rounded-md"
            />

            {/* Replace TextInput2 with regular input */}
            <label className="block mb-2">Start Date</label>
            <input
              type="text"
              placeholder="Start Date"
              value={examData.start_date}
              onChange={(e) => handleChange("start_date", e.target.value)}
              className="w-full h-10 p-2 border border-gray-300 rounded-md"
            />

            {/* Replace TextArea with regular textarea */}
            <label className="block mb-2">Description</label>
            <textarea
              placeholder="Description"
              value={examData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />

            {/* Replace CheckBoxInput2 with regular input */}
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={examData.grading_status}
                onChange={(e) =>
                  handleChange("grading_status", e.target.checked)
                }
              />{" "}
              Open
            </label>
          </div>

          <div className="flex justify-center text-gray-600 font-bold flex-1">
            {/* Replace SelectInput with regular select */}
            <label className="block mb-2">Subject</label>
            <select
              value={examData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className="w-full h-10 p-2 border border-gray-300 rounded-md"
            >
              <option disabled={false} value="">
                Select Subject
              </option>
              {subjectList &&
                subjectList.map((subjectItem, index) => (
                  <option key={subjectItem.id} value={subjectItem.id}>
                    {subjectItem.name}
                  </option>
                ))}
            </select>

            {/* Replace SelectInput with regular select */}
            <label className="block mb-2">Level</label>
            <select
              value={examData.level}
              onChange={(e) => handleChange("level", e.target.value)}
              className="w-full h-10 p-2 border border-gray-300 rounded-md"
            >
              <option disabled={false} value="">
                Select Level
              </option>
              {levelsList &&
                levelsList.map((levelItem, index) => (
                  <option key={levelItem.id} value={levelItem.id}>
                    {levelItem.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Replace SelectInput with regular select */}
          <label className="block mb-2">Grading System</label>
          <select
            value={examData.gradingSystem}
            onChange={(e) => handleChange("gradingSystem", e.target.value)}
            className="w-full h-10 p-2 border border-gray-300 rounded-md"
          >
            <option disabled={false} value="">
              Select Grade System
            </option>
            {gradingList &&
              gradingList.map((gradingItem, index) => (
                <option key={gradingItem.id} value={gradingItem.id}>
                  {gradingItem.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex justify-between p-3">
          <h1></h1>
          {/* ... (other components) */}
          <AddEdit
            className="flex justify-end"
            text="Add Exam"
            icon={<IoPersonAddOutline />}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AddExam;
