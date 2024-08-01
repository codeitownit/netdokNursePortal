import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { IoPersonAddOutline } from "react-icons/io5";
import grayPanel from "../../../../../Components/Container/Container";
import { headers, divStyle, outerDiv } from "../sections/style";
import useaxios from "../../../../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../../../Components/Inputs/TextInput";
import { SelectInput, TextArea } from "../../../../../Components/Inputs";

// eslint-disable-next-line react/prop-types
function AddDischarge({ text = "Add Class" }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [streams, setStreams] = useState([]);
  const [members, setMembers] = useState([]);
  const [streamId, setStreamId] = useState(1);
  const [memberId, setMemberId] = useState(1);
  const [createdId, setCreatedId] = useState(1);

  const navigate = useNavigate();
  const request = useaxios();

  useEffect(() => {
    async function fetchStream() {
      try {
        const res = await request({
          method: "GET",
          url: "streams",

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

    fetchStream();
  }, []);

  useEffect(() => {
    async function fetchMember() {
      try {
        const res = await request({
          method: "GET",
          url: "member",

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

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name: name.textInput.toLowerCase(),
      description: description.toLowerCase(),
      stream_id: parseInt(streamId),
      member_id: parseInt(memberId),
      created_by_member: 3,
    };

    console.log(formData);

    const res = await request({
      method: "POST",
      url: "classes",
      data: formData,
      auth: false,
    });

    console.log(res);

    if (res !== "error") {
      navigate(`/dashboard/classes`);
      return;
    }
  }
  return (
    <div className={grayPanel()}>
      <div className="">
        <form className={outerDiv} type="submit" onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-between items-center">
            <h1 className={headers}>Add Class</h1>
            <AddEdit text={text} icon={<IoPersonAddOutline />} type="submit" />
          </div>
          <div className={divStyle}>
            <TextInput
              label="Class Name"
              value={name.textInput}
              setInput={setName}
              directInput={false}
              input={name}
            />

            <TextInput
              label="Description"
              directInput={true}
              required={false}
              stateInput={description}
              setStateInput={setDescription}
            />

            {/* <input
              className=""
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            /> */}
            {/* <label htmlFor="stream_id">Streams:</label> */}
            {/* <select
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
            </select> */}
            <SelectInput
              directInput={true}
              required={false}
              stateInput={streamId}
              setStateInput={setStreamId}
              label="Streams"
            >
              <option disabled={true} value={""}>
                Select Strean
              </option>
              {streams.map((stream) => (
                <option key={stream.id} value={stream.id}>
                  {stream.name}
                </option>
              ))}
            </SelectInput>
            {/* <label htmlFor="member_id">Members:</label>
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
            </select> */}
            <SelectInput
              directInput={true}
              stateInput={memberId}
              setStateInput={setMemberId}
              label="Class Teacher"
            >
              {/* <option>Select Class Teacher</option> */}
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </SelectInput>
            {/* <label htmlFor="member_id" className=" mt-2">
              Created by:
            </label>
            <select
              id="created_id"
              name="created_id"
              value={createdId}
              onChange={(e) => {
                setCreatedId(parseInt(e.target.value));
              }}
            >
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

export default AddDischarge;
