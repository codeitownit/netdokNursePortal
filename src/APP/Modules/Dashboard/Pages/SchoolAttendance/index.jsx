import { useEffect, useState } from "react";

import useaxios from "../../../../Hooks/useAxios";

import { Table } from "./../../../../Components/Table";

import TableRow from "./sections/TableRow";
import TableHeader from "./sections/TableHeader";

import FilterItems from "./sections/FilterItems";

function Attendance() {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [search, setSearch] = useState("");
  const [stDate, setStDate] = useState(null);
  const [enDate, setEnDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [data, setData] = useState([]);

  // const [showFilter, setShowFilter] = useState(true);

  const request = useaxios();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(search);
    if (search.length <= 3) return;
    // getData({
    //   page,
    //   search: search,
    //   stDate,
    //   enDate,
    // });
  }, [search]);

  const getData = async (params = {}) => {
    console.log("Get data");
    const {
      page = 1,
      search = "",
      stDate = null,
      enDate = null,
      class_id = null,
    } = params;
    const queryParams = { page, limit: 10 };

    if (search) {
      queryParams.search = search;
    }

    if (stDate) {
      queryParams.stDate = stDate;
    }

    if (enDate) {
      queryParams.enDate = enDate;
    }

    if (class_id) {
      queryParams.renamedClass = class_id;
    }

    let res = await request({
      method: "GET",
      url: "student_attendance",
      params: queryParams,
    });

    if (res === "error") {
      return false;
    }

    setData(res?.data || []);
    setHasNextPage(res?.pagination?.hasNextPage || false);
    setHasPrevPage(res?.pagination?.hasPrevPage || false);
    return true;
  };

  async function toNext() {
    let res = await getData({
      page: page + 1,
      search,
      stDate,
      enDate,
      renamedClass: selectedClass,
    });

    if (res) {
      setPage((c) => c + 1);
    }
  }

  async function toPrev() {
    if (page - 1 <= 0) return;

    let res = await getData({
      page: page - 1,
      search,
      stDate,
      enDate,
      renamedClass: selectedClass,
    });

    if (res) {
      setPage((c) => c - 1);
    }
  }

  return (
    <div className=" w-full ">
      <Table
        showPagination={true}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        page={page}
        nextClick={toNext}
        prevClick={toPrev}
        showSearch={false}
      >
        <TableHeader />
        {data.map((record, index) => {
          return (
            <TableRow
              key={record?.id || index}
              id={record?.id || ""}
              student_name={record?.student?.name || ""}
              class_name={record?.Renamedclass?.name || ""}
              stream_name={record?.Renamedclass?.stream?.name || ""}
              date_time={record?.date_time || ""}
              location={record?.device?.location || ""}
              sn={record?.device?.sn || ""}
              student_id={record?.student?.id || ""}
            />
          );
        })}
      </Table>

      <FilterItems showFilter={false} />
    </div>
  );
}

export default Attendance;
