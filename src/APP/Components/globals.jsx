const hospitalId = localStorage.getItem("universalHospitalId")
const doctorEmail = localStorage.getItem("primeDoctorUserEmail")
const doctorId = localStorage.getItem("primeDoctorUserId");
const pName = localStorage.getItem("universalPatientName");
const patientId = localStorage.getItem("universalPatientId");
const doctorName = localStorage.getItem("universalDoctorName");
const doctorPhone = localStorage.getItem("universalDoctorPhone");
const pWeight = localStorage.getItem("universalPatientWeight");
const pDOB = localStorage.getItem("universalPatientDOB");

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  };

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${minutesStr} ${ampm}`;
  }

export {hospitalId, doctorEmail, doctorId, pName, patientId, doctorName, doctorPhone, pWeight, pDOB, getCurrentDate, formatTime}