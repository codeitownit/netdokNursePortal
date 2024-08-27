
import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "../sections/ConcludedRows";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ConcludedImagingList() {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const patientId = localStorage.getItem("universalPatientId")

  const request = useaxios();

  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };
    const queryString = localStorage.getItem("universalPatientId")
    const doctorId = localStorage.getItem("primeDoctorUserId")
    try {
      const res = await request({
        method: "GET",
        url: `imaging/imagingRouteWhere/${queryString}/${doctorId}`,
        body: {},
        params: queryParams,
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data);
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
        <h1 className={headers}>Imaging Requests</h1>
        {/* <AddEdit
          text="+ Add Class"
          onClick={() => navigate(`/dashboard/c/add`)}
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
          <Tht txt="DATE ADDED" />
          <Tht txt="CLINICIAN" />
          <Tht txt="EXAMINATIONS REQUESTED" />
          <Tht txt="CONDITIONS" />
          <Tht txt="PROVISIONAL DIAGNOSIS" />
          <Tht txt="STATUS " />
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
              // if (doc.xray != "") exams += "Xray" + " " + ":" + doc.xray + "";
              //       if (doc.ultrasound != "") exams += "Ultrasound" + " " + ":" + doc.ultrasound + "";
              //       if (doc.ctscan != "") exams += "CT-Scan" + " " + ":" + doc.ctscan + "";
              //       if (doc.mriscan != "") exams += "MRI-Scan" + " " + ":" + doc.mriscan + "";
              //       if (doc.others != "") exams += "Others" + " " + ":" + doc.others + "";
              let exams = "";

  if (doc.xray) exams += `Xray : ${doc.xray}<br>`;
  if (doc.ultrasound) exams += `Ultrasound : ${doc.ultrasound}<br>`;
  if (doc.ctscan) exams += `CT-Scan : ${doc.ctscan}<br>`;
  if (doc.mriscan) exams += `MRI-Scan : ${doc.mriscan}<br>`;
  if (doc.others) exams += `Others : ${doc.others}<br>`;

  // This will convert the string with <br> tags into JSX elements
  const createMarkup = (html) => {
    return { __html: html };
  };
  let e = <div dangerouslySetInnerHTML={createMarkup(exams)} />
                if(doc?.userUid===patientId && (doc?.imagingStatus && doc?.imagingStatus === "done")){
              return (
                <Rows
                  key={doc?.id || index}
                  // id={doc?.patient || ""}
                  date={doc?.createdDate || ""}
                  docu={doc?.doctorName || ""}
                  docId={doc?.documentId || ""}
                  exam={ e || ""}
                  condition={doc?.condition || ""}
                  status={doc?.imagingStatus || ""}
                  diagnosis={doc?.pDiagnosis || ""}
                  fetchData={fetchData}
                />
              );}
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ConcludedImagingList;