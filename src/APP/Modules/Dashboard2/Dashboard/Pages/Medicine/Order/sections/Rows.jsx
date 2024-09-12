/* eslint-disable react/prop-types */
import { Tr, Td, Tt} from "../../../../../../../Components/Table";
import useaxios from "../../../../../../../Hooks/useAxios";
import { db } from "../../../../../../../../../firebaseConfig";
import {doc, updateDoc, getDoc } from "firebase/firestore"; // Import Firestore

function Rows({name="", form = "", docId="", dose = "", quantity="", admType="", fetchData}) {
  const request  = useaxios();

  const genOrderID = () => {
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    let typeCode = 'NO';
    const orderCounter = Math.floor(Math.random() * 1000);

    var OrderId = `${typeCode}-${year}${month}${day}-${orderCounter}`;

    return OrderId

}
  const getMed = async () => {
    try {
      const docRef = doc(db, "admissionTreatment", docId); // Reference to the specific document
      const docSnap = await getDoc(docRef); // Fetch the document
  
      if (docSnap.exists()) {
        const prescription = docSnap.data()
        const formulation = prescription.admnistrationType
        const medicineName = prescription.medicineName
        const quantity = prescription.dose
        const strength = medicineName.split(' ').pop();

        const OrderId = genOrderID()
        console.log("orderId", OrderId)

        const doctorsPrescription = {
            formulation,
            quantity,
            medicineName,
            strength,
            from: "nurse",
            status: "approved",
            dispensingStatus: "In Queue",
            orderID: OrderId,
            patientName: localStorage.getItem("universalPatientName")
        }
        console.log("Document data:", doctorsPrescription); // Log the data
        try {
          const res = await request({
            method: "POST",
            url: "pharmacyOrders",
            data: doctorsPrescription,
            auth: false, 
            showLoader: false
          });
    
          // Check if the response is not an error
          if (res !== "error") {
            window.alert("order placed successfully")
            // toast.success("ordered successfully");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.log(docId)
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching imaging status: ", error);
    }
    // navigate("/dashboard")
  };
  return (
    <>
      <Tr>
      <Td name="MEDICINE NAME">
        <Tt txt={name} />
      </Td>
      <Td txt="FORMULATION">
      <Tt txt={form} />
      </Td>
      <Td name="DOSE">
        <Tt txt={dose} />
      </Td>
      <Td name="QUANTITY">
        <Tt txt={quantity} />
      </Td>
      <Td name="ADMINISTRATION TYPE">
        <Tt txt={admType} />
      </Td>
      <Td name="ACTIONS">
        <span className=" flex gap-x-2  items-center text-4xl">
        <button className="w-full py-3 px-5 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all" onClick={()=>getMed()}>Order</button>
        </span>
      </Td>
    </Tr>
</>
  );
}

export default Rows;