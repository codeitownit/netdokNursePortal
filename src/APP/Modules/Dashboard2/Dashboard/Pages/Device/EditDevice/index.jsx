import React, { useState } from "react";
import TextInput from "../../../../../Components/Inputs/TextInput";
import grayPanel from "../../../../../Components/Container/Container";
import { IoPersonAddOutline } from "react-icons/io5";
import useaxios from "../../../../../Hooks/useAxios";

const BASEURL = "http://localhost:3234";

function EditDevice() {
  const request = useaxios(BASEURL);
  const [is_active, setIsActive] = useState(true);
  const [location, setLocation] = useState("");
  const [location_type, setLocationType] = useState("");
  const [bus_driver_name, setBusDriverName] = useState("");
  const [bus_driver_no, setBusDriverNo] = useState("");
  const [device_serial_no, setDeviceSerialNo] = useState("");

  const [editDeviceSerialNo, setEditDeviceSerialNo] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editLocationType, setEditLocationType] = useState(false);
  const [editBusDriverName, setEditBusDriverName] = useState(false);
  const [editBusDriverNo, setEditBusDriverNo] = useState(false);

  //console.log("is active:", is_active);
  //console.log("location:", location);
  //console.log("location type:", location_type);
  //console.log("bus driver name:", bus_driver_name);
  //console.log("bus driver number:", bus_driver_no);
  //console.log("device serial number:", device_serial_no);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      is_active: is_active,
      location: location,
      location_type: location_type,
      bus_driver_name: bus_driver_name,
      bus_driver_no: bus_driver_no,
      device_serial_no: device_serial_no,
    };

    try {
      const response = await request({
        method: "PUT",
        url: "/device",
        body: formData,
        showLoader: true,
      });

      if (response.status === 200 || response.status === 201) {
        //console.log("Successfully edited the device:", response.data);
      } else {
        console.error("Response received but not successful:", response);
      }
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Device</h1>
          <button
            type="submit"
            className="flex items-center border-2 border-black bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-700 transition font-semibold"
          >
            <IoPersonAddOutline className="mr-2" />
            Edit Device
          </button>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold">Device ID</label>
              <button
                onClick={() => setEditDeviceSerialNo(true)}
                className="text-xs text-blue-500"
              >
                Edit
              </button>
            </div>
            <TextInput
              label=""
              placeholder="Device ID"
              field="DEVICE ID"
              input={device_serial_no}
              setInput={setDeviceSerialNo}
              disabled={!editDeviceSerialNo}
            />

            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold">Location</label>
              <button
                onClick={() => setEditLocation(true)}
                className="text-xs text-blue-500"
              >
                Edit
              </button>
            </div>
            <TextInput
              label=""
              placeholder="Location"
              field="LOCATION"
              input={location}
              setInput={setLocation}
              disabled={!editLocation}
            />

            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold">Location Type</label>
              <button
                onClick={() => setEditLocationType(true)}
                className="text-xs text-blue-500"
              >
                Edit
              </button>
            </div>
            <TextInput
              label=""
              placeholder="Location Type"
              field="LOCATION TYPE"
              input={location_type}
              setInput={setLocationType}
              disabled={!editLocationType}
            />
          </div>

          <div className="w-1/2 px-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold">Bus Driver Name</label>
              <button
                onClick={() => setEditBusDriverName(true)}
                className="text-xs text-blue-500"
              >
                Edit
              </button>
            </div>
            <TextInput
              label=""
              placeholder="Bus Driver Name"
              field="BUS DRIVER NAME"
              input={bus_driver_name}
              setInput={setBusDriverName}
              disabled={!editBusDriverName}
            />

            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold">Bus Driver Number</label>
              <button
                onClick={() => setEditBusDriverNo(true)}
                className="text-xs text-blue-500"
              >
                Edit
              </button>
            </div>
            <TextInput
              label=""
              placeholder="Bus Driver Number"
              field="BUS DRIVER NUMBER"
              input={bus_driver_no}
              setInput={setBusDriverNo}
              disabled={!editBusDriverNo}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditDevice;
