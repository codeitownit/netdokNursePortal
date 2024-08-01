import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEdit from '../../../../../Components/Buttons/Add-Edit';
import { outerDiv, headers } from '../../Student/sections/styles';
import { Table, Thead, Tht, Tbody } from '../../../../../Components/Table';
import Pagination from '../../../../../Components/Table/Pagintation';
import Rows3 from './section/Rows';
import useaxios  from '../../../../../Hooks/useAxios';
import ConfirmationModal from '../../../../../Components/Modals/ConfirmationModal'; 

const BASEURL = "http://localhost:3234";

function MemberList() {
  const request = useaxios(BASEURL);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentMemberToDelete, setCurrentMemberToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await request({
          method: "GET",
          url: "member",
          params: {
            order: "id-desc",
          },
          body: {},
          auth: false,
        });

        if (res !== "error") {
          setMembers(res.data);
          setTotalPages(Math.ceil(res.data.length / 10));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleClick = () => {
    navigate("./add");
  };

  const handleEditClick = (member) => {
    navigate("/edit-member", { state: { member } });
  };

  const handleDeleteClick = (member) => {
    setCurrentMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    //console.log("Deleting member:", currentMemberToDelete.id);

    setShowDeleteModal(false);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className={outerDiv}>
      <div className="flex justify-between items-center">
        <h1 className={headers}>Member List</h1>
        <AddEdit text="+ Add Member" onClick={handleClick} />
      </div>
      <div>
        <Table mt={2} loading={loading} showSearch={true} showFilter={true}>
          <Thead>
            <Tht txt="NAME" />
            <Tht txt="GENDER" />
            <Tht txt="EMAIL" />
            <Tht txt="PHONE NO" />
            <Tht txt="ROLE" />
            <Tht txt="CREATED AT" />
            <Tht txt="ACTIONS" />
          </Thead>
          <Tbody>
            {members &&
              members
                .slice((page - 1) * 10, page * 10)
                .map((member, index) => (
                  <Rows3
                    key={index}
                    name={member.name}
                    gender={member.gender.name}
                    email={member.email}
                    phone={member.phone}
                    role={member.role.name}
                    created={member.created_at}
                    handleEditClick={() => handleEditClick(member)}
                    handleDeleteClick={() => handleDeleteClick(member)}
                  />
                ))}
          </Tbody>
        </Table>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      </div>

      
  <ConfirmationModal
  showModal={showDeleteModal}
  setShowModal={setShowDeleteModal}
  title="Delete Member"
  text={`ARE YOU SURE YOU WANT TO DELETE ID #${currentMemberToDelete?.id}:${currentMemberToDelete?.name} with the role of ${currentMemberToDelete?.role}?`}
  onCancelClick={() => setShowDeleteModal(false)}
  onConfirmClick={handleDeleteConfirm}
  confirmText="Delete"
  cancelText="Cancel"
/>
      
    </div>
  );
}

export default MemberList;
