/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import { BiSolidCloudUpload } from "react-icons/bi";

import ImageModal from "./ImageModal";

const ImageInput = ({
  setFile = () => {},
  src = null,
  setSrc = () => {},
  setCroppedFile = () => {},
  width = null,
  height = null,
  cropWidth = null,
  cropHeight = null,
  rounded = false,
  aspect = 1,
  label = "Upload profile",
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const btnRef = useRef();

  let w =
    !width || !height
      ? { minHeight: "150px", minWidth: "150px" }
      : { width: width, height: height };

  function handleSelectFile(e) {
    let file = e?.target?.files[0] || null;

    if (file == null) {
      e.target.value = null;
      return;
    }

    if (file) {
      setFile(file);
      setSrc(URL.createObjectURL(file));
      setShowModal(true);
      e.target.value = null;
    }
  }

  function openSelector() {
    if (showModal === true) return;
    setFile(null);
    btnRef.current.click();
  }

  return (
    <div
      className=" cursor-pointer relative w-fit border-2 border-dashed bg-azureish-white border-primary"
      style={{
        borderRadius: rounded ? "1000px" : "2px",
        ...w,
      }}
      onClick={openSelector}
    >
      <input
        className=" hidden"
        ref={btnRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          //console.log(e);
          handleSelectFile(e);
        }}
      />

      {src && (
        <img
          src={src}
          className="absolute  w-full h-full "
          style={{
            borderRadius: rounded ? "1000px" : "8px",
            objectFit: "contain",
          }}
        />
      )}

      <div
        className=" absolute  px-3  w-full h-full flex justify-center items-center z-50"
        style={{
          borderRadius: rounded ? "1000px" : "8px",
          opacity: showImage ? 0.4 : 1,
          backgroundColor: showImage ? "" : "rgba(255,255,255,0.8)",
        }}
        onMouseOver={() => setShowImage(false)}
        onMouseLeave={() => setShowImage(true)}
      >
        <div className=" w-full h-full  flex flex-col justify-center items-center  ">
          <span className=" text-2xl">
            <BiSolidCloudUpload />
          </span>
          <span className=" text-gray1 px-2 text-center">{label}</span>
        </div>
      </div>

      <ImageModal
        showModal={showModal}
        setShowModal={setShowModal}
        src={src}
        setSrc={setSrc}
        setCroppedFile={setCroppedFile}
        cropWidth={cropWidth}
        cropHeight={cropHeight}
        aspect={aspect}
        rounded={rounded}
      />
    </div>
  );
};

export default ImageInput;
