import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "../sections/Rows";
import { headers } from "../sections/style";
import useaxios from "../../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { patientId } from "../../../../../../Components/globals";


function ListRefer() {
 
  const [data, setData] = useState([]);
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const request = useaxios();


  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };


    try {
      const res = await request({
        method: "GET",
        url: `referrals/referralsWhere/${patientId}`,
        body: {},
        params: queryParams,
        auth: true,
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
        <h1 className={headers}>Refferals List</h1>
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
          <Tht txt="NAME OF CLINICIAN" />
          <Tht txt="CLINIC" />
          <Tht txt="ADDRESS" />
          <Tht txt="REASONS FOR REFERRAL " />
          <Tht txt="CLINICAL NOTES" />
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
                  date={doc?.createdDate || ""}
                  clinician={doc?.clinician_name || ""}
                  clinic={doc?.Clinic || ""}
                  address={doc?.Address || ""}
                  reason={doc?.reasonsForRefferal || ""}
                  notes={doc?.Clinicalnotes || ""}
                  fetchData={fetchData}
                />
              );
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default ListRefer;
