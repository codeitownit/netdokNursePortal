import { Tbody, Thead, Table, Tht } from "../../../../Components/Table";
import Rows from "./sections/Rows";
import AddEdit from "../../../../Components/Buttons/Add-Edit";
import { headers } from "./sections/style";
import useaxios from "../../../../Hooks/useAxios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../Provider/Context";
import { getCurrentDate } from "../../../../Components/globals";


function DashPage() {
  const {user} = useContext(AppContext)
  const navigate = useNavigate();
// console.log(user)
  // if (!user) {
  //   navigate("/")
  // }
  let dropdownItems = [];

  const [addedPatients, setAddedPatients] = useState(new Map());
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const request = useaxios();
  const recordsPerPage = 10;
  const docName = localStorage.getItem("primeDoctorUserId")
  const doctorId = localStorage.getItem("primeDoctorUserId");

  const {departments, togglesetDepartment} = useContext(AppContext)

  // const fData = async () => {
  //   const docId = localStorage.getItem("primeDoctorUserId")
  //   try {
  //     const res = await request({
  //       method: "GET",
  //       url: `primeDoctor/userinfo/${docId}`,
  //       body: {},
  //       auth: true,
  //     });

  //     // Check if the response is not an error
  //     if (res !== "error") {
  //       console.log(res?.data);
  //       res?.data.map((snap)=>{
  //         console.log(snap);
  //         localStorage.setItem("universalHospitalId", snap.hospitalId)
  //         localStorage.setItem("universalHospitalId", snap.hospitalId)
  //         localStorage.setItem("universalDoctorName", snap.FirstName + " " + snap.lastName)
  //         localStorage.setItem("universalDoctorPhone", snap.phone)

  //       })
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: "patientJournal",
        body: {},
        auth: false,
      });
      const res2 = await request({
        method: "GET",
        url: `hospitalOnboarding/hospital/AH-48656`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res2 !== "error") {
        console.log(res?.data.type);
        res2?.data.map((item)=>{
            item?.departments.map((ward)=>{
              // if(ward?.department === "Oncology"){
                const id = ward
                dropdownItems.push(id)
                togglesetDepartment(dropdownItems)
                localStorage.setItem("hospitalDepartments", dropdownItems)
              // }
            })
        })
      }

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data);
        // console.log(user.lastName)
        setData(res?.data || []);
         // Initialize pagination
         const totalRecords = res?.data.length || 0;
         setPage(1); // Reset to first page
         setHasNextPage(totalRecords > recordsPerPage);
         setHasPrevPage(false);
         setCurrentPageData(res?.data.slice(0, recordsPerPage));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // useEffect(() => {
  //   fData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  
  useEffect(() => {
    const startIdx = (pageNumber - 1) * recordsPerPage;
    const endIdx = startIdx + recordsPerPage;
    const pageData = data.slice(startIdx, endIdx);

    setCurrentPageData(pageData);
    setHasNextPage(endIdx < data.length);
    setHasPrevPage(startIdx > 0);
  }, [pageNumber, data]);

  useEffect(() => {
    const newAddedPatients = new Map(addedPatients);
    data.forEach((snap) => {
      if (snap.type === 'admission' 
        // && snap.nurse === doctorId
      ) {
        if (!newAddedPatients.has(snap.patient)) {
          newAddedPatients.set(snap.patient, snap);
        }
      }
    });
    setAddedPatients(newAddedPatients);
  }, [data]);

  const [t, setT] = useState("");

  const toNext = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const toPrev = () => {
    if (hasPrevPage) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };


  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className={headers}>Patients List</h1>
        {/* <AddEdit
          text="+ Add Class"
          onClick={() => navigate(`/dashboard/add`)}
        /> */}
      </div>
      <Table
        mt={2}
        loading={false}
        showPagination={true}
        hasNextPage={hasNextPage}
        showSearch={true}
        hasPrevPage={hasPrevPage}
        page={pageNumber}
        prevClick={toPrev}
        nextClick={toNext}
        search={t}
        setSearch={setT}
        showFilter={false}
      >
        <Thead>
          <Tht txt="PATIENT ID" />
          <Tht txt="PATIENT NAME" />
          <Tht txt="ADMISSION UNIT" />
          <Tht txt="ADMISSION WARD" />
          <Tht txt="ADMISSION ROOM" />
          <Tht txt="CONDITION INFORMATION " />
          <Tht txt="RESPONSIBLE SPECIALIST" />
          <Tht txt="STATUS" />
          <Tht txt="ACTIONS" />
        </Thead>
        <Tbody>
          {Array.from(addedPatients.values())
            .filter((item) => {
              return t.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(t);
            })
            .map((doc, index) => {
              console.log(doc);
              if(doc?.admStatus === "admitted" || doc?.admStatus === "observation"){
              return (
                <Rows
                  key={doc?.patient || index}
                  doc={doc?.document || ""}
                  document={doc?.documentId || ""}
                  date={doc?.admissionDate || ""}
                  id={doc?.patient || ""}
                  pName={doc?.patientName || ""}
                  dep={doc?.selectedDepartment || ""}
                  ward={doc?.admittingUnit || ""}
                  room={doc?.room || ""}
                  condition={doc?.condition || ""}
                  specialist={doc?.doctorName || ""}
                  status={doc?.admStatus || ""}
                  fetchData={fetchData}
                />
              );}
            })}
        </Tbody>
      </Table>
    </div>
  );
}
export default DashPage;
