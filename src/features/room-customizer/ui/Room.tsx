import React from "react";

const Room = () => {
  return (
    <div className="grid grid-rows-8 grid-cols-8 bg-red-500 p-2">
      {Array.from({ length: 64 }).map((_, index) => (
        <div
          key={index}
          className="w-12 h-12 bg-white m-0.5"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Room;
