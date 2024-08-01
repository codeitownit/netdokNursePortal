import React, { useState } from "react";
import TextInput from "../../../../../Components/Inputs/TextInput";
import { IoPersonAddOutline } from "react-icons/io5";
import useaxios from "../../../../../Hooks/useAxios";

const BASEURL = "http://localhost:3234";
function AddDevice() {
  const request = useaxios(BASEURL);
  const [is_active, setIsActive] = useState(true);
  const [location, setLocation] = useState("");
  const [location_type, setLocationType] = useState("");
  const [bus_driver_name, setBusDriverName] = useState("");
  const [bus_driver_no, setBusDriverNo] = useState("");
  const [sn, setSn] = useState("");

  //console.log("is active:", is_active)
  //console.log("location:", location["LOCATION"])
  //console.log("location_type:", location_type["LOCATION TYPE"])
  //console.log("bus driver name:", bus_driver_name["BUS DRIVER NAME"])
  //console.log("bus driver number:", bus_driver_no["BUS DRIVER NUMBER"])
  //console.log("sn:", sn["SN"])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      is_active: is_active,
      location: location["LOCATION"],
      location_type: location_type["LOCATION TYPE"],
      bus_driver_name: bus_driver_name["BUS DRIVER NAME"],
      bus_driver_no: bus_driver_no["BUS DRIVER NUMBER"],
      sn: sn["SN"],
    };

    try {
      const response = await request({
        method: "POST",
        url: "device",
        data: formData,
      });

      setIsActive(true);
      setLocation("");
      setLocationType("");
      setBusDriverName("");
      setBusDriverNo("");
      setSn("");
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add Device</h1>
          <button
            type="submit"
            className="flex items-center border-2 border-black bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-700 transition font-semibold"
          >
            <IoPersonAddOutline className="mr-2" />
            Add Device
          </button>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-4">
            <TextInput
              placeholder="Location"
              label="Location"
              field="LOCATION"
              input={location}
              setInput={setLocation}
              transform="smallcaps"
            />
            <TextInput
              placeholder="Location Type"
              label="Location Type"
              field="LOCATION TYPE"
              input={location_type}
              setInput={setLocationType}
              transform="smallcaps"
            />
          </div>
          <div className="w-1/2 px-2 mb-4">
            <TextInput
              placeholder="Bus Driver Name"
              label="Bus Driver Name"
              field="BUS DRIVER NAME"
              input={bus_driver_name}
              setInput={setBusDriverName}
              transform="smallcaps"
            />
            <TextInput
              placeholder="Bus Driver Number"
              label="Bus Driver Number"
              field="BUS DRIVER NUMBER"
              input={bus_driver_no}
              setInput={setBusDriverNo}
              transform="smallcaps"
            />
            <TextInput
              placeholder="Device Serial Number"
              label="Device Serial Number"
              field="SN"
              input={sn}
              setInput={setSn}
              transform="smallcaps"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDevice;
