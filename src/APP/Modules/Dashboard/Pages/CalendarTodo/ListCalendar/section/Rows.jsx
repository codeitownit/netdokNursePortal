import React from "react";
import { MdDelete } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { Tr, Td, Tt } from "../../../../../../Components/Table";

function Rows({
    device_id, is_active, location, location_type, 
    bus_driver_name, bus_driver_number, sn, 
    handleDeleteClick 
}) {
  if (device_id === undefined || device_id === null) {
    console.error("Error: device_id is undefined or null");
}

    return (
        <>
            <Tr>
                <Td name="ID">
                    <Tt txt={`#${device_id}`} />
                </Td>
                <Td name="is_active">
                    <Tt txt={is_active} />
                </Td>
                <Td name="Location">
                    <Tt txt={location} />
                </Td>
                <Td name="Location Type">
                    <Tt txt={location_type} />
                </Td>
                <Td name="Bus Driver Name">
                    <Tt txt={bus_driver_name} />
                </Td>
                <Td name="Bus Driver Number">
                    <Tt txt={bus_driver_number} />
                </Td>
                <Td name="sn">
                    <Tt txt={sn} />
                </Td>
                <Td name="ACTIONS">
                    <span className="flex gap-x-4 items-center text-4xl">
                        <span 
                            className="cursor-pointer active:opacity-50 text-red-600 text-3xl" 
                            onClick={() => handleDeleteClick(device_id)}>
                            <MdDelete />
                        </span>
                        <span className="cursor-pointer active:opacity-50 text-blue-600">
                            <FaRegComments />
                        </span>
                    </span>
                </Td>
            </Tr>
        </>
    );
}

export default Rows;
