import CheckBox from "../../../../../../Components/Inputs/CheckBox";

import { useState, useEffect } from "react";

function SinglePermissionArea({
  title,
  description,
  mainPerks = {},
  perks = {},
  setPermissions = () => {},
  permissionsObj = {},
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // //console.log("Main perks", mainPerks.id);
    // //console.log("Perks->", perks.id);

    const permissionsObjCopy = { ...permissionsObj };
    const mainObj = permissionsObjCopy[mainPerks.id];

    if (mainObj) {
      //const singlePermission=
      const mainPerk = mainObj[perks?.id];
      if (typeof mainPerk === "boolean") {
        setChecked(mainPerk);
      }
    }
  }, []);

  useEffect(() => {
    const permissionsObjCopy = { ...permissionsObj };

    const mainObj = permissionsObjCopy[mainPerks.id];

    if (mainObj) {
      //const singlePermission=
      let mainPerk = mainObj[perks?.id];
      //console.log(mainPerk);
      if (typeof mainPerk === "boolean") {
        mainObj[perks?.id] = checked;
        // //console.log("permissionsObjCopy", permissionsObjCopy);
        // //console.log(permissionsObjCopy);

        setPermissions(() => permissionsObjCopy);
      }
    }
  }, [checked]);

  //console.log(permissionsObj);

  return (
    <div className=" w-full">
      <div className=" flex flex-wrap w-full justify-between items-center">
        <span className=" text-lg font-semibold">{title}</span>
        <CheckBox
          s={2}
          stateInput={checked}
          setStateInput={setChecked}
          directInput={true}
        />
      </div>
      <div className=" opacity-30 text-base">{description}</div>
    </div>
  );
}

export default SinglePermissionArea;
