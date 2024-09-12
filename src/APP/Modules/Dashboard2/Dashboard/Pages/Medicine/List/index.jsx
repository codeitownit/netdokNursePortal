import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "../sections/Rows";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { useNavigate } from "react-router-dom";

function ListMed(text="View Previous Prescriptions") {
 
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
        url: `prescriptions/prescriptionsWhere/userUid/${patientId}`,
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
        <h1 className={headers}>Current Prescription</h1>
        <button className="p-4 bg-red-600" onClick={()=>navigate(`/viewPatient/${patientId}/medicine/order`)}></button>
        {/* <AddEdit text={text}/> */}
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
          <Tht txt="MEDICINE NAME & STRENGTH" />
          <Tht txt="ADMRT" />
          <Tht txt="DOSE" />
          <Tht txt="QUANTITY " />
          {/* <Tht txt="ACTIONS " /> */}
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
              if(!doc?.medStatus || doc?.medStatus === "current"){
              return (
                <Rows
                  key={doc?.id || index}
                  name={doc?.medName || ""}
                  docId={doc?.documentId||""}
                  form={doc?.medForm || ""}
                  dose={doc?.medDose || ""}
                  quantity={doc?.medQty || ""}
                  fetchData={fetchData}
                />
              );}
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ListMed;
