/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

const Tr = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        {React.Children.map(children, (child, index) => {
          return (
            <tr key={index} className=" ">
              <td className=" border border-slate-600">
                {" "}
                &nbsp;{child?.props?.name || ""}
                &nbsp;
              </td>
              <td className="  border border-slate-600 px-2 py-1">
                {child?.props?.children}
              </td>
              {/* {child?.props?.children || ""} */}
            </tr>
          );
        })}
        <tr className="">
          <td className=" py-2"></td>
        </tr>
      </>
    );
  }

  return <tr 
  // className=" odd:bg-table-odd even:bg-table-even"
  >{children}</tr>;
};

export default Tr;
