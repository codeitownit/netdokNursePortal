import { Thead, Tht } from "./../../../../../Components/Table";

function TableHeader() {
  return (
    <Thead>
      <Tht txt="#" />
      <Tht txt="Student" />
      <Tht txt="Class" />
      <Tht txt="Stream" />
      <Tht txt="Date" />
      <Tht txt="Location" />
      <Tht txt="Device SN" />
      <Tht txt="Actions" />
    </Thead>
  );
}

export default TableHeader;
