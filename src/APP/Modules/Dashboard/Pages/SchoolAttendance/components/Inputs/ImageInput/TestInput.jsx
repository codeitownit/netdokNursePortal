import { useState } from "react";

import ImageInput from ".";

const TestInput = () => {
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  return (
    <ImageInput
      src={src}
      setSrc={setSrc}
      file={file}
      setFile={setFile}
      croppedFile={croppedFile}
      setCroppedFile={setCroppedFile}
      rounded={true}
      cropWidth={200}
      cropHeight={200}
    />
  );
};

export default TestInput;
