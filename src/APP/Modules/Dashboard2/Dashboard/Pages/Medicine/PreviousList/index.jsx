import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "./sections/Rows"
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
function PrevPrescriptions() {
 
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const patientId = localStorage.getItem("universalPatientId");

  const request = useaxios();

  const fetchData = async () => {
    try {
      const res = await request({
        method: "GET",
        url: `prescriptions/previousPrescriptionsWhere/userUid/${patientId}`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data);
        setData(res?.data || []);
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


  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className={headers}>Previous Prescription</h1>
      </div>
      <Table
        mt={2}
        loading={false}
        showPagination={true}
        hasNextPage={hasNextPage}
        showSearch={true}
        hasPrevPage={hasPrevPage}
        page={pageNumber}
        search={t}
        setSearch={setT}
        showFilter={false}
      >
        <Thead>
          <Tht txt="DATE" />
          <Tht txt="MEDICINE" />
          <Tht txt="DOSE" />
          <Tht txt="INDICATION" />
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
              // if(!doc?.medStatus || doc?.medStatus === "current"){
              return (
                <Rows
                  key={doc?.id || index}
                  date={doc?.date || ""}
                  name={doc?.medName || ""}
                  dose={doc?.medDose || ""}
                  condition={doc?.condition || ""}
                  fetchData={fetchData}
                />
              );
            // }
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default PrevPrescriptions;
