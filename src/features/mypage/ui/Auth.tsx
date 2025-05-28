"use client";
import { http } from "@/shared/lib/http";
import CommonModal from "@/widgets/ComonModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Auth = () => {
  const router = useRouter();
  const [brokenModal, setBrokenModal] = useState(false);
  const [retireModal, setRetireModal] = useState(false);
  const menuItems = [{ label: "로그아웃" }, { label: "헤어지기" }];
  const [selected, setSelected] = useState<string>("");

  const handleMenuClick = async (label: string) => {
    if (label === "로그아웃") {
      // 로그아웃 처리 로직 추가
      try {
        const res = await http.post("api/auth/logout").json<{
          code: number;
          message: string;
        }>();
        if (res.code === 2000) {
          await localStorage.removeItem("accessToken");
          await localStorage.removeItem("refreshToken");
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

      {/* 탈퇴 사유 선택 */}
      <form className="flex flex-col gap-2.5 justify-center items-start ">
        {["방문을 잘 하지 않아요.", "인증과정이 불편해요.", "보상이 부족해요.", "기타"].map(
          (item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={item}
                className="peer hidden"
                checked={selected === item}
                onChange={() => setSelected(item)}
              />
              <div className="w-5 h-5 rounded-full bg-[#EAEAEA] border-1 border-[#DEDEDE]  flex items-center justify-center">
                <Image
                  src="/icon/auth/heartCheckIcon.svg"
                  alt="체크아이콘"
                  width={20}
                  height={20}
                  className="absolute"
                  style={{ display: selected === item ? "block" : "none" }}
                />
              </div>
              <span className="text-lg text-[#121212] ">{item}</span>
            </label>
          )
        )}
      </form>
    </>
  );

  const retireMessage = (
    <div className="flex flex-col justify-center font-bold items-center ">
      <p>탈퇴 시, 계정은 삭제되며</p>
      <p>복구되지 않습니다.</p>
    </div>
  );
  return (
    <div className=" w-full h-full">
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
          marginBottom="mb-[50px]"
          className="pt-[60px] px-[44px]"
          isOpen={brokenModal}
          onConfirm={() => {
            setRetireModal(true);
            setBrokenModal(false);
          }}
          cancelText="이전"
          confirmText="탈퇴하기"
          onCancel={() => setBrokenModal(false)}
          message={brokenModalInner}
        />
      )}
      <div className="relative py-2 flex flex-col border-b-[1px] border-b-[#EEEEEE]">
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
    </div>
  );
};

export default Auth;
