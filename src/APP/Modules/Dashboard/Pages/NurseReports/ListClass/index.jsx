import { Tbody, Thead, Table, Tht } from "./../../../../../Components/Table";
import Rows from "./section/Rows";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { headers } from "../sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListClass() {
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const navigate = useNavigate();
  const request = useaxios();

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
        console.log(res?.data.type)
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
  }, []);

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
        <h1 className={headers}>Class List</h1>
        <AddEdit
          text="+ Add Class"
          onClick={() => navigate(`/dashboard/classes/add`)}
        />
      </div>
      <Table
        mt={2}
        loading={false}
        showPagination={true}
        hasNextPage={true}
        showSearch={true}
        hasPrevPage={true}
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
          {data
            .filter((item) => {
              return t.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(t);
            })
            .map((doc, index) => {
              if(doc?.type === "admission" && doc?.createdByName==="Jonathan Kilonzo"){
              return <Rows
                key={doc?.id || index}
                id={doc?.patient || ""}
                classLevel={doc?.patientName || ""}
                subject={doc?.admittingUnit || ""}
                room={doc?.room || ""}
                condition={doc?.condition || ""}
                specialist={doc?.doctorName || ""}
                status={doc?.admStatus || ""}
                fetchData={fetchData}
              />}
})}
        </Tbody>
      </Table>
    </div>
  );
}

export default ListClass;
