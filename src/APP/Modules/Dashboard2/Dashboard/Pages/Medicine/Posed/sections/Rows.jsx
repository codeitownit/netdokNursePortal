/* eslint-disable react/prop-types */
import { Tr, Td, Tt } from "../../../../../../Components/Table";

function Rows({name="", form = "", dose = "", quantity="", fetchData}) {

  return (
    <>
      <Tr>
      <Td name="MEDICINE NAME">
        <Tt txt={name} />
      </Td>
      <Td txt="FORMULATION">
      <Tt txt={form} />
      </Td>
      <Td name="DOSE">
        <Tt txt={dose} />
      </Td>
      <Td name="QUANTITY">
        <Tt txt={quantity} />
      </Td>
    </Tr>
</>
  );
}

export default Rows;