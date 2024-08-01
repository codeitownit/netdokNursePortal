import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useaxios from "../../../../../Hooks/useAxios";
import { Tbody, Thead, Table, Tht } from "../../../../../Components/Table";
import Rows from "./section/Rows";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";

function ListExam() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const request = useaxios();

  const fetchData = async (page) => {
    try {
      //console.log('Fetching data...');
      const limit = 10;
      const responseData = await request({
        method: "GET",
        url: `exams?page=${page}&limit=${limit}`,
        auth: false,
        showError: true,
      });

      if (!responseData) {
        throw new Error("Failed to fetch data");
      }

      if (isMounted) {
        //console.log('Setting state...');
        setData(responseData.data);
        setHasNextPage(responseData.pagination.hasNextPage);
        setHasPrevPage(responseData.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const handleAddExam = () => {
    navigate("/dashboard/exam/add");
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  // };

  return (
    <div
      className="font-quicksand bg-no-repeat bg-cover h-screen p-4"
      style={{ backgroundImage: 'url("src/APP/Assets/BgImages/bg_image.png")' }}
    >
      <div className="flex flex-col bg-gray-200 m-2 pt-2 rounded-lg w-full ml-auto items-start border-2 border-gray-400">
        <div className="flex w-full justify-between">
          <h1 className="px-2 pt-2 text-3xl font-bold">Exam List</h1>
          <AddEdit text="+ Add Exam" onClick={handleAddExam} />
          <div className="flex justify-end">
            <input
              type="text"
              className="w-6/12 h-10 mr-2 p-2 rounded-full"
              placeholder="Search"
              // value={search}
              // onChange={handleSearch}
            />
          </div>
        </div>
        <div className="w-full h-full">
          <Table
            mt={2}
            loading={false}
            showSearch={false}
            showFilter={true}
            showPagination={true}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            page={page}
            nextClick={handleNextPage}
            prevClick={handlePrevPage}
            className="border-2 border-black"
          >
            <Thead>
              <Tht txt="EXAM NAME" />
              <Tht txt="DESCRIPTION" />
              <Tht txt="DATE" />
              <Tht txt="STATUS" />
              <Tht txt="ACTIONS" />
            </Thead>
            <Tbody>
              {Array.isArray(data) &&
                data.map((doc, index) => (
                  <Rows
                    key={doc?.id || index}
                    id={doc?.id || ""}
                    name={doc?.name || " "}
                    description={doc?.description || ""}
                    start_date={doc?.start_date || " "}
                    grading_status={doc?.grading_status || " "}
                    fetchData={fetchData}
                  />
                ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ListExam;
