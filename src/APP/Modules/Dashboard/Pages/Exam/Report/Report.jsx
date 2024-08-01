import React from 'react';
import grayPanel from '../../../../../Components/Container/Container';

const subjects = ['Math', 'Science', 'English', 'History', 'Art', 'Computer', 'French', 'Physics',];

function Report() {
  return (
    <div className={`${grayPanel()} w-full flex justify-center`}>
    <div className='min-h-screen flex items-center justify-center p-8 rounded-lg bg-yellow-500 w-1/2'>
      <div className='w-full max-w-2xl'>
        <h1 className='font-bold text-3xl text-center mb-8'>STUDENT REPORT</h1>

        <div className='border-2 border-black p-5 rounded-lg mb-8'>
          <div className="flex flex-col md:flex-row md:gap-x-10 mb-4">
            <label htmlFor="studentName" className="mr-2 font-semibold">STUDENT NAME</label>
            <input type="text" id="studentName" className='border-2 border-black rounded-lg'/>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <label htmlFor="schoolName" className="mr-2 font-semibold">SCHOOL NAME</label>
            <input type="text" id="schoolName" className='border-2 border-black rounded-lg'/>
          </div>

          <div className="flex flex-col md:flex-row md:gap-x-10 mb-4">
            <label htmlFor="grade" className="mr-2 font-semibold">GRADE</label>
            <input type="text" id="grade" className='border-2 border-black rounded-lg'/>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <label htmlFor="semester" className="mr-2 font-semibold">SEMESTER</label>
            <input type="text" id="semester" className='border-2 border-black rounded-lg'/>
          </div>
        </div>

        <div className='border-2 border-black p-5 rounded-lg mb-8'>
          {subjects.map((subject, index) => (
            <div key={index} className="flex flex-col md:flex-row mb-4">
              <label className="mr-2 font-semibold">{subject}</label>
              <input type="text" id={`subject_${index}`} className='border-2 border-black rounded-lg'/>
            </div>
          ))}
        </div>

        <div className='border-2 border-black p-8 rounded-lg mb-8'>
          <h4 className='font-bold mb-3'>GRADING SCALE</h4>
          <p>A+ = 96 - 100</p>
          <p>A- = 91 - 95</p>
          <p>B+ = 86 - 90</p>
          <p>B = 81 - 85</p>
          <p>C = 76 - 80</p>
          <p>D = 70 - 75</p>
          <p>Fail = 69 and below</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Report;
