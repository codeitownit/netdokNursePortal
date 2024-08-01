import { useEffect, useState, useContext } from "react";
import { Tbody, Thead, Table, Tht } from "./../../../../../Components/Table";
import Rows from "./section/Rows";
import { useNavigate } from "react-router-dom";
import Btn from "../../../../../Components/Table/Buttons/Btn";
import useaxios from "../../../../../Hooks/useAxios";
import AppContext from "../../../../../Provider/Context";

function ListRole() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const navigate = useNavigate();
  const request = useaxios();

  const handleAddRole = () => {
    navigate("/dashboard/roles/add");
  };

  const fetchData = async (page) => {
    // const { setHasNextPage, setHasPrevPage, setData } = useContext(AppContext);

    try {
      const limit = 10;
      const response = await request({
        method: "GET",
        url: "role",
        params: { page, limit },
      });

      setHasNextPage(response.pagination.hasNextPage);
      setHasPrevPage(response.pagination.hasPrevPage);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className=" w-full h-full ">
      <div className="w-full flex justify-end">
        <Btn rounded="rounded-md" padding="sm" onClick={handleAddRole}>
          <span>+ ADD ROLE</span>
        </Btn>
      </div>
      <Table
        mt={2}
        loading={false}
        showPagination={true}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        page={page}
        nextClick={handleNextPage}
        prevClick={handlePrevPage}
      >
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
              fetchData={fetchData}
            />
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default ListRole;
