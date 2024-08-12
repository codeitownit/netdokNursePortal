import logomin from "./Assets/exhibit-logo-2.jpeg";
import logoFull from "./Assets/exhibit-logo.jpeg";

function Logo({ open = false, setOpen = () => {} }) {
  return (
    <div className=" cursor-pointer my-4" onClick={() => setOpen((c) => !c)}>
      {open ? (
        <div className=" p-2 rounded-xl" style={{ display: "flex", justifyContent: "center" }}>
          <img className="" style={{ height: "4em" }} src={logoFull} />
        </div>
      ) : (
        <img className=" hover:animate-bounce" style={{ height: "2.5em" }} src={logomin} />
      )}
    </div>
  );
}
export default Logo;
