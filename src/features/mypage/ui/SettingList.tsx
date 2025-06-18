import React from "react";
import Auth from "./Auth";
import Setting from "./Setting";
import Acitivity from "./Acitivity";

const SettingList = () => {
  return (
    <div className="flex flex-col   overflow-auto ">
      <Acitivity />
      <Setting />
      <Auth />
    </div>
  );
};

export default SettingList;
