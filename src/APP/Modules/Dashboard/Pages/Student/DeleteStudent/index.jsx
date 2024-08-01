import grayPanel from "../../../../../Components/Container/Container";
import { outerDiv } from "../sections/styles";
import AddEdit from "../../../../../Components/Buttons/Add-Edit";
import { MdOutlineDelete } from "react-icons/md";
import useaxios from "../../../../../Hooks/useAxios";
import { useState, useEffect } from "react";


function DeleteStudent({id, setStudents, students}){
    const [student, setStudent] = useState("");
    const request = useaxios();


    useEffect(() => {
        async function fetchStudent(){
            try {
                const res = await request({
                  method: "GET",
                  url: "student_id",
                  params: {id},
                  auth: false,
                  showLoader: false,
                });

                if (res !== "error"){
                    setStudent(res.data)
                }
            } catch (error) {
                console.error("Could not fetch student info", error);
            }
        }
        fetchStudent();
    }, []);

    console.log(student)

    function handleDelete(){
        async function deleteStudent() {
            try {
              const res = await request({
                method: "DELETE",
                url: "students",
                params: {id},
                auth: false,
                showLoader: false,
              });
          
              if (res !== "error") {
                console.log(`Student with ID ${id} has been deleted successfully`);
                let studentData = students.filter((student) => {
                    return student.id !== id
                })
                setStudents(studentData)
              }
            } catch (error) {
              console.error("Error deleting student", error);
            }
        }

        deleteStudent();
          
    }

    return(
        <div className={grayPanel()}>
                <div className={outerDiv}>
                    <div className="flex flex-col justify-between items-center">
                    <div className="flex flex-col px-12 pt-12 pb-8 font-bold bg-zinc-300 max-w-[800px] rounded-[100px] max-md:px-5">
                        <div className="self-center mt-6 text-5xl text-black max-md:text-4xl">
                            Deleting Student
                            </div>    
        <div className="flex gap-5 justify-between mt-2 max-w-full text-slate-500 w-[487px] md:flex-wrap">
            <div className="flex flex-col flex-1">
            <div className="text-4xl">
                <span className="text-5xl">{student.name}</span>
            </div>
            <div className="flex gap-5 justify-between mt-7 text-xl">
                <div>Admission:</div>
                <div className="flex-auto">{student.adm_no}</div>
            </div>
            </div>
            <div className="flex gap-2.5 self-end mt-16 text-xl whitespace-nowrap max-md:mt-10">
            <div className="grow"></div>
            <div></div>
            </div>
        </div>
        <div className="self-stretch mt-8 w-full h-px bg-black max-md:mr-1" />
        <div className="flex gap-5 justify-between items-start mt-5 max-w-full whitespace-nowrap w-[496px] max-md:flex-wrap">
            <div className="flex gap-5 justify-between items-center text-xl text-gray-400">
            <div className="grow self-stretch my-auto tracking-wide">
                Gender:
            </div>
            <div className="grow justify-center self-stretch px-2.5 py-2 text-base text-black bg-secondary rounded-2xl">
                {student && student.gender.name}
            </div>
            <div className="self-stretch my-auto tracking-wide">Blood Group:</div>
            </div>
            <div className="justify-center px-5 py-2.5 text-base text-black bg-secondary rounded-2xl aspect-[2.32]">
            {student && student.blood_group.name}
            </div>
        </div>
        <div className="flex gap-5 justify-between items-start mt-6 max-w-full text-xl text-gray-400 whitespace-nowrap w-[496px] max-md:flex-wrap">
            <div className="mt-3.5 tracking-wide">Class Level:</div>
            <div className="justify-center px-3.5 py-2.5 text-base text-black bg-secondary rounded-2xl aspect-[2.61]">
            {student && student.Renamedclass.name}
            </div>
            <div className="mt-3 tracking-wide">Created by:</div>
            <div className="justify-center px-6 py-2.5 mt-1 text-base text-black bg-secondary rounded-2xl aspect-[2.32] max-md:px-5">
            {student && student.member.name}
            </div>
        </div>
        </div>
            <AddEdit text="Delete" icon={<MdOutlineDelete />} onClick={handleDelete}/>
            </div>
                </div>
    </div>
    )
}

export default DeleteStudent