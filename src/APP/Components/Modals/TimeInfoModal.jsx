/* eslint-disable react/prop-types */
import { useEffect } from "react";

import BasicModal from "./BasicModal";

import BtnTxt from "../Buttons/BtnTxt";
import Divider from "../Utils/Divider";

const TimeInfoModal = ({
  showModal = false,
  setShowModal = () => {},
  modal_message = "",
  t = 6000,
}) => {
  useEffect(() => {
    if (showModal === false) {
      return;
    }
    setTimeout(() => {
      setShowModal(false);
    }, t);
  }, [showModal]);

  return (
    <BasicModal
      setShowModal={setShowModal}
      showModal={showModal}
      showModalCloseBtn={true}
    >
      <div className=" p-2">
        <div className="w-full flex flex-row  justify-between mt-4 gap-x-4">
          <div
            style={{ color: "#292968" }}
            className=" text-lg md:text-4xl font-bold tracking-wider"
          >
            {modal_message}
          </div>
        </div>
        <Divider mt={"1.5em"} mb={"1.5em"} />
        <div className="w-full flex justify-between gap-x-6 mb-4">
          <BtnTxt
            rounded="rounded-md"
            label="Close"
            onClick={() => setShowModal(false)}
          />
        </div>
      </div>
    </BasicModal>
  );
};

export default TimeInfoModal;
