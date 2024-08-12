/* eslint-disable react/prop-types */
import Modal from "./BasicModal";
import logo from '../../Assets/BgimageLanding/exhibit-logo-landing.jpeg';

const LoadingModal = ({ showModal, loadingText = "... Loading" }) => {
  return (
    <Modal
      showModal={showModal}
      setShowModal={() => {}}
      showModalCloseBtn={false}
    >
      <div className=" p-2">
        <div className=" w-full flex flex-col items-center justify-center">
          <p className="text-8xl font-bold animate-pulse text-red-500 mt-6">
            <img src={logo} alt="logo" width="90px" />
          </p>
          <p className=" font-bold text-lg md:text-3xl text-gray-900 mt-4 mb-4">
            {loadingText}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
