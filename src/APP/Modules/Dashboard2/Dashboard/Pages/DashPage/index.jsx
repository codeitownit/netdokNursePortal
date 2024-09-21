import { headers } from "./sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputReadonly from "../../../../../Components/Inputs/InputReadonly";
// import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv, divStyle } from "./sections/style";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import DropdownBtnJournals from "../../../../../Components/Buttons/DropdownJournals";
import { TextArea } from "../../../../../Components/Inputs";
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
// import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions2(props) {
  const theme2 = useTheme();
  const { count2, page2, rowsPerPage2, onPageChange2 } = props;
  


  const handleFirstPageButtonClick2 = (event) => {
    onPageChange2(event, 0);
  };

  const handleBackButtonClick2 = (event) => {
    onPageChange2(event, page2 - 1);
  };

  const handleNextButtonClick2 = (event) => {
    onPageChange2(event, page2 + 1);
  };

  const handleLastPageButtonClick2 = (event) => {
    onPageChange2(event, Math.max(0, Math.ceil(count2 / rowsPerPage2) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick2}
        disabled={page2 === 0}
        aria-label="first page"
      >
        {theme2.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick2}
        disabled={page2=== 0}
        aria-label="previous page"
      >
        {theme2.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick2}
        disabled={page2 >= Math.ceil(count2 / rowsPerPage2) - 1}
        aria-label="next page"
      >
        {theme2.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick2}
        disabled={page2 >= Math.ceil(count2 / rowsPerPage2) - 1}
        aria-label="last page"
      >
        {theme2.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function DashPage2() {
  const [patientData, setPatientData] = useState([]);
  const [data, setData] = useState([]);
  const [medData, setMedData] = useState([]);
  const [currentMed, setCurrentMed] = useState([]);
  const [d, setD] = useState([]);
  const [prevC, setprevC] = useState([]);
  const [diagnosisData, setDiagnosisData] = useState([]);
  const patientName = localStorage.getItem("universalPatientName")
  const pId = localStorage.getItem("universalPatientId")
  const [pageOngoing, setPageOngoing] = useState(0);
  const [rowsPerPageOngoing, setRowsPerPageOngoing] = useState(5);
  const [pageContact, setPageContact] = useState(0);
  const [pageDiagnosis, setPageDiagnosis] = useState(0);
  const [rowsPerPageContact, setRowsPerPageContact] = useState(5);
  const [rowsPerPageDiagnosis, setRowsPerPageDiagnosis] = useState(5);


  // Avoid a layout jump when reaching the last page with empty rows.
  
    const emptyRowsOngoing =
    pageOngoing > 0 ? Math.max(0, (1 + pageOngoing) * rowsPerPageOngoing - currentMed.length) : 0;
  const emptyRowsContact =
    pageContact > 0 ? Math.max(0, (1 + pageContact) * rowsPerPageContact - prevC.length) : 0;
  const emptyRowsDiagnosis =
    pageDiagnosis > 0 ? Math.max(0, (1 + pageDiagnosis) * rowsPerPageDiagnosis - prevC.length) : 0;

  // Separate change handlers for Ongoing Treatment table
  const handleChangePageOngoing = (event, newPage) => {
    setPageOngoing(newPage);
  };
  const handleChangeRowsPerPageOngoing = (event) => {
    setRowsPerPageOngoing(parseInt(event.target.value, 10));
    setPageOngoing(0);
  };

  // Separate change handlers for Previous Contact table
  const handleChangePageContact = (event, newPage) => {
    setPageContact(newPage);
  };
  const handleChangePageDiagnosis = (event, newPage) => {
    setPageDiagnosis(newPage);
  };
  const handleChangeRowsPerPageContact = (event) => {
    setRowsPerPageContact(parseInt(event.target.value, 10));
    setPageContact(0);
  };

  const handleChangeRowsPerPageDiagnosis = (event) => {
    setRowsPerPageDiagnosis(parseInt(event.target.value, 10));
    setPageDiagnosis(0);
  };

  const navigate = useNavigate();
  const patientId = localStorage.getItem("universalPatientId")


  function viewJournal(type, id) {
    console.log('clicked')
    if(type === "Doctor"){
      navigate(`/viewPatient/${patientId}/contact/patient`)
    } else if(type === "nurseMidwives"){
      navigate(`/viewPatient/${patientId}/contact/nurse/${id}`)
    } else if(type === "nurseMidwivesOperation"){
      navigate(`/viewPatient/${patientId}/contact/nurseOperation/${id}`)
    } else if(type === "nurseMidwivesProgress"){
      navigate(`/viewPatient/${patientId}/contact/nurseProgress/${id}`)
    } else if(type === "nurseMidwivesTelephone"){
      navigate(`/viewPatient/${patientId}/contact/nurseTelephone/${id}`)
    }  else if(type === "physiotherapy"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapy/${id}`)
    } else if(type === "physiotherapyConsultation"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapyConsultation/${id}`)
    }else if(type === "physiotherapyTelephone"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapyTelephone/${id}`)
    } else if(type === "physiotherapyProgress"){
      navigate(`/viewPatient/${patientId}/contact/physiotherapyProgress/${id}`)
    } else if(type === "occupationalTherapy"){
      navigate(`/viewPatient/${patientId}/contact/occupational/${id}`)
    } else if(type === "occupationalTherapyProgress"){
      navigate(`/viewPatient/${patientId}/contact/occupationalProgress/${id}`)
    } else if(type === "occupationalTherapyTelephone"){
      navigate(`/viewPatient/${patientId}/contact/occupationalTelephone/${id}`)
    } else if(type === "psychology"){
      navigate(`/viewPatient/${patientId}/contact/psychology/${id}`)
    } else if(type === "psychologyTelephone"){
      navigate(`/viewPatient/${patientId}/contact/psychologyTelephone/${id}`)
    } else if(type === "psychologyProgress"){
      navigate(`/viewPatient/${patientId}/contact/psychologyProgress/${id}`)
    }else if(type === "psychologyConsultation"){
      navigate(`/viewPatient/${patientId}/contact/psychologyConsultation/${id}`)
    } else if(type === "pediatric-growth"){
      navigate(`/viewPatient/${patientId}/contact/pediatric/${id}`)
    } else if(type === "pediatric-growthTelephone"){
      navigate(`/viewPatient/${patientId}/contact/pediatricTelephone/${id}`)
    } else if(type === "pediatric-growthProgress"){
      navigate(`/viewPatient/${patientId}/contact/pediatricProgress/${id}`)
    }  else if(type === "discharge"){
      navigate(`/viewPatient/${patientId}/contact/discharge/${id}`)
    } else if(type === "progress"){
      navigate(`/viewPatient/${patientId}/contact/progress/${id}`)
    } else if(type === "telephone"){
      navigate(`/viewPatient/${patientId}/contact/telephone/${id}`)
    } else if(type === "operation"){
      navigate(`/viewPatient/${patientId}/contact/operation/${id}`)
    } else if(type === "patient"){
      navigate(`/viewPatient/${patientId}/contact/patient/${id}`)
    } else if(type === "admission"){
      navigate(`/viewPatient/${patientId}/contact/admission/${id}`)
    }
  }

  const request = useaxios();
  const documentId = localStorage.getItem('universalPatientDocumentId')
  const admDate = localStorage.getItem("universalPatientAdmissionDate")
  let su = [];
  let medicineList = [];
  let diag = [];


  const fetchData = async () => {
    
    try {
      const res = await request({
        method: "GET",
        url: `conditions/primeConditions/${documentId}`,
        body: {},
        auth: false,
      });
      const res2 = await request({
        method: "GET",
        url: `userProfile/orderBy/uid/${pId}`,
        body: {},
        auth: false,
        showLoader: false,
      });
      const res3 = await request({
        method: "GET",
        url: `patientJournal`,
        body: {},
        auth: false,
        showLoader: false,
      });
      const res4 = await request({
        method: "GET",
        url: `prescriptions/prescriptionsWhere/userUid/${pId}`,
        body: {},
        auth: false,
        showLoader: false,
      });
      const res5 = await request({
        method: "GET",
        url: `diagnosis/diagnosisWhere/patient/${pId}`,
        body: {},
        auth: false,
        showLoader: false,
      });
      // Check if the response is not an error
      if (res !== "error" ) {
        console.log(res?.data);
        setPatientData(res?.data || []);  
        localStorage.setItem("universalPatientAge", res?.data.userAge)

      }
     
      if (res3 !== "error") {
        console.log("res3 data:", res3?.data);
        setData(Array.isArray(res3?.data) ? res3?.data : []);
      }
      if (res4 !== "error") {
        console.log("res4 data:", res4?.data);
        setMedData(Array.isArray(res4?.data) ? res4?.data : []);
      }
      if (res5 !== "error") {
        console.log("res5 data:", res5?.data);
        setDiagnosisData(Array.isArray(res5?.data) ? res5?.data : []);
      }
      
      if (res2 !== "error") {
        console.log(res2);
        res2?.data.map((snap)=>{
          console.log(snap);
          localStorage.setItem("universalPatientWeight", snap?.Weight)
          localStorage.setItem("universalPatientDOB", snap?.DOB)
          localStorage.setItem("universalPatientGender", snap?.gender)
          localStorage.setItem("universalPatientAge", snap?.age)

        })
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //  async function contacts(){
  //   console.log(su)
  //   }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      data.map((doc, index) => {
        let s;
        if (doc.type.includes("nurseMidwives")) {
          s = "Nurse";
        } else if (doc.type.includes("physiotherapy")) {
          s = "Physiotherapist";
        } else if (doc.type.includes("occupationalTherapy")) {
          s = "Occupational Therapist";
        } else if (doc.type.includes("psychology")) {
          s = "Psychologist";
        } else if (doc.type.includes("pediatric")) {
          s = "Pediatrician";
        } else {
          s = "Doctor";
        }
        su.push({ date: doc?.date, specialist: s, progressDiagnosis: doc?.progressDiagnosis, documentId: doc?.documentId, type: doc?.type });
      });

      setprevC(su);
    } else {
      setprevC([]); // Handle empty medData
    }
  }, [data]);
  useEffect(() => {
    if (Array.isArray(medData) && medData.length > 0) {
      medData.map((doc, index) => {
        if (!doc?.medStatus || doc?.medStatus === "current") {
          medicineList.push({ date: doc?.date, medicineName: doc?.medName, dose: doc?.medDose, docId: doc?.documentId });
        }
      });
  
      setCurrentMed(medicineList);
    } else {
      setCurrentMed([]); // Handle empty medData
    }
  }, [medData]);
  useEffect(() => {
    if (Array.isArray(diagnosisData) && diagnosisData.length > 0) {
      diagnosisData.map((doc, index) => {
          diag.push({ date: doc?.date, diagnosis: doc?.lastDiagnosis });
      });
  
      setD(diag);
    } else {
      setCurrentMed([]); // Handle empty medData
    }
  }, [medData]);
  
  const dropdownItems = [
    { label: "Add New Admission Journal", onClick: () => navigate(`/viewPatient/${pId}/add-admission-journal`) },
    { label: "Add Telephone Journal", onClick: () => navigate(`/viewPatient/${pId}/add-telephone-journal`) },
    { label: "Add Progress Journal", onClick: () => navigate(`/viewPatient/${pId}/add-progress-journal`) },
    { label: "Add Operation Journal", onClick: () => navigate(`/viewPatient/${pId}/add-operation-journal`) }
  ];
  const correspondenceItems = [
    { label: "Add Correspondence", onClick: () => navigate(`/viewPatient/${pId}/correspondence`) },
    { label: "Add Medical Leave Certificate", onClick: () => navigate(`/viewPatient/${pId}/medLeave`) },
    // { label: "Add Medical Fitness Certificate", onClick: () => navigate(`/viewPatient/${pId}/fitness`) },
    { label: "Add Medical Certificate Life Birth", onClick: () => navigate(`/viewPatient/${pId}/liveBirth`) },
    // { label: "Add Death Certificate", onClick: () => navigate(`/viewPatient/${pId}/deathCertificate`) },
    { label: "View Correspondence", onClick: () => navigate(`/viewPatient/${pId}/correspondence/list`) }
  ];
  return (
    // <div className={grayPanel()}>
      <div className="mb-20">
        <form className={outerDiv}>
          <div className=" flex justify-center p-0 m-0">
            <h1 className="text-xl text-secondary font-bold text-center">View Patient Information</h1>
          </div>
          <div className={divStyle}>
          <div className="px-80 mt-0 pt-0 bg-slate-100 rounded-md">
          <div className="pt-0 flex flex-row justify-center my-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <DropdownBtnJournals
      txt="Nurse Journals"
      dropdownItems={dropdownItems}
    />
          <AddEdit text="Fluid Chart" 
          onClick={() =>navigate(`/viewPatient/${pId}/fluidChart`)}
          />
          <AddEdit text="Vital Parameters" 
          onClick={() =>navigate(`/viewPatient/${pId}/vitals`)}
          />
          <AddEdit text="Discharge Journal"
          onClick={() =>navigate(`/viewPatient/${pId}/discharge`)}
          />
          <AddEdit text="Admission Treatment Module"
          onClick={() =>navigate(`/viewPatient/${pId}/admissionTreatment`)}
            />
            <DropdownBtnJournals
      txt="Correspondence"
      dropdownItems={correspondenceItems}
    />
          </div>
          </div>
          <div className="flex">
    <div className="flex-initial w-1/2 px-1">
          <Card sx={{ maxWidth: 9115 }} className="flex justify-center items-center my-10">
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div" className="text-center">
          Lizard
        </Typography> */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2">
      <TextInputReadonly
          label="Gender"
          directInput={true}
          required={false}
          stateInput={patientData.userGender}
        />
        <TextInputReadonly
          label="Date of Birth"
          directInput={true}
          required={false}
          stateInput={localStorage.getItem("universalPatientDOB")}
        />
      <TextInputReadonly
          label="Weight"
          directInput={true}
          required={false}
          stateInput={patientData.userWeight}
        />
    <TextInputReadonly
        label="Condition"
        directInput={true}
        required={false}
        stateInput={patientData.condition}
      />
      <TextInputReadonly
        label="Allergies"
        directInput={true}
        required={false}
        stateInput={"none"}
      />
      <TextInputReadonly
        label="Date of Admission"
        directInput={true}
        required={false}
        stateInput={admDate}
      />
      </div>
      </CardContent>
    </Card>
    </div>
    <div className="flex-initial w-1/2 px-1">
    <Card sx={{ maxWidth: 9115 }} className="flex justify-center items-center my-10">
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div" className="text-center">
          Lizard
        </Typography> */}
        <div className="flex flex-row">
          <div className="w-1/2">
          <h3 className="font-bold text-center text-lg my-4">Brief Summary</h3>
          <p>{patientData.description}</p>
          </div>
          <div className="w-1/2">
            <h3 className="font-bold text-center text-lg my-4">Diagnosis</h3>
          <p>{patientData.diagnosis}</p>
          </div>
            </div>
      </CardContent>
    </Card>
    </div>
    </div>
    <div className="flex justify-center"><h5>Diagnosis</h5></div>
        <Card sx={{ maxWidth: 905 }} className="">
          <CardContent>
            <Table sx={{ minWidth: 60 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Diagnosis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPageDiagnosis > 0
                  ? d.slice(pageDiagnosis * rowsPerPageDiagnosis, pageDiagnosis * rowsPerPageDiagnosis + rowsPerPageDiagnosis)
                  : d
                ).map((row) => (
                  <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.diagnosis}</TableCell>
                  </TableRow>
                ))}
                {emptyRowsDiagnosis > 0 && (
                  <TableRow style={{ height: 53 * emptyRowsDiagnosis }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={d.length}
                    rowsPerPage={rowsPerPageDiagnosis}
                    page={pageDiagnosis}
                    onPageChange={handleChangePageDiagnosis}
                    onRowsPerPageChange={handleChangeRowsPerPageDiagnosis}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
    <div className="flex">
    <div className="flex-initial w-1/2 px-1">
    <div className="flex justify-center">
    <h5>Ongoing Treatment</h5></div>
    <Card sx={{ maxWidth: 905 }} className="">
          <CardContent>
            <Table sx={{ minWidth: 60 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell>Dose</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPageOngoing > 0
                  ? currentMed.slice(pageOngoing * rowsPerPageOngoing, pageOngoing * rowsPerPageOngoing + rowsPerPageOngoing)
                  : currentMed
                ).map((row) => (
                  <TableRow key={row.medicineName} 
                  // onClick={()=>navigate(`/viewPatient/${patientId}/viewMed/${row.docId}`)}
                  >
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.medicineName}</TableCell>
                    <TableCell>{row.dose}</TableCell>
                  </TableRow>
                ))}
                {emptyRowsOngoing > 0 && (
                  <TableRow style={{ height: 53 * emptyRowsOngoing }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={currentMed.length}
                    rowsPerPage={rowsPerPageOngoing}
                    page={pageOngoing}
                    onPageChange={handleChangePageOngoing}
                    onRowsPerPageChange={handleChangeRowsPerPageOngoing}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
        </div>
        {/* Previous Contact Table */}
        <div className="flex-initial w-1/2 px-1">
        <div className="flex justify-center">
        <h5>Previous Contact</h5></div>
        <Card sx={{ maxWidth: 905 }} className="">
          <CardContent>
            <Table sx={{ minWidth: 60 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Diagnosis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPageContact > 0
                  ? prevC.slice(pageContact * rowsPerPageContact, pageContact * rowsPerPageContact + rowsPerPageContact)
                  : prevC
                ).map((row) => (
                  <TableRow key={row.date} onClick={()=>viewJournal(row.type, row.documentId)}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.specialist}</TableCell>
                    <TableCell>{row.progressDiagnosis}</TableCell>
                  </TableRow>
                ))}
                {emptyRowsContact > 0 && (
                  <TableRow style={{ height: 53 * emptyRowsContact }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    count={prevC.length}
                    rowsPerPage={rowsPerPageContact}
                    page={pageContact}
                    onPageChange={handleChangePageContact}
                    onRowsPerPageChange={handleChangeRowsPerPageContact}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
        </div>
        </div>
      </div>
    </div>
        </form>
      </div>
  );
}

export default DashPage2;
