
import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "../sections/Rows";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ProgressList() {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const request = useaxios();

  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };
    const queryString = localStorage.getItem("universalPatientId")
    const doctorId = localStorage.getItem("primeDoctorUserId")
    try {
      const res = await request({
        method: "GET",
        url: 'patientJournal',
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
        <h1 className={headers}>Previous Progress Journals</h1>
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
          <Tht txt="DATE ADDED" />
          <Tht txt="JOURNAL TYPE" />
          <Tht txt="DIAGNOSIS" />
        </Thead>
        <Tbody>
          {data
            .filter((item) => {
              return t.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(t);
            })
            .map((doc, index) => {
              let s;
              if (doc.type.includes("nurseMidwives") && doc.createdByName === "Jonathan Kilonzo"){
                console.log(doc);

                if(doc.type.includes("Operation")){
                    s = "operation"
                } else if(doc.type.includes("Telephone")){
                    s = "telephone"
                } else if(doc.type.includes("Progress")) {
                    s = "progress"
                }  else {
                    s = "admission"
                } 
              return (
                <Rows
                  key={doc?.id || index}
                  id={doc?.documentId || ""}
                  date={doc?.date || ""}
                  specialist={ s || ""}
                  condition={doc?.progressDiagnosis || ""}
                  fetchData={fetchData}
                />
              );}
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ProgressList;