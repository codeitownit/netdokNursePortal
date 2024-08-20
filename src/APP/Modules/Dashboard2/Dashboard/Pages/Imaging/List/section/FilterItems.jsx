import { useEffect, useState } from "react";
import useaxios from "../../../../../Hooks/useAxios";
import FilterModal from "../../../../../Components/Modals/FilterModal";

import { SelectInput } from "./../../../../../Components/Inputs";

function FilterItems({
  showFilter = true,
  setShowFilter = () => {},
  selectedClass = "",
  setSelectedClass = () => {},
}) {
  const request = useaxios();
  const [c, setClasses] = useState([]);
  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    const res = await request({
      method: "GET",
      url: "c",
      params: {
        limit: 100000,
      },
      showError: false,
      showLoader: false,
    });

    if (res === "error") return;

    setClasses(res.data);
  };

  return (
    <FilterModal showFilter={showFilter} setShowFilter={setShowFilter}>
      <SelectInput
        directInput={true}
        stateInput={selectedClass}
        setStateInput={setSelectedClass}
      >
        <option disabled value={""}>
          Select Class
        </option>
        {c.map((c, index) => {
          return (
            <option key={c?.id || index} value={c?.id?.toString()}>
              {c?.name || ""}
            </option>
          );
        })}
      </SelectInput>
    </FilterModal>
  );
}

export default FilterItems;
