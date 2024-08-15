import { Tbody, Thead, Table, Tht } from "../../../../Components/Table";
import Rows from "./sections/Rows";
import AddEdit from "../../../../Components/Buttons/Add-Edit";
import { headers } from "./sections/style";
import useaxios from "../../../../Hooks/useAxios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../Provider/Context";


function DashPage() {
  const {user} = useContext(AppContext)
  const navigate = useNavigate();
// console.log(user)
  // if (!user) {
  //   navigate("/")
  // }

  const [addedPatients, setAddedPatients] = useState(new Map());
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const request = useaxios();
  const docName = localStorage.getItem("primeDoctorUserId")

  const fData = async () => {
    const docId = localStorage.getItem("primeDoctorUserId")
    try {
      const res = await request({
        method: "GET",
        url: `primeDoctor/userinfo/${docId}`,
        body: {},
        auth: true,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data);
        res?.data.map((snap)=>{
          console.log(snap);
          localStorage.setItem("universalHospitalId", snap.hospitalId)
          localStorage.setItem("universalHospitalId", snap.hospitalId)
          localStorage.setItem("universalDoctorName", snap.FirstName + " " + snap.lastName)
          localStorage.setItem("universalDoctorPhone", snap.phone)

        })
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };
    try {
      const res = await request({
        method: "GET",
        url: "patientJournal",
        body: {},
        params: queryParams,
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data.type);
        // console.log(user.lastName)
        setData(res?.data || []);
        setHasNextPage(res?.pagination?.hasNextPage || false);
        setHasPrevPage(res?.pagination?.hasPrevPage || false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    const newAddedPatients = new Map(addedPatients);
    data.forEach((snap) => {
      if (snap.type === 'admission' && snap.docId === docName) {
        if (!newAddedPatients.has(snap.patient)) {
          newAddedPatients.set(snap.patient, snap);
        }
      }
    });
    setAddedPatients(newAddedPatients);
  }, [data]);

  const [t, setT] = useState("");

  async function toNext() {
    let res = await fetchData({
      pageNumber: pageNumber + 1,
    });
    if (res) {
      setPage((c) => c + 1);
    }
  }

  async function toPrev() {
    if (pageNumber - 1 <= 0) return;
    let res = await fetchData({
      pageNumber: pageNumber - 1,
    });
    if (res) {
      setPage((c) => c - 1);
    }
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className={headers}>Patients List</h1>
        {/* <AddEdit
          text="+ Add Class"
          onClick={() => navigate(`/dashboard/classes/add`)}
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
                  date={doc?.admissionDate || ""}
                  id={doc?.patient || ""}
                  classLevel={doc?.patientName || ""}
                  subject={doc?.admittingUnit || ""}
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
