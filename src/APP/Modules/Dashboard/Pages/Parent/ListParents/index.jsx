
import { Tbody, Thead, Table, Tht } from "../../../../Components/Table";
import Rows from "./section/Rows";

function Parent() {
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
      <div className=" flex-1 h-screen p-4">
        Parent
        <div className="w-full h-full">
          <Table
            mt={2}
            loading={false}
            showSearch={false}
            showFilter={false}
            showPagination={true}
            className="border-2 border-black"
          >
            <Thead>
              <Tht txt="ID" />
              <Tht txt="EXAM NAME" />
              <Tht txt="STUDENT NAME" />
              <Tht txt="DATE" />
              <Tht txt="ACTIONS" />
            </Thead>
            <Tbody>
              {data.map((doc, index) => (
                <Rows
                  key={doc?.id || index}
                  id={doc?.id || ""}
                  exam_name={doc?.exam_name || " "}
                  student_name={doc?.student_name || ""}
                  start_date={doc?.start_date || " "}
                />
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Parent;
