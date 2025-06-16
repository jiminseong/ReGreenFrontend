"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCoupleInfo } from "../lib/useCoupleInfo";

const NameBoard = () => {
  const { data: userInfo } = useCoupleInfo();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userInfo?.data.name) {
      setName(userInfo.data.name);
    }
  }, [userInfo?.data.name]);

  const handleBlurOrEnter = () => {
    setEditing(false);
    // TODO: postCoupleNickName(name); 등 추가 가능
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  if (!userInfo) return null;

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="bg-[#CA9C61] rounded-md shadow-md  py-2 cursor-text z-1"
        onClick={() => {
          setEditing(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        <input
          ref={inputRef}
          className="text-sm text-center font-semibold bg-transparent border-none focus:outline-none max-w-[120px] truncate p-0 m-0 leading-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!editing}
          onBlur={handleBlurOrEnter}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div
        className="w-[20px] h-[61px] bg-[#A17B4A] mt-[-4px] z-0"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)",
        }}
      />
    </div>
  );
};

export default NameBoard;
