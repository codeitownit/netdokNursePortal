import React, { useState, useEffect } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import TextInput from "../../../../../Components/Inputs/TextInput";
import useaxios from "../../../../../Hooks/useAxios";

const BASEURL = "http://localhost:3234";

function AddMember() {
  const request = useaxios(BASEURL);
  const [is_active, setIsActive] = useState(true);
  const [name, setName] = useState({ textInput: "" });
  const [genderId, setGenderId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState("");
  const [password, setPassword] = useState("");

  const [allRoles, setAllRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  async function getRoles() {
    const res = await request({
      method: "GET",
      url: "role",
      params: {
        page: 1,
        limit: 10000,
      },
    });

    if (res === "error") return;
    setAllRoles(res?.data || []);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = {
      is_active,
      name: name.textInput.trim(),
      gender_id: genderId ? parseInt(genderId) : null,
      email: email.textInput,
      phone: phone.textInput,
      role_id: roleId ? parseInt(roleId) : null,
      password: password.textInput,
    };

    const response = await request({
      method: "POST",
      url: "member",
      data: memberData,
    });

    if (response === "error") return;

    setName("");
    setGenderId("");
    setEmail("");
    setPhone("");
    setRoleId("");
    setPassword("");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add Member</h1>
          <button
            type="submit"
            className="flex items-center border-2 border-black bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-700 transition font-semibold"
          >
            <IoPersonAddOutline className="mr-2" />
            Add Member
          </button>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-4">
            <TextInput
              placeholder="Name"
              label="Name"
              field="textInput"
              input={name}
              setInput={setName}
              transform="smallcaps"
            />
            <TextInput
              placeholder="Email"
              label="Email"
              input={email}
              setInput={setEmail}
              transform="smallcaps"
            />

            <label htmlFor="roleId">Role:</label>
            <select
              id="roleId"
              name="roleId"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="block w-full p-2 border border-gray-200 rounded mt-2"
            >
              <option value="" disabled>
                Select a role
              </option>
              {allRoles.map((role, i) => {
                return (
                  <option key={role?.id || i} value={role?.id || ""}>
                    {role?.name || ""}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-1/2 px-2 mb-4">
            <label htmlFor="genderId">Gender:</label>
            <select
              id="genderId"
              name="genderId"
              value={genderId}
              onChange={(e) => setGenderId(e.target.value)}
              className="block w-full p-2 border border-gray-200 rounded mt-2"
            >
              <option value="">Select a gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>

            <TextInput
              placeholder="Phone number"
              label="Phone number"
              input={phone}
              setInput={setPhone}
              transform="smallcaps"
            />
            <TextInput
              placeholder="Password"
              label="Password"
              input={password}
              setInput={setPassword}
              type="password"
              transform="smallcaps"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddMember;
