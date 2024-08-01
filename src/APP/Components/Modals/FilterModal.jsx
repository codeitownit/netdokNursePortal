/* eslint-disable react/prop-types */

import Filter from "./Filter";

const FilterModal = ({
  children,
  apply = () => {},
  showFilter = () => {},
  setShowFilter = () => {},
  btn1Txt = "Cancel",
  btn2Txt = "Apply",
  headText = "Filter",
  showBtn1 = true,
  showBtn2 = true,
}) => {
  if (showFilter) {
    return (
      <>
        <>
          <div className=" h-screen flex overflow-x-clip overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-fit mx-auto">
              {/*content*/}
              <div className="border-0  shadow-lg relative flex flex-col w-full items-end  outline-none focus:outline-none">
                <div className="relative w-screen    flex-auto h-screen">
                  {/* {children} */}
                  <Filter
                    apply={apply}
                    setShowFilter={setShowFilter}
                    btn1Txt={btn1Txt}
                    btn2Txt={btn2Txt}
                    showBtn1={showBtn1}
                    showBtn2={showBtn2}
                    headText={headText}
                  >
                    {children}
                  </Filter>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      </>
    );
  }

  return null;
};

export default FilterModal;
