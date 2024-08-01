import { Tbody, Thead, Table, Tht } from "../../../../../Components/Table";
import Rows from "./section/Rows";
function ListUsers() {

  const data = [
    {
      id: "1",
      exam_name: "MID TERM PAPER",
      student_name: "Lorem Ipsum",
      start_date: "13/4/2024",
    },
    {
      id: "2",
      exam_name: "END TERM PAPER",
      student_name: "Lorem Ipsum",
      start_date: "14/4/2024",
    },
    {
      id: "3",
      exam_name: "ENTRY TERM PAPER",
      student_name: "Lorem Ipsum",
      start_date: "17/4/2024",
    },
    {
      id: "4",
      exam_name: "MID TERM PAPER",
      student_name: "Lorem Ipsum",
      start_date: "17/4/2024",
    },
    {
      id: "5",
      exam_name: "END TERM PAPER",
      student_name: "Lorem Ipsum",
      start_date: "20/4/2024",
    },
    {
      id: "6",
      exam_name: "ENTRY TERM PAPER",
      student_name: "Lorem Ipsum",
      start_date: "21/4/2024",
    },
    {
      id: "7",
      exam_name: "MID TERM PAPER",
      student_name: "Lorem Ipsum",
      start_date: "23/4/2024",
    },
  ];

  return (
    <div>
      List Users
      <div className=" w-full h-full ">
        <Table mt={2} loading={false} showSearch={true} showFilter={true}>
          <Thead>
            <Tht txt="ID" />
            <Tht txt="NAME" />
            <Tht txt="DESCRIPTION" />
            <Tht txt="USERS" />
            <Tht txt="ACTIONS" />
          </Thead>
          <Tbody>
            {data.map((doc, index) => (
              <Rows
                key={doc?.id || index}
                id={doc?.id || ""}
                name={doc?.name || ""}
                description={doc?.description || ""}
                users={doc?.users || 1}
              />
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export default ListUsers;
