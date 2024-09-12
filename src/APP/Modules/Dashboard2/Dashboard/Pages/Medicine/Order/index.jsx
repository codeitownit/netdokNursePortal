import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "./sections/Rows";
import { headers } from "../sections/style";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../../../../../../../firebaseConfig'; // your Firebase config file

function OrderPrescriptions() {
 
  const [data, setData] = useState([]);
  // const [pageNumber, setPage] = useState(1);
  // const [hasPrevPage, setHasPrevPage] = useState(false);
  const patientId = localStorage.getItem("universalPatientId");

  useEffect(() => {
    const q = query(
      collection(db, "admissionTreatment"),
      where("userUid", "==", patientId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort the data by date in descending order
      dataArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData(dataArray);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [patientId]);

  const [t, setT] = useState("");

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className={headers}>Prescription Details</h1>
      </div>
      <Table
        mt={2}
        loading={false}
        showPagination={true}
        // hasNextPage={hasNextPage}
        showSearch={true}
        // hasPrevPage={hasPrevPage}
        // page={pageNumber}
        // prevClick={toPrev}
        // nextClick={toNext}
        search={t}
        setSearch={setT}
        showFilter={false}
      >
        <Thead>
          <Tht txt="MEDICINE" />
          <Tht txt="DOSE" />
          <Tht txt="STRENGTH" />
          <Tht txt="INDICATION " />
          <Tht txt="ADMINISTRATION " />
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
              console.log(doc.medStatus);
              return (
                <Rows
                  key={doc?.id || index}
                  name={doc?.medicineName || ""}
                  docId={doc?.documentId || ""}
                  form={doc?.dose || ""}
                  dose={doc?.strength || ""}
                  quantity={doc?.indication || ""}
                  admType={doc?.admnistrationType || ""}
                  // fetchData={fetchData}
                />
              );
            })}
        </Tbody>
      </Table>
    </div>
  );
}

export default OrderPrescriptions;
