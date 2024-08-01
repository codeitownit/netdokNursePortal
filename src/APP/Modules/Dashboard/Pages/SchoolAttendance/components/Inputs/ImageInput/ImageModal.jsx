/* eslint-disable react/prop-types */
import { useState } from "react";

import Cropper from "react-easy-crop";

import BtnTxt from "./../Buttons/BtnTxt";

import BasicModal from "../../Modals/BasicModal";

const ImageModal = ({
  setShowModal = () => {},
  showModal = false,
  src = null,
  setSrc = () => {},
  setCroppedFile = () => {},
  cropWidth = null,
  cropHeight = null,
  aspect = 1,
  rounded = false,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropix, setCropPix] = useState({});

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropPix(croppedAreaPixels);
  };

  // console.log(showModal, src);

  if (showModal === false || src == null) return null;

  function handleCrop() {
    if (src === null) {
      return;
    }
    const image = new Image();
    image.src = src;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = cropix.width;
    canvas.height = cropix.height;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        cropix.x * scaleX,
        cropix.y * scaleY,
        cropix.width * scaleX,
        cropix.height * scaleY,
        0,
        0,
        cropix.width,
        cropix.height
      );

      canvas.toBlob((blob) => {
        if (blob == null) return;
        const croppedImageFile = new File([blob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        setCroppedFile(croppedImageFile);
        setSrc(URL.createObjectURL(croppedImageFile));
        setShowModal(false);
      }, "image/jpeg,image/png");
    }
  }

  return (
    <BasicModal showModal={showModal} setShowModal={setShowModal}>
      <div className="" style={{ width: "80vw", height: "80vh" }}>
        <div className="relative" style={{ width: "auto", height: "85%" }}>
          {!cropWidth || !cropHeight ? (
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropShape={rounded ? "round" : "rect"}
            />
          ) : (
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: cropWidth, height: cropHeight }}
              cropShape={rounded ? "round" : "rect"}
            />
          )}
        </div>
        <div className=" w-full flex items-center justify-center gap-x-4  py-2">
          <input
            id="minmax-range"
            type="range"
            min="0"
            max="5"
            step={0.1}
            className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 w-full md:w-2/3"
            onChange={(e) => setZoom(parseInt(e?.target?.value || "0"))}
          />
          <BtnTxt label="Submit" onClick={handleCrop} />
        </div>
      </div>
    </BasicModal>
  );
};

export default ImageModal;
