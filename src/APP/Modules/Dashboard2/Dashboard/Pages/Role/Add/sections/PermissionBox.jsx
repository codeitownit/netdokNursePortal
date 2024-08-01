const PermissionBox = ({ title = "", children = null }) => {
  return (
    <div className=" p-2 bg-white mt-4">
      <div className="">
        <span>{title}</span>
      </div>
      <div className=" border-2 border-dashed p-2">{children}</div>
    </div>
  );
};

export default PermissionBox;
