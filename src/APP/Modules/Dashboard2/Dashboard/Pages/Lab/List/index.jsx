import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "../sections/Rows";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LabList() {
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const navigate = useNavigate();
  const request = useaxios();
  const pId = localStorage.getItem("patientId")
  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };
    try {
      const res = await request({
        method: "GET",
        url: `lab/labsWhere/${pId}`,
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
        <h1 className={headers}>Lab List</h1>
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
          {/* <Tht txt="PATIENT ID" /> */}
          <Tht txt="DATE REQUESTED" />
          <Tht txt="URGENCY" />
          <Tht txt="SAMPLES TAKEN" />
          <Tht txt="EXAMINATIONS REQUESTED" />
          <Tht txt="DUE DATE" />
          <Tht txt="STATUS" />
          {/* <Tht txt="ACTIONS" /> */}
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
              return (
                <Rows
                  key={doc?.id || index}
                  date={doc?.date || ""}
                  urgency={doc?.urgency || "N/A"}
                  samples={doc?.samplesTaken || ""}
                  tests={doc?.testRequested || ""}
                  duedate={doc?.date || ""}
                  status={doc?.status || ""}
                  fetchData={fetchData}
                />
              );
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default LabList;
