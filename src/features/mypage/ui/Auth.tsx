"use client";
import { http } from "@/shared/lib/http";
import CommonModal from "@/widgets/ComonModal";
import { useRouter } from "next/navigation";
import React from "react";

const Auth = () => {
  const router = useRouter();
  const [brokenModal, setBrokenModal] = React.useState(false);
  const [retireModal, setRetireModal] = React.useState(false);
  const menuItems = [{ label: "로그아웃" }, { label: "헤어지기" }];
  const [retireReason, setRetireReason] = React.useState(0);

  const handleMenuClick = async (label: string) => {
    if (label === "로그아웃") {
      // 로그아웃 처리 로직 추가
      try {
        const res = await http.post("api/auth/logout").json<{
          code: number;
          message: string;
        }>();
        if (res.code === 2000) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/login");
        } else {
        }
      } catch (error) {
        console.error("로그아웃 처리 중 오류 발생:", error);
      }
      return;
    } else if (label === "헤어지기") {
      setBrokenModal(true);
    }
  };

  // 회원탈퇴 처리 로직
  const handleRetire = async () => {
    try {
      const res = await http.delete("api/couples/my").json<{
        code: number;
        message: string;
      }>();
      if (res.code === 2000) {
        await localStorage.removeItem("accessToken");
        await localStorage.removeItem("refreshToken");
        router.push("/");
      } else {
      }
    } catch (error) {
      console.error("회원탈퇴 처리 중 오류 발생:", error);
    }
  };

  const brokenModalInner = (
    <>
      <h2 className="text-xl font-bold ">
        헤어지기<span className="font-normal">(회원탈퇴)</span>
      </h2>
      <div className="mt-5 mb-8 flex flex-col justify-center items-center text-[#555555] font-medium">
        <p>서비스를 이용해주셔서 감사합니다.</p>
        <p> 회원님의 피드백을 알려주시면</p>
        <p> 더욱 건강한 서비스를 제공하겠습니다.</p>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center ">
        {/* 탈퇴 사유 선택 */}
        <input
          type="radio"
          id="reason1"
          name="retireReason"
          value="reason1"
          onChange={() => setRetireReason(1)}
          className="hidden"
        />
        <label className="flex w-full justify-start items-center gap-4" htmlFor="reason1">
          <div
            className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
              retireReason === 1 ? "bg-ppink" : "bg-[#E1E1E1] border-1 border-[#DEDEDE]"
            }`}
          ></div>
          <span className="text-lg text-[#555555] font-medium">방문을 잘 하지 않아요.</span>
        </label>
        <input
          type="radio"
          id="reason2"
          name="retireReason"
          value="reason2"
          onChange={() => setRetireReason(2)}
          className="hidden"
        />
        <label className="flex w-full justify-start items-center gap-4" htmlFor="reason2">
          <div
            className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
              retireReason === 2 ? "bg-ppink" : "bg-[#E1E1E1] border-1 border-[#DEDEDE]"
            }`}
          ></div>
          <span className="text-lg text-[#555555] font-medium">인증과정이 불편해요.</span>
        </label>

        <input
          type="radio"
          id="reason3"
          name="retireReason"
          value="reason3"
          onChange={() => setRetireReason(3)}
          className="hidden"
        />
        <label className="flex w-full justify-start  items-center gap-4" htmlFor="reason3">
          <div
            className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
              retireReason === 3 ? "bg-ppink" : "bg-[#E1E1E1] border-1 border-[#DEDEDE]"
            }`}
          ></div>
          <span className="text-lg text-[#555555] font-medium">보상이 부족해요.</span>
        </label>

        <input
          type="radio"
          id="reason4"
          name="retireReason"
          value="reason4"
          onChange={() => setRetireReason(4)}
          className="hidden"
        />
        <label className="flex w-full justify-start items-center gap-4" htmlFor="reason">
          <div
            className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
              retireReason === 4 ? "bg-ppink" : "bg-[#E1E1E1] border-1 border-[#DEDEDE]"
            }`}
          ></div>
          <span className=" text-lg text-[#555555] font-medium">기타</span>
        </label>
      </div>
    </>
  );

  const retireMessage = (
    <div className="flex flex-col justify-center font-bold items-center ">
      <p>탈퇴 시, 계정은 삭제되며</p>
      <p>복구되지 않습니다.</p>
    </div>
  );
  return (
    <div className="py-2 flex flex-col border-b-[1px] border-b-[#EEEEEE]">
      {!brokenModal && retireModal && (
        <CommonModal
          isOpen={retireModal}
          onConfirm={handleRetire}
          onCancel={() => setRetireModal(false)}
          message={retireMessage}
          confirmText="확인"
          cancelText="취소"
        />
      )}
      {brokenModal && (
        <CommonModal
          isOpen={brokenModal}
          onConfirm={() => {
            setRetireModal(true);
            setBrokenModal(false);
          }}
          className="pt-[60px] px-[44px]"
          cancelText="이전"
          confirmText="탈퇴하기"
          onCancel={() => setBrokenModal(false)}
          message={brokenModalInner}
        />
      )}
      {/* 상단 네비게이션 바 */}
      <div className="py-4 px-5 text-left relative ">
        <h1 className="text-[#999999] text-[15px] font-medium">계정관리</h1>
      </div>

      {/* 메뉴 리스트 */}
      <div className="flex flex-col">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item.label)}
            className={`text-left px-5 py-5 text-lg font-medium ${
              item.label === "헤어지기" ? "text-red-400" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Auth;
