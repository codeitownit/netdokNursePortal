/* eslint-disable react/prop-types */
import SearchInput from "../../Modules/Dashboard2/Dashboard/Pages/NurseReports/sections/input";
import { ThreeDots } from "react-loader-spinner";

import Pagination from "./Pagintation";

import { colors } from "./colors";

import Btn from "./Buttons/Btn";

import { BiFilter } from "react-icons/bi";

const Table = ({
  children,
  showPagination = false,
  hasNextPage = false,
  hasPrevPage = false,
  page = 1,
  nextClick = () => { },
  prevClick = () => { },
  search = "",
  setSearch = () => { },
  loading = true,
  is_filterd = false,
  showFilter = false,
  showSearch = false,
  filter = () => { },
  clearFilter = () => { },
  mt = 0,
  mb = 0,
}) => {

  return (
    <div
      style={{ marginTop: `${mt}em`, marginBottom: `${mb}em` }}
      className="w-full p-4 bg-white  rounded-lg overflow-x-auto border-dotted border-2 border-gray-500"
    >
      <div className=" w-full flex items-center justify-between ">
        <div className=" ">
          <SearchInput searchItem={search} setInputSearch={setSearch}/>
        </div>
        <div className="hidden md:flex gap-x-6">
          {is_filterd && (
            <Btn rounded="rounded-md" padding="sm" onClick={clearFilter}>
              <span className="">Clear Filters</span>
            </Btn>
          )}
          {showFilter && (
            <Btn rounded="rounded-md" padding="sm" onClick={filter}>
              <div className="flex items-center space-x-2 font-bold">
                <BiFilter class="text-2xl" />
                <span className=" ">Filter</span>
              </div>
            </Btn>
          )}
          <ThreeDots
            height="40"
            width="40"
            radius="9"
            color={colors.danger}
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={loading}
          />
        </div>
      </div>
      <table className=" min-w-full divide-y  table-auto overflow-x-auto overscroll-y-none">
        {children}
      </table>
      <div className=" py-2"></div>
      {showPagination && (
        <Pagination
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          page={page}
          nextClick={nextClick}
          prevClick={prevClick}
        />
      )}
    </div>
  );
};

export default Table;
