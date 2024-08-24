
import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "../sections/Rows";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ATMList() {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const request = useaxios();

  const fetchData = async () => {
    const queryString = localStorage.getItem("universalPatientId")
    const doctorId = localStorage.getItem("primeDoctorUserId")
    try {
      const res = await request({
        method: "GET",
        url: `drugSchedule/${queryString}`,
        body: {},
        auth: false,
      });

      // Check if the response is not an error
      if (res !== "error") {
        console.log(res?.data.type);
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
  }, []);


  const [t, setT] = useState("");

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
        search={t}
        setSearch={setT}
        showFilter={false}
      >
        <Thead>
          <Tht txt="MEDICINE NAME" />
          <Tht txt="ADMINISTRATION" />
          <Tht txt="INDICATION" />
          <Tht txt="DOSE" />
          <Tht txt="DATE CREATED" />
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
              
              return (
                <Rows
                  key={doc?.id || index}
                  docId={doc?.documentId || ""}
                  medname={doc?.medicineName || ""}
                  type={doc?.admnistrationType || ""}
                  indication={doc?.indication || ""}
                  dose={doc?.dose || ""}
                  date={doc?.createdDate || ""}
                  fetchData={fetchData}
                />
              );
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ATMList;