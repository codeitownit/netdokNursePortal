/* eslint-disable no-unused-vars */
import { useState } from "react";

import Cropper from "react-easy-crop";

import BtnTxt from "../Buttons/BtnTxt";

import BasicModal from "../../Modals/BasicModal";

const ImageInput = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    ////console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <BasicModal showModal={true} setShowModal={() => {}}>
      <div className="" style={{ width: "80vw", height: "80vh" }}>
        <div className="relative" style={{ width: "auto", height: "85%" }}>
          <Cropper
            image={
              "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            }
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
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

          <BtnTxt label="Submit" />
        </div>
      </div>
    </BasicModal>
  );
};

export default ImageInput;
