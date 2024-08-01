const className = "rounded-3xl  flex items-center gap-2 align-middle justify-center font-sans text-base ";
const outlineStyle = "border-[1px] border-solid active:bg-opacity-5";

const btnClassInitial = className;

const btnClass = {
  primary: {
    false: `${btnClassInitial} w-auto text-white bg-primary`,
    true: `${btnClassInitial} ${outlineStyle} 
                text-primary active:bg-primary border-primary active:text-white`,
  },
  secondary: {
    false: `${btnClassInitial}  
  text-white text-base bg-secondary`,
    true: `${btnClassInitial} ${outlineStyle} 
  text-secondary active:bg-secondary border-secondary`,
  },

  red: {
    false: `${btnClassInitial} w-auto text-white bg-red-500 `,
    true: `${btnClassInitial} ${outlineStyle} 
                text-primary active:bg-primary border-bg-red-500 active:text-white`,
  },
};

const btnSizes = {
  block: `w-full`,
  auto: `w-fit`,
};

const btnPadding = {
  lg: "px-4 py-3",
  sm: "px-3 py-2",
  xsm: "px-1 py-1",
};

const btnNames = ["secondary", "primary"];

const btnSizeNames = ["block", "auto"];

const btnOutlineOptions = ["true", "false"];

const btnPaddingNames = ["lg", "sm"];

export {
  btnClass,
  btnNames,
  btnSizes,
  btnSizeNames,
  btnOutlineOptions,
  btnPadding,
  btnPaddingNames,
};
