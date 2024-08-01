import { useState, useEffect } from "react";
import { TextArea, TextInput } from "../../../../../Components/Inputs";
import PermissionBox from "../Add/sections/PermissionBox";
import SinglePermissionArea from "../Add/sections/SinglePermissionArea";
import Button from "../../../../../Components/Buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import useaxios from "../../../../../Hooks/useAxios";

const permissions = [
  {
    title: "USERS",
    description: "This is the User's permissions",
    id: "users",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a name",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single item",
        status: false,
      },
    ],
  },
  {
    title: "EXAMS",
    id: "exams",
    description: "This is the exams permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add an exam",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit an exam",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete an exam",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single exam",
        status: false,
      },
    ],
  },
  {
    title: "CLASS",
    id: "class",
    description: "This is the Class permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a class",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a class",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete class",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single class",
        status: false,
      },
    ],
  },
  {
    title: "CLASS STUDENT",
    id: "classStudent",
    description: "This is the classStudent's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a classStudent",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a classStudent",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a classStudent",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single classStudent",
        status: false,
      },
    ],
  },
  {
    title: "CLASS SUBJECT",
    id: "classSubject",
    description: "This is the classSubject's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a classSubject",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a classSubject",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a classSubject",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single classSubject",
        status: false,
      },
    ],
  },
  {
    title: "EXAM GRADE",
    id: "examGrade",
    description: "This is the examGrade's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add an examGrade",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit an examGrade",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete an examGrade",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single examGrade",
        status: false,
      },
    ],
  },
  {
    title: "EXAM STUDENT",
    id: "examStudent",
    description: "This is the examStudent's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add an examStudent",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit an examStudent",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete an examStudent",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single examStudent",
        status: false,
      },
    ],
  },
  {
    title: "GRADING SYSTEM",
    id: "gradingSystem",
    description: "This is the gradingSystem's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a gradingSystem",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a gradingSystem",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a gradingSystem",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single gradingSystem",
        status: false,
      },
    ],
  },
  {
    title: "GENDER",
    id: "gender",
    description: "This is the gender's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a gender",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a gender",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single gender",
        status: false,
      },
    ],
  },
  {
    title: "BLOOD GROUP",
    id: "bloodGroup",
    description: "This is the bloodGroup's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a bloodGroup",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a bloodGroup",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single bloodGroup",
        status: false,
      },
    ],
  },
  {
    title: "MEDICAL PREFERENCES",
    id: "medicalPreferences",
    description: "This is the medicalPreferences's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a medicalPreferences",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit medicalPreferences",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete  medicalPreferences",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a single or list of medicalPreferences",
        status: false,
      },
    ],
  },
  {
    title: "MEMBER",
    id: "member",
    description: "This is the member's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a member",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a member",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a member",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single member",
        status: false,
      },
    ],
  },
  {
    title: "MEMBER CLASS",
    id: "memberClass",
    description: "This is the memberClass's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a memberClass",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a memberClass",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a memberClass",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single memberClass",
        status: false,
      },
    ],
  },
  {
    title: "MEMBER PIC",
    id: "memberPic",
    description: "This is the memberPic's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a memberPic",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a memberPic",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a memberPic",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single memberPic",
        status: false,
      },
    ],
  },
  {
    title: "PARENT",
    id: "parent",
    description: "This is the parent's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a parent",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a parent",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a parent",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single parent",
        status: false,
      },
    ],
  },
  {
    title: "PARENT STUDENT",
    id: "parentStudent",
    description: "This is the parentStudent's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a parentStudent",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a parentStudent",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a parentStudent",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single parentStudent",
        status: false,
      },
    ],
  },
  {
    title: "REPORT FORM",
    id: "reportForm",
    description: "This is the reportForm's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a reportForm",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a reportForm",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a reportForm",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single reportForm",
        status: false,
      },
    ],
  },
  {
    title: "REPORT FORM SUBJECT",
    id: "reportFormSubject",
    description: "This is the reportFormSubject's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a reportFormSubject",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a reportFormSubject",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a reportFormSubject",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single reportFormSubject",
        status: false,
      },
    ],
  },
  {
    title: "REPORT GRADE",
    id: "reportGrade",
    description: "This is the reportGrade's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a reportGrade",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a reportGrade",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a reportGrade",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single reportGrade",
        status: false,
      },
    ],
  },
  {
    title: "STUDENT MEDICAL RECORD",
    id: "studentMedicalRecord",
    description: "This is the studentMedicalRecord's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a studentMedicalRecord",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a studentMedicalRecord",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a studentMedicalRecord",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single studentMedicalRecord",
        status: false,
      },
    ],
  },
  {
    title: "STREAM",
    id: "stream",
    description: "This is the stream's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a stream",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a stream",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a stream",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single stream",
        status: false,
      },
    ],
  },
  {
    title: "STUDENT DEVICE",
    id: "studentDevice",
    description: "This is the studentDevice's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a studentDevice",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a studentDevice",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a studentDevice",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single studentDevice",
        status: false,
      },
    ],
  },
  {
    title: "STUDENT PICTURE",
    id: "studentPicture",
    description: "This is the studentPicture's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a studentPicture",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a studentPicture",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a studentPicture",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single studentPicture",
        status: false,
      },
    ],
  },
  {
    title: "STUDENT SUBJECT",
    id: "studentSubject",
    description: "This is the studentSubject's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a studentSubject",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a studentSubject",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a studentSubject",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single studentSubject",
        status: false,
      },
    ],
  },
  {
    title: "STUDENT",
    id: "student",
    description: "This is the student's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a student",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a student",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a student",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single student",
        status: false,
      },
    ],
  },
  {
    title: "SUBJECT",
    id: "subject",
    description: "This is the subject's permissions",
    other: [
      {
        title: "Add",
        id: "add",
        description: "User can add a subject",
        status: false,
      },
      {
        title: "Edit",
        id: "edit",
        description: "User can edit a subject",
        status: false,
      },
      {
        title: "Delete",
        id: "delete",
        description: "User can delete a subject",
        status: false,
      },
      {
        title: "Get",
        id: "get",
        description: "User can get a list/ a single subject",
        status: false,
      },
    ],
  },
];

function EditRole() {
  const { id } = useParams();
  const request = useaxios();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissionsObj, setPermissions] = useState({
    users: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    roles: {
      add: false,
      edit: false,
    },
    exams: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    class: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    classStudent: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    classSubject: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    examGrade: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    examStudent: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    gradingSystem: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    gender: {
      add: false,
      edit: false,
      get: false,
    },
    bloodGroup: {
      add: false,
      edit: false,
      get: false,
    },
    medicalPreferences: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    member: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    memberClass: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    memberPic: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    parent: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    parentStudent: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    reportForm: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    reportFormSubject: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    reportGrade: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    studentMedicalRecord: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    stream: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    studentDevice: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    studentPicture: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    studentSubject: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    student: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
    subject: {
      add: false,
      edit: false,
      delete: false,
      get: false,
    },
  });

  // useEffect(() => {
  //   fetch(`${BASE_API}/role?id=${id}`)

  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch role data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setName(data.data.name);
  //       setDescription(data.data.description);
  //       setPermissions(data.data.permissions);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching role data:", error);
  //     });
  // }, [id]);

  const handleEditRole = async () => {
    const roleData = {
      name: name.toLowerCase(),
      description: description,
      permissions: permissionsObj,
    };

    try {
      const response = await request({
        method: "PUT",
        url: "role",
        params: { id },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleData),
      });
      if (response === "error") {
        throw new Error("Failed to update role");
      }
      //console.log("Role updated successfully");
      navigate("/dashboard/role");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="w-full h-full mt-9">
      <div className="bg-white p-4 rounded-md shadow-md">
        <TextInput
          label="ROLE NAME:"
          placeholder="Type the name of the role..."
          directInput={true}
          required={true}
          stateInput={name}
          setStateInput={setName}
        />
        <TextArea
          label="DESCRIPTION:"
          placeholder="Enter your description..."
          directInput={true}
          setStateInput={setDescription}
          stateInput={description}
        />
      </div>

      <div>
        {permissions.map((singlePermission, index) => (
          <PermissionBox key={index} title={singlePermission?.title || ""}>
            {singlePermission.other.map((permissions, index) => (
              <SinglePermissionArea
                key={index}
                title={permissions?.title || ""}
                description={permissions?.description || ""}
                mainPerks={singlePermission}
                perks={permissions}
                setPermissions={setPermissions}
                permissionsObj={permissionsObj}
              />
            ))}
          </PermissionBox>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleEditRole}
          text="EDIT ROLE"
          style={{
            color: "white",
            fontFamily: "Impact",
            border: "3px solid black",
            backgroundColor: "#EEAD49",
            padding: "5px 7px",
            marginTop: "10px",
            borderRadius: "10px",
            fontSize: "20px",
          }}
        />
      </div>
    </div>
  );
}

export default EditRole;
