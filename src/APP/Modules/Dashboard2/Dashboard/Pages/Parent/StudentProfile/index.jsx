import React from 'react';
import grayPanel from '../../../../../Components/Container/Container';
import BarChart from '../section/component/barchart';

function StudentProfile({ student }) {
  const studentDetails = student || {
    name: 'Bongani Masemola',
    id: '100',
    level: 'Form 1',
    class: '4B',
    email: 'bongani@school.com',
    admissionNumber: '2334',
    emergencyContact: '+254 712 345 678',
    preferredHospital: 'St. John Hospital',
    familyDoctor: 'Dr. Sarah Johnson',
    familyDoctorContact: '+254 XXX XXX XXX', 
    bloodType: 'O+', 
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
      Agriculture: 100
    },
    lastLocation: 'Arrived on Campus 8:30AM',
    comments: [
      'Has been distracted in class lately.',
      'Friday 20th Feb, School trip',
      'Monday 17th Feb, was absent'
    ],
    imageUrl: '/' // placeholder image path for now 
  };

  const gradesData = Object.entries(studentDetails.grades).map(([subject, grade]) => ({
    label: subject, value: grade
  }));

  return (
    <div className={grayPanel()}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl mb-4 md:mb-0">Student Profile</h1>
        <div className="search-container"> {/* Add search bar component here */}</div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded p-2"><strong>Name:</strong> {studentDetails.name}</div>
            <div className="bg-white rounded p-2"><strong>ID:</strong> {studentDetails.id}</div>
            <div className="bg-white rounded p-2"><strong>Level:</strong> {studentDetails.level}</div>
            <div className="bg-white rounded p-2"><strong>Class:</strong> {studentDetails.class}</div>
            <div className="bg-white rounded p-2"><strong>Email:</strong> {studentDetails.email}</div>
            <div className="bg-white rounded p-2"><strong>Admission Number:</strong> {studentDetails.admissionNumber}</div>
            <div className="bg-white rounded p-2"><strong>Emergency Contact:</strong> {studentDetails.emergencyContact}</div>
            <div className="bg-white rounded p-2"><strong>Preferred Hospital:</strong> {studentDetails.preferredHospital}</div>
            <div className="bg-white rounded p-2"><strong>Family Doctor:</strong> {studentDetails.familyDoctor}</div>
            <div className="bg-white rounded p-2"><strong>Family Doctor Contact:</strong> {studentDetails.familyDoctorContact}</div>
            <div className="bg-white rounded p-2"><strong>Blood Type:</strong> {studentDetails.bloodType}</div>
          </div>
          <BarChart data={gradesData} />
        </div>
        <div className="md:w-1/4 p-4">
          <img src={studentDetails.imageUrl} alt="Student" className="rounded-full w-24 h-24 mb-4 mx-auto md:mx-0" />
          <div className="bg-white rounded p-2"><strong>Last Location:</strong> {studentDetails.lastLocation}</div>
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
