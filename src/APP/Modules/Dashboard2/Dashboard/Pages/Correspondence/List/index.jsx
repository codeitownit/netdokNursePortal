import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table"; 
import Rows from "../sections/Rows";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListCorrespondence() {
  
  const navigate = useNavigate();


  const [addedPatients, setAddedPatients] = useState(new Map());
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const request = useaxios();
  const docName = localStorage.getItem("universalDoctorName")
  const pId = localStorage.getItem("universalPatientId")

  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };
    try {
      const res = await request({
        method: "GET",
        url: `medicalLeaveCertificate`,
        body: {},
        auth: false,
      });
      const res2 = await request({
        method: "GET",
        url: "medicalFitnessCertificate",
        body: {},
        params: queryParams,
        auth: false,
        showLoader: false,
      });
      const res3 = await request({
        method: "GET",
        url: "medicalCertificateLifeBirth",
        body: {},
        params: queryParams,
        auth: false,
        showLoader: false,
      });
      const res4 = await request({
        method: "GET",
        url: "deathCertificate",
        body: {},
        params: queryParams,
        auth: false,
        showLoader: false,
      });
      const res5 = await request({
        method: "GET",
        url: "correspondence",
        body: {},
        params: queryParams,
        auth: false,
        showLoader: false,
      });

      // Check if the response is not an error
      if (res !== "error" && res2 !== "error" && res3 !== "error" && res4 !== "error" && res5 !== "error") {
        const r1 = res?.data;
        const r2 = res2?.data;
        const r3 = res3?.data;
        const r4 = res4?.data;
        const r5 = res5?.data;
        const result = r1.concat(r2).concat(r3).concat(r4).concat(r5)
        // console.log(result);
        setData(result || []);
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
        {/* <h1 className={headers}>View Correspondence</h1> */}
        <p>View Correspondence</p>
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
          <Tht txt="TYPE" />
          {/* <Tht txt="HEIGHT(cm)" />
          <Tht txt="BLOOD PRESSURE(mm Hg)" />
          <Tht txt="PULSE RATE(bpm)" />
          <Tht txt="TEMPERATURE" />
          <Tht txt="BLOOD SUGAR(mmol/L)" />
          <Tht txt="BREATHING RATE(bpm)" />
          <Tht txt="PULSE OXIMETER(%)" /> */}
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
              let type;
              if(doc?.details ||doc?.details===""){
                type = "Correspondence"
              } else if(doc?.['date-of-death'] ||doc?.['date-of-death']===""){
                type= "Death Certificate"
              } else if(doc?.['gestational-age'] || doc?.['gestational-age']===""){
                type = "Medical Certificate Life Birth"
              } else if(doc?.['days-of-medical-attention'] ||doc?.['days-of-medical-attention']===""){
                type = "Medical Leave Certificate"
              } else if(doc?.suffering || doc?.suffering===""){
                type = "Medical Fitness Certificate"
              }
              if((doc?.patient || doc?.patientId) && (doc?.patient===pId || doc?.patientId === pId)){
                console.log(doc);
                return (
                <Rows
                  key={doc?.id || index}
                  date={doc?.date || ""}
                  type={type || ""}
                  docId={doc?.documentId || ""}
                //   height={doc?.height || ""}
                //   bp={doc?.bloodPressure || ""}
                //   pr={doc?.pulseRate || ""}
                //   temp={doc?.temperature || ""}
                //   bs={doc?.bloodSugar || ""}
                //   br={doc?.breathingRate || ""}
                //   po={doc?.pulseOximeter || ""}
                  fetchData={fetchData}
                />
              );}
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ListCorrespondence;
