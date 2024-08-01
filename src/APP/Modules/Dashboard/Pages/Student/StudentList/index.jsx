import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { headers, outerDiv } from "../sections/styles";
import { Tbody, Thead, Table, Tht } from "../../../../../Components/Table";
import Rows2 from "../sections/row";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useaxios from "../../../../../Hooks/useAxios";

function StudentList() {

  const request = useaxios();
  const [students, setStudents] = useState([]);


  
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await request({
          method: "GET",
          url: "students",
          auth: false,
          showLoader: false,
        });

        if (res !== "error") {
          setStudents(res.data);
        }
      } catch (error) {
        console.error("Could not fetch members", error);
      }
    }
    fetchStudents();
  }, []);

  console.log(students)
    
  let data = [
    {
      id: "1",
      name: "JAINAM SHAH",
      level: "Form 3",
      gender: "Male",
    },
    {
      id: "2",
      name: "BONGANI MASEMOLA",
      level: "Form 4",
      gender: "Male",
    },
    {
      id: "3",
      name: "NEEMAT MOHAMMED",
      level: "Form 2",
      gender: "Female",
    },
    {
      id: "4",
      name: "STANLEY KIMAMBO",
      level: "Form 1",
      gender: "Male",
    },
    {
      id: "5",
      name: "PAT ALOO",
      level: "Form 4",
      gender: "Female",
    },
    {
      id: "6",
      name: "EVERYLN WANIU",
      level: "Form 3",
      gender: "Female",
    },
    {
      id: "7",
      name: "JAINAM SHAH",
      level: "Form 1",
      gender: "Male",
    },
  ];

    const navigate = useNavigate()

    function handleClick(){
      navigate("add")
    }
  

    return (
      <div className={outerDiv}>
        <div className="flex justify-between items-center">
          <h1 className={headers}>Student List</h1>
          <h1 className={headers}>Student List</h1>
          <AddEdit text="+ Add Students" onClick={handleClick} />
        </div>
        <div>
        <Table mt={2} loading={false} showSearch={true} showFilter={true}>
          <Thead>
            <Tht txt="ADMISSION NO" />
            <Tht txt="NAME" />
            <Tht txt="LEVEL" />
            <Tht txt="GENDER" />
            <Tht txt="ACTIONS" />
          </Thead>
          <Tbody>
            {students.map((doc, index) =>  (
              <Rows2 
                key={doc?.id || index}
                id={doc?.id || ""}
                adm={doc?.adm_no || ""}
                name={doc?.name || ""}
                level={doc?.Renamedclass.name || ""}
                gender={doc?.gender.name || ""}
                students={students}
                setStudents={setStudents}
                />
             ))}
          </Tbody>
        </Table>
        </div>
        <div>
        
        </div>
      </div>
    );
  }

export default StudentList;