import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useaxios from "../../../../../Hooks/useAxios";
import grayPanel from "../../../../../Components/Container/Container";

function DeleteDevice() {
  const { device_id } = useParams();
  const navigate = useNavigate();
  const request = useaxios("http://localhost:3234");
  const [isLoading, setIsLoading] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState(null);

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const response = await request({
          method: "GET",
          url: `/device/${device_id}`,
        });
        setDeviceDetails(response.data);
      } catch (error) {
        console.error("Error fetching device details:", error);
      }
    };

    fetchDeviceDetails();
  }, [device_id, request]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await request({
        method: "DELETE",
        url: `/device/${device_id}`,
      });
      //console.log(`Device with ID: ${device_id} deleted`);
      navigate("/device-list");
    } catch (error) {
      console.error("Error deleting device:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={grayPanel()}>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl mb-4">Delete Device</h1>
        <p>Are you sure you want to delete this device?</p>
        {deviceDetails && (
          <ul className="mb-4">
            <li>ID: {deviceDetails.device_id}</li>
            <li>Is Active: {deviceDetails.is_active ? "Yes" : "No"}</li>
            <li>Location: {deviceDetails.location}</li>
            <li>Location Type: {deviceDetails.location_type}</li>
            <li>Bus Driver Name: {deviceDetails.bus_driver_name}</li>
            <li>Bus Driver Number: {deviceDetails.bus_driver_number}</li>
            <li>Serial Number: {deviceDetails.sn}</li>
          </ul>
        )}
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="your-delete-button-class"
        >
          {isLoading ? "Deleting..." : "Yes, Delete"}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="your-cancel-button-class"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteDevice;
