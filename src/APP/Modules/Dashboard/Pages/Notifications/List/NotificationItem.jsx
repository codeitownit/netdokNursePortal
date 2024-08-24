import React from "react";
// import { getCurrentDate } from "../../../../../Components/globals";

const NotificationItem = ({
  name,
  // date,
  notification,
  notificationTo,
  unRead,
  notificationMessage,
  onClick,
}) => {
  const renderIf = (condition, children) => condition && children;
  // if(date === getCurrentDate())
  return (
    <section
      className={`grid cursor-pointer rounded-md px-4 py-2 text-sm md:px-6 md:py-4 ${renderIf(
        unRead,
        "bg-blue-200"
      )}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <div className="grid w-[65%] md:w-[90%]">
          <p className="font-medium text-gray-600">
            <span className="font-bold text-gray-800">{name}</span>{" "}
            {notification}{" "}
            {renderIf(
              notificationTo,
              <span className="font-bold text-gray-600 hover:font-extrabold hover:text-blue-500 focus:text-blue-400 ">
                {notificationTo}
              </span>
            )}{" "}
            {renderIf(
              unRead,
              <span className="relative after:absolute after:bottom-1/4 after:ml-2 after:h-2 after:w-2 after:rounded-full after:bg-red-400"></span>
            )}
          </p>
          {/* <p>{date}</p> */}
        </div>
      </div>
      {renderIf(
        notificationMessage,
        <div className="mt-2 w-full pl-[20%]">
          <p className="text-pretty rounded-md border-2 border-solid border-gray-200 p-3 font-medium text-gray-600 hover:bg-gray-300 focus:bg-gray-300 md:p-4">
            {notificationMessage}
          </p>
        </div>
      )}
    </section>
  );
};

export default NotificationItem;
