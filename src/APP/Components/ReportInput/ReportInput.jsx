import React from 'react'

function ReportInput() {
  return (
    <div className="flex m-2">
        <label htmlFor="schoolName" className="mr-2">SCHOOL NAME</label>
        <input 
            type="text" 
            id="schoolName" 
            className='border-2 border-black rounded-lg'
        />
    </div>
  )
}

export default ReportInput