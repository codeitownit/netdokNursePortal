/* eslint-disable react/prop-types */
import { useEffect } from "react";

import Modal from "./BasicModal";

import { BiError } from "react-icons/bi";

const ErrorModal = ({
  showErrorModal = false,
  setShowErrorModal = () => {},
  modal_message = "",
  t = 30000,
}) => {
  useEffect(() => {
    if (showErrorModal === false) {
      return;
    }
    setTimeout(() => {
      // //console.log("Time out");
      setShowErrorModal(false);
    }, t);
  }, [showErrorModal]);

  return (
    <Modal showModal={showErrorModal} setShowModal={setShowErrorModal}>
      <div className=" p-2">
        <div
          className=" w-full flex flex-col items-center justify-center"
          style={{}}
        >
          <p className=" text-2xl md:text-8xl font-bold animate-pulse text-red-500">
            <BiError />
          </p>
          <p className="font-medium text-base md:text-2xl text-gray-900 mt-4 mb-4 whitespace-normal">
            {modal_message}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
