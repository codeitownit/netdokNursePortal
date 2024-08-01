import { useState } from "react";

function SearchInput({ searchItem = "", setInputSearch = () => {} }) {
  return (
    <form>
      <input
        type="text"
        className="w-flex border-2 border-slate-500 h-10 mr-2 pl-5 m-5 rounded-full"
        placeholder="Search"
        label="search"
        onChange={(e) => {
          setInputSearch(e.target.value);
          searchItem = e.target.value;
          //console.log(searchItem)
        }}
      />
    </form>
  );
}
export default SearchInput;
