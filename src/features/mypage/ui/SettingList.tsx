import React from "react";
import Auth from "./Auth";
import Setting from "./Setting";
import Acitivity from "./Acitivity";

const SettingList = () => {
  return (
    <div className="flex flex-col border-t-8 mt-12 overflow-auto border-[#EEEEEE]">
      <Acitivity />
      <Setting />
      <Auth />
    </div>
  );
};

export default SettingList;
