import React from "react";
import BarChartComponent from "./sections/barchart";
import { outerDiv } from "./sections/styles";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import useaxios from "../../../../../Hooks/useAxios";

function StudentProfile({ student }) {

    const [students, setStudents] = useState("")
    const {id} = useParams();
    const request = useaxios();

    useEffect(() => {
        async function fetchStudent() {
          try {
            const res = await request({
              method: "GET",
              url: "student_id",
              params: {id},
              auth: false,
              showLoader: false,
            });
    
            if (res !== "error") {
              setStudents(res.data);
            }
          } catch (error) {
            console.error("Could not fetch members", error);
          }
        }
        fetchStudent();
      }, []);
    
    console.log(students);  

    const studentDetails = student || {
    name: "Bongani Masemola",
    id: "100",
    level: "Form 1",
    class: "4B",
    email: "bongani@school.com",
    admissionNumber: "2334",
    parentName: "Jack Masemola",
    parentNumber: "+254 128 504 749",
    emergencyContact: "+254 712 345 678",
    preferredHospital: "St. John Hospital",
    familyDoctor: "Dr. Sarah Johnson",
    familyDoctorContact: "+254 XXX XXX XXX",
    bloodType: "O+",
    grades: {
        Mathematics: 80,
        English: 14.6,
        Kiswahili: 0.44,
        Chemistry: 51.2,
        Biology: 59.7,
        Physics: 37.5,
        ComputerScience: 81.4,
        Geography: 21.5,
        History: 0,
        Agriculture: 100,
    },
    lastLocation: "Arrived on Campus 8:30AM",
    comments: [
        "Has been distracted in class lately.",
        "Friday 20th Feb, School trip",
        "Monday 17th Feb, was absent",
    ],
    imageUrl:
        "data:image/jpeg;base64,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",
    };
    

    const gradesData = Object.entries(studentDetails.grades).map(
    ([subject, grade]) => ({
        label: subject, value: grade,
    })
    );


    return (
    <div className={outerDiv}>
    <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl mb-4 md:mb-0">Student Profile</h1>
        <div className="search-container">
        {" "}
          {/* Add search bar component here */}
        </div>
    </div>
    <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            <div className="bg-white rounded p-2">
            <strong>Name:</strong> {students.name}
            </div>
            <div className="bg-white rounded p-2">
            <strong>ADM NO:</strong> {students.adm_no}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Class:</strong> {students && students.Renamedclass.name}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Gender:</strong> {students && students.gender.name}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Date of Birth:</strong> {students.dob}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Student Attendance:</strong>{" "}
            {}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Parent Name:</strong> {studentDetails.parentName}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Parent Contact:</strong> {studentDetails.parentNumber}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Emergency Contact:</strong>{" "}
            {studentDetails.emergencyContact}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Preferred Hospital:</strong>{" "}
            {studentDetails.preferredHospital}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Family Doctor:</strong> {studentDetails.familyDoctor}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Family Doctor Contact:</strong>{" "}
            {studentDetails.familyDoctorContact}
            </div>
            <div className="bg-white rounded p-2">
            <strong>Blood Type:</strong> {students && students.blood_group.name}
            </div>
        </div>
        <BarChartComponent data={gradesData} />
        </div>
        <div className="md:w-1/4 p-4">
        <img
            src={studentDetails.imageUrl}
            alt="Student"
            className="rounded-full w-24 h-24 mb-4 mx-auto md:mx-0"
        />
        <div className="bg-white rounded p-2">
            <strong>Last Location:</strong> {studentDetails.lastLocation}
        </div>
        <div className="bg-white rounded p-2 mt-4">
            <strong>Comments:</strong>
            <ul>
            {studentDetails.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
            ))}
            </ul>
        </div>
        </div>
    </div>
    </div>
);
}

export default StudentProfile;
