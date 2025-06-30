import React from "react";
import Auth from "./Auth";
import Setting from "./Setting";
import Activity from "./Acitivity";

const SettingList = () => {
  return (
    <div className="flex flex-col">
      <Activity />
      <Setting />
      <Auth />
    </div>
  );
};

export default SettingList;
