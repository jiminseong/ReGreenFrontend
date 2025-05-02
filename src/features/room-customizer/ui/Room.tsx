import React from "react";

const Room = () => {
  return (
    <div className="relative w-[350px] h-[350px] flex items-center justify-center">
      <div
        className="w-full h-full bg-lpink m-1"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      ></div>
      <div className="absolute top-0 w-full h-full grid grid-cols-[repeat(17,_20px)] grid-rows-[repeat(17,_20px)]">
        {Array.from({ length: 17 * 17 }).map((_, index) => (
          <div
            key={index}
            className="border border-[#ff99cc]"
            style={{ width: "20px", height: "20px" }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Room;
