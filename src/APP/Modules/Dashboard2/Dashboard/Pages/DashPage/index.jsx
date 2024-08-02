import { Tbody, Thead, Table, Tht } from "../../../../../Components/Table";
import Rows from "./sections/Rows";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { headers } from "./sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../Components/Inputs/TextInput";
import { TextArea } from "../../../../../Components/Inputs";
import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv, divStyle } from "./sections/style";

function DashPage2() {
  const [addedPatients, setAddedPatients] = useState(new Map());
  const [data, setData] = useState([]);
  const [bmi, setBmi] = useState("");
  const [bp, setBp] = useState("");
  const [pageNumber, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const navigate = useNavigate();
  const request = useaxios();

  const fetchData = async (params = {}) => {
    const { pageNumber = 1 } = params;
    const queryParams = { pageNumber, limitNumber: 10 };
    try {
      const res = await request({
        method: "GET",
        url: "patientJournal",
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
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv}>
          {/* <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Add Nurse Report</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div> */}
          <div className={divStyle}>
          <div className="p-6 bg-white rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInput
        label="BMI"
        directInput={true}
        required={false}
        setInput={bmi}
        setStateInput={setBmi}
      />
    </div>
        <TextInput
          label="Blood Pressure"
          directInput={true}
          required={false}
          stateInput={bp}
          setStateInput={setBp}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="cal-icon">
      <TextInput
        label="BMI"
        directInput={true}
        required={false}
        setInput={bmi}
        setStateInput={setBmi}
      />
    </div>
        <TextInput
          label="Blood Pressure"
          directInput={true}
          required={false}
          stateInput={bp}
          setStateInput={setBp}
        />
      </div>

      
    </div>
  
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashPage2;
