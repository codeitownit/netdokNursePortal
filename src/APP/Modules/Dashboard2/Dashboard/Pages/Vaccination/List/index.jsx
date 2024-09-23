import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "../sections/Rows";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { useNavigate } from "react-router-dom";

function ListVaccination(text="View Previous Prescriptions") {
 
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const patientId = localStorage.getItem("universalPatientId");

  const request = useaxios();
  const navigate = useNavigate();
  // const pId = localStorage.getItem("universalPatientId")

  // function handlePrevPres(){
  //   navigate(`/viewPatient/${pId}/medicine/previousPrescriptions`)
  // }
  
  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };

    try {
      const res = await request({
        method: "GET",
        url: `vaccination/vaccinationWhere/userId/${patientId}`,
        body: {},
        params: queryParams,
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res);
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
        <h1 className={headers}>View Vaccination</h1>
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
          <Tht txt="BOOSTER VACCINE" />
          <Tht txt="CHILHOOD VACCINE" />
          <Tht txt="OTHER VACCINE" />
          <Tht txt="PANDEMIC VACCINE" />
          <Tht txt="TRAVEL VACCINE" />
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
                  booster={doc?.boosterVaccine +" administration: "+doc?.boosterVroute || ""}
                  docId={doc?.documentId||""}
                  child={doc?.childhoodVaccine +" administration: "+ doc?.childVroute || ""}
                  other={doc?.otherVaccine +" administration: "+ doc?.otherVroute || ""}
                  pandemic={doc?.pandemicVaccine +" administration: "+doc?.pandemicVroute || ""}
                  travel={doc?.travelVaccine +" administration: "+doc?.travelVroute || ""}
                  fetchData={fetchData}
                />
              );
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ListVaccination;
