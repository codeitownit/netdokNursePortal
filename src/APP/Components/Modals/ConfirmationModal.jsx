/* eslint-disable react/prop-types */

const ConfirmationModal = ({
    text,
    showModal = false,
    setShowModal,
    onCancelClick,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirmClick,
  }) => {
    if (showModal) {
      return (
        <>
          <div className="md:justify-center md:items-center flex overflow-x-clip overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-2">
            <div className="relative w-fit my-6 mx-auto ">
              <div
                className="border-0 shadow-lg relative flex flex-col w-full outline-none focus:outline-none"
                style={{
                  backgroundColor: "rgba(249, 250, 254, 1)",
                  borderRadius: "7px",
                }}
              >
                <div className="relative px-4 py-6 flex-auto w-fit">
                  <p>{text}</p>
                  <div className="mt-7 flex justify-between">
                    <button
                      onClick={onCancelClick || (() => setShowModal(false))}
                      className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                    >
                      {cancelText}
                    </button>
                    <button
                      onClick={onConfirmClick}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      {confirmText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      );
    }
  
    return null;
  };
  
  export default ConfirmationModal;
  