import { Tbody, Thead, Table, Tht } from "../../../../../../Components/Table";
import Rows from "./section/Rows";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useaxios from "../../../../../../Hooks/useAxios";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";

function ListGS() {
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
        url: `grading_system_subject?page=${page}&limit=${limit}`,
        auth: false,
        showLoader: false,
        showError: true,
      });

      if (!responseData) {
        throw new Error("Failed to fetch data");
      }

      if (isMounted) {
        //console.log('Setting state...');
        const namesData = responseData.data.map((item) => item.name);
        const subjectsData = responseData.data.map((item) => item.subject.name);
        const rangesData = responseData.data.map((item) => item.ranges);
        setData(rangesData);
        //console.log(namesData)
        //console.log(subjectsData)
        //console.log(rangesData)
        setHasNextPage(responseData.pagination.hasNextPage);
        setHasPrevPage(responseData.pagination.hasPrevPage);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page);

    return () => {
      //console.log('Cleaning up...');
      setIsMounted(false);
    };
  }, [page, request]);

  const handleAddGS = () => {
    navigate("/dashboard/exam/addGrade");
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
          <h1 className="px-2 pt-2 text-3xl font-bold">Grading System List</h1>
          <div className="flex">
            <AddEdit text="+ Add" onClick={handleAddGS} />
            <input
              type="text"
              className="w-6/12 h-10 mx-4 p-2 rounded-full"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <Table
            mt={2}
            loading={true}
            showSearch={true}
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
              <Tht txt="#" />
              <Tht txt="NAME" />
              <Tht txt="SUBJECT" />
              <Tht txt="GRADE" />
              <Tht txt="MAX MARK" />
              <Tht txt="MIN MARK" />
              <Tht txt="ACTIONS" />
            </Thead>
            <Tbody>
              {Array.isArray(data) &&
                data.map((doc, index) => (
                  <Rows
                    key={doc?.id || index}
                    id={doc?.id || ""}
                    name={doc?.name || " "}
                    subject={doc?.subject?.name || " "}
                    ranges={doc?.ranges || []}
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

export default ListGS;
