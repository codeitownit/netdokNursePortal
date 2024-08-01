/* eslint-disable react/prop-types */

const Modal = ({
  children,
  showModal = false,
  setShowModal,
  showModalCloseBtn = true,
}) => {
  if (showModal) {
    return (
      <>
        <div className="md:justify-center md:items-center flex overflow-x-clip overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-2">
          <div className="relative w-fit my-6 mx-auto ">
            {/*content*/}
            <div
              className="border-0 shadow-lg relative flex flex-col w-full outline-none focus:outline-none"
              style={{
                backgroundColor: "rgba(249, 250, 254, 1)",
                borderRadius: "20px",
              }}
            >
              {/*header*/}
              {showModalCloseBtn ? (
                <div className="w-full flex flex-row justify-end ">
                  <span
                    onClick={() => (setShowModal ? setShowModal(false) : null)}
                    className="mr-4 mt-4 text-4xl font-bold hover:font-extrabold hover:text-red-500 cursor-pointer text-slate-400"
                  >
                    X
                  </span>
                </div>
              ) : null}
              {/*body*/}
              <div className="relative px-6 flex-auto w-fit">{children}</div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }

  return null;
};

export default Modal;
