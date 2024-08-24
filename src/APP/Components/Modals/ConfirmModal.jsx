/* eslint-disable react/prop-types */
import TimeInput from "../Inputs/TimeInput";
import TextInput from "../Inputs/TextInput";
const ConfirmModal = ({
    text,
    body1,
    body2, 
    administeredDose,
    setAdministeredDose,
    time,
    setTime,
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
                <div className="relative px-10 py-6 flex-auto w-fit">
                  <p className="font-bold w-fit text-center">{text}</p>
                  <div className="relative px-4 py-6 flex-auto w-fit flex flex-col">
                    <h4 className="font-bold">{body1}</h4>
                    <h4 className="">{body2}</h4>
                    <TextInput
                    label=" "
                    placeholder="Administered Dose"
                    directInput={true}
                    required={false}
                    stateInput={administeredDose}
                    setStateInput={setAdministeredDose}
                    />
                    <TimeInput directInput={true}
                        label=" "
                        placeholder="time"
        required={false}
        stateInput={time}
        setStateInput={setTime}
        />
                  </div>
                  <div className="mt-7 flex justify-between">
                    <button
                      onClick={onCancelClick || (() => setShowModal(false))}
                      className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
                    >
                      {cancelText}
                    </button>
                    <button
                      onClick={onConfirmClick}
                      className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-green-700 focus:outline-none"
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
  
  export default ConfirmModal;
  