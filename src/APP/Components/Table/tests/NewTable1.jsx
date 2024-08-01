import { Table, Tbody, Td, Thead, Thc, Tht, Tr, Tt } from "..";

import maleavatar from "./../../../Assets/imgs/maleavatar.png";

import { BiSolidHome } from "react-icons/bi";

const NewTable = () => {
  return (
    <Table showPagination={true}>
      <Thead>
        <Tht txt="Name" />
        <Tht txt="Email" />
        <Tht txt="Phone" />
        <Tht txt="Address" />
        <Tht txt="Action" />
      </Thead>
      <Tbody>
        <Tr>
          <Td name="Names">
            <div className=" flex items-center gap-x-5 mr-4">
              <img src={maleavatar} />
              <Tt txt="Name" />
            </div>
          </Td>
          <Td name="Email">
            <Tt txt="Email" />
          </Td>
          <Td name="Phone">
            <Tt txt="Phone" />
          </Td>
          <Td name="Address">
            <Tt txt="New Address" />
          </Td>
          <Td name="Actions">
            <div className=" flex items-center gap-x-2">
              <BiSolidHome className=" text-red-500  text-3xl cursor-pointer" />
              <BiSolidHome className=" text-red-500  text-3xl" />
              <BiSolidHome className=" text-red-500  text-3xl" />
            </div>
          </Td>
        </Tr>
        <Tr>
          <Td name="Name">
            <div className=" flex items-center gap-x-5 mr-4">
              <img src={maleavatar} />
              <Tt txt="Name" />
            </div>
          </Td>
          <Td name="Email">
            <Tt txt="Email" />
          </Td>
          <Td name="Phone">
            <Tt txt="Phone" />
          </Td>
          <Td name="Address">
            <Tt txt="New Address" />
          </Td>
          <Td name="Actions">
            <div className=" flex items-center gap-x-2">
              <BiSolidHome className=" text-red-500  text-3xl cursor-pointer" />
              <BiSolidHome className=" text-red-500  text-3xl" />
              <BiSolidHome className=" text-red-500  text-3xl" />
            </div>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default NewTable;
