import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import grayPanel from "../../../../../Components/Container/Container";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import useaxios from "../../../../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

function EditExam() {
  const { id } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    start_date: "",
    description: "",
    grading_status: true,
    subject: "",
    level: "",
    gradingSystem: "",
    // exam_grading_system_subject: [],
    // exam_student: [],
    // report_form: [],
  });

  const [subjectList, setSubjectList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [gradingList, setGradingList] = useState([]);

  const navigate = useNavigate();
  const request = useaxios();

  const fetchData = async (endpoint, stateSetter, params = {}) => {
    try {
      const response = await request({
        method: "GET",
        url: endpoint,
        params: { ...params, id },
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
    fetchData(`exam_id`, setExamData, setExamData, {
      pageNumber: 1,
      limitNumber: 1,
    });
    fetchData("subjects", setSubjectList);
    fetchData("streams", setLevelsList);
    fetchData("grading_system_subject", setGradingList);
  }, []);

  useEffect(() => {
    if (examData && Object.keys(examData).length > 0) {
      setExamData((prevData) => ({
        ...prevData,
        name: examData.name || "",
        start_date: examData.start_date || "",
        description: examData.description || "",
        grading_status: examData.grading_status || true,
        subject: examData.subject || "",
        level: examData.level || "",
        gradingSystem: examData.gradingSystem || "",
      }));
    }
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
        !examData.gradingSystem
      ) {
        //console.log(examData)
        alert("Please fill in all required fields.");
        return;
      }
      const response = await request({
        method: "PUT",
        url: "exams",
        params: { id },
        body: examData,
        auth: false,
        showLoader: false,
        showError: true,
      });

      if (response !== "error") {
        //console.log('Exam updated successfully!');
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
        // exam_grading_system_subject: [],
        // exam_student: [],
        // report_form: [],
      });
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  return (
    <div className={`${grayPanel()} w-full`}>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl"> Edit Exam</h1>
        </div>
        <div className="border-2 w-full border-gray-400 rounded-lg p-8 m-5">
          <div className="text-gray-600 font-bold flex-1">
            <div>
              <label className="block mb-2">Exam Name</label>
              <input
                type="text"
                placeholder="Exam Name"
                value={examData && examData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full h-10 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2">Start Date</label>
              <input
                type="text"
                placeholder="Start Date"
                value={examData && examData.start_date}
                onChange={(e) => handleChange("start_date", e.target.value)}
                className="w-full h-10 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                placeholder="Description"
                value={examData && examData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  checked={examData && examData.grading_status}
                  onChange={(e) =>
                    handleChange("grading_status", e.target.checked)
                  }
                />{" "}
                Open
              </label>
            </div>
          </div>

          <div className="flex justify-center text-gray-600 font-bold flex-1">
            <label className="block mb-2">Subject</label>
            <select
              value={examData && examData.subject}
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

            <label className="block mb-2">Level</label>
            <select
              value={examData && examData.level}
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

          <div>
            <label className="block mb-2">Grading System</label>
            <select
              value={examData && examData.gradingSystem}
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
        </div>

        <div className="flex justify-between p-3">
          <h1></h1>
          <AddEdit
            className="flex justify-end"
            text="Edit Exam"
            icon={<IoPersonAddOutline />}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default EditExam;
