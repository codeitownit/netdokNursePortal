import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextInput from "../../../../../Components/Inputs/TextInput";
import { IoPersonAddOutline } from "react-icons/io5";
import useaxios from "../../../../../Hooks/useAxios";

const BASEURL = "http://localhost:3234";

function EditMember() {
  const request = useaxios(BASEURL);
  const { state } = useLocation();
  const member = state?.member;
  const [name, setName] = useState("");
  const [genderId, setGenderId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState("");
  const [password, setPassword] = useState("");

  const [editName, setEditName] = useState(false);
  const [editGenderId, setEditGenderId] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editRoleId, setEditRoleId] = useState(false);

  useEffect(() => {
    // Update state if member data changes
    setName(member?.name || "");
    setGenderId(member?.gender_id || "");
    setEmail(member?.email || "");
    setPhone(member?.phone || "");
    setRoleId(member?.role_id || "");
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log("Name:", name);
    //console.log("Gender ID:", genderId);
    //console.log("Email:", email);
    //console.log("Phone:", phone);
    //console.log("Role ID:", roleId);
    //console.log("Password:", password);

    const memberData = {
      name: name,
      gender_id: genderId,
      email: email,
      phone: phone,
      role_id: roleId,
      password: password,
    };

    try {
      const response = await request({
        method: "PUT",
        url: "member",
        body: memberData,
        showLoader: true,
      });

      if (response.status === 200 || response.status === 201) {
        //console.log("Successfully edited the member:", response.data);
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
          <h1 className="text-2xl font-bold">Edit Member</h1>
          <button
            type="submit"
            className="flex items-center border-2 border-black bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-700 transition font-semibold"
          >
            <IoPersonAddOutline className="mr-2" />
            Edit Member
          </button>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-1/2 px-2 mb-4">
            <EditableField
              label="Name"
              value={name}
              setValue={setName}
              editState={editName}
              setEditState={setEditName}
            />
            <EditableField
              label="Gender ID"
              value={genderId}
              setValue={setGenderId}
              editState={editGenderId}
              setEditState={setEditGenderId}
            />
            <EditableField
              label="Email"
              value={email}
              setValue={setEmail}
              editState={editEmail}
              setEditState={setEditEmail}
            />
          </div>
          <div className="w-1/2 px-2 mb-4">
            <EditableField
              label="Phone"
              value={phone}
              setValue={setPhone}
              editState={editPhone}
              setEditState={setEditPhone}
            />
            <EditableField
              label="Role ID"
              value={roleId}
              setValue={setRoleId}
              editState={editRoleId}
              setEditState={setEditRoleId}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

function EditableField({
  label,
  value,
  setValue,
  editState,
  setEditState,
  type = "text",
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-bold">{label}</label>
        <button
          onClick={() => setEditState(!editState)}
          className="text-xs text-blue-500"
        >
          {editState ? "Done" : "Edit"}
        </button>
      </div>
      <TextInput
        label=""
        placeholder={label}
        field={label.toUpperCase()}
        input={value}
        setInput={setValue}
        disabled={!editState}
        type={type}
      />
    </div>
  );
}

export default EditMember;
