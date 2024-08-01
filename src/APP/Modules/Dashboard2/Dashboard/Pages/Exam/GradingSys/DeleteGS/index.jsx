import grayPanel from "../../../../../../Components/Container/Container";
import { outerDiv } from "../../sections/style";
import AddEdit from "../../../../../../Components/Buttons/Add-Edit";
import { MdOutlineDelete } from "react-icons/md";
import useaxios from "../../../../../../Hooks/useAxios";

function DeleteGS({ id }) {
  const axiosInstance = useaxios();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.request({
        method: "DELETE",
        url: `grading_system_subject/${id}`,
        showLoader: true,
        showError: true,
      });

      //console.log('Delete successful:', response);
    } catch (error) {
      console.error("Error deleting grading system:", error);
    }
  };
  return (
    <div className={grayPanel()}>
      <div className={outerDiv}>
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-col px-12 pt-12 pb-8 font-bold bg-zinc-300 max-w-[800px] rounded-[100px] max-md:px-5">
            <div className="self-center mt-6 text-5xl text-black max-md:text-4xl">
              Deleting Grading System
            </div>
            <div className="flex gap-5 justify-between mt-2 max-w-full text-slate-500 w-[487px] md:flex-wrap">
              <div className="flex flex-col flex-1">
                <div className="text-4xl">
                  <span className="text-5xl">End Terms</span>
                </div>
                <div className="flex gap-5 justify-between mt-7 text-xl">
                  <div>Code:</div>
                  <div className="flex-auto">Physics - 204</div>
                </div>
              </div>
              <div className="flex gap-2.5 self-end mt-16 text-xl whitespace-nowrap max-md:mt-10">
                <div className="grow">No of Students:</div>
                <div>38</div>
              </div>
            </div>
            <div className="self-stretch mt-8 w-full h-px bg-black max-md:mr-1" />
            <div className="flex gap-5 justify-between items-start mt-5 max-w-full whitespace-nowrap w-[496px] max-md:flex-wrap">
              <div className="flex gap-5 justify-between items-center text-xl text-gray-400">
                <div className="grow self-stretch my-auto tracking-wide">
                  Class Teacher:
                </div>
                <div className="grow justify-center self-stretch px-2.5 py-2 text-base text-black bg-secondary rounded-2xl">
                  Miss M
                </div>
                <div className="self-stretch my-auto tracking-wide">
                  Present:
                </div>
              </div>
              <div className="justify-center px-5 py-2.5 text-base text-black bg-secondary rounded-2xl aspect-[2.32]">
                100%
              </div>
            </div>
            <div className="flex gap-5 justify-between items-start mt-6 max-w-full text-xl text-gray-400 whitespace-nowrap w-[496px] max-md:flex-wrap">
              <div className="mt-3.5 tracking-wide">Class Level:</div>
              <div className="justify-center px-3.5 py-2.5 text-base text-black bg-secondary rounded-2xl aspect-[2.61]">
                Form 1
              </div>
              <div className="mt-3 tracking-wide">Class:</div>
              <div className="justify-center px-6 py-2.5 mt-1 text-base text-black bg-secondary rounded-2xl aspect-[2.32] max-md:px-5">
                4B
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
    </div>
  );
}

export default DeleteGS;
