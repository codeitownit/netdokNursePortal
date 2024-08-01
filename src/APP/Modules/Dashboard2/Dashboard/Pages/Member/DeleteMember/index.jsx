import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useaxios from '../../../../../Hooks/useAxios';
import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv } from "../../Student/sections/styles";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { MdOutlineDelete } from "react-icons/md";

const BASEURL = "http://localhost:3234";

function DeleteMember({ member }) {
    const navigate = useNavigate();
    const request = useaxios(BASEURL);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 

  const handleDelete = async () => {
    try {
      const response = await request({
        method: "DELETE",
        url: `/member/${member.id}`,
      });

      if (response.status === 200 || response.status === 204) {
        //console.log('Member deleted successfully');
        navigate("/path-to-member-list");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div className={grayPanel()}>
      <div className={outerDiv}>
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-col px-12 pt-12 pb-8 font-bold bg-zinc-300 max-w-[800px] rounded-[100px] max-md:px-5">
            <div className="self-center mt-6 text-5xl text-black max-md:text-4xl">
              Deleting Member
            </div>
            <div className="flex gap-5 justify-between mt-2 max-w-full text-slate-500 w-[487px] md:flex-wrap">
              <div className="flex flex-col flex-1">
                <div className="text-4xl">
                  <div>Name:</div>
                  <div className="text-5xl">{member?.name}</div>
                </div>
                <div className="flex gap-5 justify-between mt-7 text-xl">
                  <div>Role:</div>
                  <div className="flex-auto">{member?.role}</div>
                </div>
              </div>
            </div>
            <div className="self-stretch mt-8 w-full h-px bg-black max-md:mr-1" />
            <div className="flex gap-5 justify-between items-start mt-5 max-w-full whitespace-nowrap w-[496px] max-md:flex-wrap">
              <div className="flex gap-5 justify-between items-center text-xl text-gray-400">
                <div className="grow self-stretch my-auto tracking-wide">
                  Phone:
                </div>
                <div className="grow justify-center self-stretch px-2.5 py-2 text-base text-black bg-secondary rounded-2xl">
                  {member?.phone}
                </div>
                <div className="self-stretch my-auto tracking-wide">
                  Subject:
                </div>
              </div>
              <div className="justify-center px-5 py-2.5 text-base text-black bg-secondary rounded-2xl aspect-[2.32]">
                {member?.subject}
              </div>
            </div>
            <div className="flex gap-5 justify-between items-start mt-6 max-w-full text-xl text-gray-400 whitespace-nowrap w-[496px] max-md:flex-wrap">
              <div className="mt-3.5 tracking-wide">Class Level:</div>
              <div className="justify-center px-3.5 py-2.5 text-base text-black bg-secondary rounded-2xl aspect-[2.61]">
                {member?.classLevel}
              </div>
              <div className="mt-3 tracking-wide">Stream:</div>
              <div className="justify-center px-6 py-2.5 mt-1 text-base text-black bg-secondary rounded-2xl aspect-[2.32] max-md:px-5">
                {member?.stream}
              </div>
            </div>
          </div>
        </div>
        <AddEdit
          text="Delete"
          icon={<MdOutlineDelete />}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default DeleteMember;
