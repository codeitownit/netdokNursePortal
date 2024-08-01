import React, { useState, useEffect } from "react";
import grayPanel from "../../../../../Components/Container/Container";
import { Tbody, Thead, Table, Tht } from "../../../../../Components/Table";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../../../Components/Table/Pagintation";
import Rows from "./section/Rows";
import useaxios from "../../../../../Hooks/useAxios";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "../../../../../Components/Modals/ConfirmationModal";

const BASEURL = "http://localhost:3234";

function ListDevice() {
  const request = useaxios(BASEURL);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await request({
        method: "GET",
        url: "device",
        params: { page: currentPage, limit: itemsPerPage },
      });

      const { data } = response;
      //console.log("Fetched devices:", data);
      setDevices(data);

      // Uncomment the following line if your API supports total item count
      // setTotalItems(parseInt(response.headers['x-total-count']));
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (devices.length > 0) {
      //console.log("Sample device data:", devices[0]);
    }
  }, [devices]);

  const handleAddDeviceClick = (id) => {
    navigate("../device/add");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (id) => {
    if (!id) {
      console.error("Device ID is invalid");
      // Optionally, show a user-friendly error message here
      return; // Exit the function if id is invalid
    }

    setCurrentId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await request({
        method: "DELETE",
        url: "device",
        params: { id: currentId },
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        fetchData();
        toast.success("Deleted successfully");
      } else {
        throw new Error(`Failed to delete item with ID ${currentId}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={grayPanel()}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl mb-10">Device List</h1>
          <AddEdit text={"+ Add Device"} onClick={handleAddDeviceClick} />
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Table>
                <Thead>
                  <Tht txt="ID" />
                  <Tht txt="Is Active" />
                  <Tht txt="Location" />
                  <Tht txt="Location Type" />
                  <Tht txt="Bus Driver Name" />
                  <Tht txt="Bus Driver Number" />
                  <Tht txt="SN" />
                  <Tht txt="Actions" />
                </Thead>
                <Tbody>
                  {devices.map((device, index) => (
                    <Rows
                      key={device.id || index}
                      device_id={device.id}
                      location={device.location}
                      location_type={device.location_type}
                      bus_driver_name={device.bus_driver_name}
                      bus_driver_number={device.bus_driver_no}
                      sn={device.sn}
                      fetchData={fetchData}
                      handleDeleteClick={handleDeleteClick}
                    />
                  ))}
                </Tbody>
              </Table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      <ConfirmationModal
        text={`ARE YOU SURE YOU WANT TO DELETE the item with ID #${currentId}?`}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onCancelClick={() => setShowDeleteModal(false)}
        onConfirmClick={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default ListDevice;
