import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "./section/Rows";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListNurseReports() {
  
  const navigate = useNavigate();


  const [addedPatients, setAddedPatients] = useState(new Map());
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const request = useaxios();
  const docName = localStorage.getItem("universalDoctorName")

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
    fetchData();
  }, [pageNumber]);

  
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
      {/* <h1>Welcome, {user.email}</h1> */}
      {/* <button onClick={handleLogout}>Logout</button> */}
        <h1 className={headers}>Nurse Reports</h1>
        <p>View Patient Nurse Reports</p>
        <AddEdit
          text="+ Add Nurse Report"
          onClick={() => navigate(`/viewPatient/:id/nurseReports/add`)}
        />
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
          <Tht txt="DATE" />
          <Tht txt="WEIGHT" />
          <Tht txt="HEIGHT" />
          <Tht txt="CURRENT STATE" />
          <Tht txt="NUTRITIONAL STATE" />
          <Tht txt="RESPONSIBLE SPECIALIST" />
          <Tht txt="ACTIONS" />
        </Thead>
        <Tbody>
          {data
            .filter((item) => {
              return t.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(t);
            })
            .map((doc, index) => {
              console.log(doc);
              if (doc?.type === 'admissionReport') {
              return (
                <Rows
                  key={doc?.id || index}
                  docId={doc?.documentId || ""}
                  date={doc?.date || ""}
                  weight={doc?.weight || ""}
                  height={doc?.height || ""}
                  condition={doc?.currentState || ""}
                  status={doc?.nutritionalState || ""}
                  specialist={doc?.doctorName || ""}
                  fetchData={fetchData}
                />
              );}
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ListNurseReports;
