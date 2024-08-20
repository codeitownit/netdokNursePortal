import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../Components/Container/Container";
import TextInput from "../../../../../Components/Inputs/TextInput";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function EditDischarge({ text = "Edit Class" }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [streams, setStreams] = useState([]);
  const [members, setMembers] = useState([]);
  const [streamId, setStreamId] = useState(1);
  const [memberId, setMemberId] = useState(1);
  const [createdId, setCreatedId] = useState(1);
  const [selected, setSelected] = useState([]);

  const { id } = useParams();

  const request = useaxios();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSelected() {
      try {
        const res = await request({
          method: "GET",
          url: `class_id?id=${id}`,
          data: {},
          auth: false,
        });

        // Check if the response is not an error
        if (res !== "error") {
          setSelected(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchSelected();
  }, []);

  useEffect(() => {
    async function fetchMember() {
      try {
        const res = await request({
          method: "GET",
          url: "member",
          data: {},
          auth: false,
        });

        // Check if the response is not an error
        if (res !== "error") {
          setMembers(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchMember();
  }, []);

  useEffect(() => {
    async function fetchStreams() {
      try {
        const res = await request({
          method: "GET",
          url: "streams",
          data: {},
          auth: false,
        });

        // Check if the response is not an error
        if (res !== "error") {
          setStreams(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchStreams();
  }, []);

  function handleEdit(e) {
    e.preventDefault();
    const formData = {
      name: name,
      description: description,
      stream_id: parseInt(streamId),
      member_id: parseInt(memberId),
      created_by_member: 13,
    };
    async function patch() {
      try {
        const res = await request({
          method: "PUT",
          url: "c",
          params: {
            id,
          },
          data: formData,
          auth: false,
        });
        // Check if the response is not an error
        if (res !== "error") {
          navigate(`/dashboard/c`);
        }
        //console.log("success");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    patch();
  }

  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleEdit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Edit Class</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
            <label htmlFor="">Enter class name</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
                //console.log(name);
              }}
            />
            <br />
            <label htmlFor="">Enter class description</label>
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <label htmlFor="stream_id">Streams:</label>
            <select
              id="stream_id"
              name="stream_id"
              value={streamId}
              onChange={(e) => setStreamId(parseInt(e.target.value))}
            >
              <option value="" className={headers}>
                Select a stream
              </option>
              {streams.map((stream) => (
                <option key={stream.id} value={stream.id}>
                  {stream.name}
                </option>
              ))}
            </select>
            <label htmlFor="member_id">Members:</label>
            <select
              id="member_id"
              name="member_id"
              value={memberId}
              onChange={(e) => setMemberId(parseInt(e.target.value))}
            >
              <option value="" className={headers}>
                Select a member
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
            {/* <label htmlFor="member_id">Created by:</label>
            <select
              id="created_id"
              name="created_id"
              value={createdId}
              onChange={(e) => {
                setCreatedId(parseInt(e.target.value));
              }}
            >
              <option value="" className={headers}>
                Select a member
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDischarge;
