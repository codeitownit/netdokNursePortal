import logomin from "./Assets/exhibit-logo-2.png";
import logoFull from "./Assets/exhibit-logo.png";

function Logo({ open = false, setOpen = () => {} }) {
  return (
    <div className=" cursor-pointer my-4" onClick={() => setOpen((c) => !c)}>
      {open ? (
        <div className=" p-2 rounded-xl" style={{ backgroundColor: "#D9D9D9" }}>
          <img className="" style={{ height: "2em" }} src={logoFull} />
        </div>
      ) : (
        <img className=" hover:animate-bounce" src={logomin} />
      )}
    </div>
  );
}
export default Logo;
