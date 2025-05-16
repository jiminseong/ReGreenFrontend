"use client";
import {
  useParams,
  //  useParams,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import React from "react";
import AuthGuard from "@/shared/lib/AuthGuard";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import Toast from "@/widgets/Toast";
import CoupleGuard from "@/shared/lib/CoupleGuard";
import { http } from "@/shared/lib/http";
import html2canvas from "html2canvas";

export default function Paeg() {
  const { memberEcoVerificationId } = useParams();
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  //요일
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayOfWeek[currentDate.getDay()];
  const formattedDate = `${year}.${month}.${day} ${dayName}요일`;

  const [inputValue, setInputValue] = React.useState("");

  //해당 ref에 해당하는 컴포넌트를 이미지 형태로 다운로드 하는 함수
  const ref = React.useRef<HTMLDivElement>(null);
  const handleSaveButtonClick = async () => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current, {
        useCORS: true,
        scale: 2, // 해상도 조정
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "activity_image.png"; // 다운로드할 파일 이름
      link.click();
    }
  };

  // 정규식 검사 함수
  const isValidUrl = (url: string) => {
    const regex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
    return regex.test(url);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed:", inputValue);
      // 여기에 Enter 키를 눌렀을 때의 동작을 추가하세요.

      if (isValidUrl(inputValue)) {
        // 유효한 URL인 경우
        console.log("Valid URL:", inputValue);
        handleToast("링크가 전송되었습니다!");
      } else {
        // 유효하지 않은 URL인 경우
        console.log("Invalid URL:", inputValue);
        handleToast("유효하지 않은 URL입니다.");
      }

      setInputValue("");
    }
  };

  const handleSendButtonClick = async () => {
    if (isValidUrl(inputValue)) {
      // 유효한 URL인 경우
      const res = await http
        .patch(`api/eco-verifications/my/${memberEcoVerificationId}/link`)
        .json<{
          code: number;
          message: string;
        }>();

      if (res.code !== 2400) {
        handleToast("링크 전송에 실패했습니다.");
        return;
      }

      if (res.code === 2400) {
        handleToast("링크가 전송되었습니다!");
      }
    } else {
      // 유효하지 않은 URL인 경우
      console.log("Invalid URL:", inputValue);
      handleToast("유효하지 않은 URL입니다.");
    }
  };

  const handleToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000); // 2초 후에 토스트 숨기기
  };

  return (
    <>
      <AuthGuard />
      <CoupleGuard />
      {toastVisible && <Toast message={toastMessage} position="top" />}
      <TopNavigationBar title="공유하기" />

      <div className="flex flex-col w-full px-5 py-20 justify-between  items-center h-screen">
        <div className="flex flex-col gap-5 w-full">
          {imageUrl && (
            <div ref={ref} className="w-full h-[350px] overflow-hidden rounded-lg relative">
              {imageUrl && (
                <Image
                  src={`${imageUrl}`}
                  alt="activity image"
                  fill
                  className="object-cover rounded-lg"
                />
              )}
              <div className="absolute bottom-5 left-5 flex flex-col gap-4">
                {/* <div>
                <Image
                  src="/icon/home/locationIcon.svg"
                  alt="location icon"
                  width={24}
                  height={24}
              </div> */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/icon/activity/certification/calendarIcon.svg"
                    alt="calendar icon"
                    width={24}
                    height={24}
                  />
                  <span className="text-white  font-semibold">{formattedDate}</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSaveButtonClick}
            className=" w-full bg-[#222222] py-4 rounded-lg  flex gap-1.5 justify-center items-center text-white font-bold text-lg"
          >
            저장하기
            <Image
              src="/icon/activity/certification/downloadIcon.svg"
              alt="save icon"
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className="flex flex-col gap-4 w-full items-center">
          <span>
            SNS로 공유해주시면 <span className="text-ppink font-semibold">추가 하트</span>를 드려요!
          </span>
          <div className="relative w-full">
            <input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              type="text"
              className="w-full h-[50px] bg-[#F7F7F7] border-1 border-[#EEEEEE] rounded-[50px] px-4 font-medium  placeholder:text-[#999999]"
              placeholder="링크를 입력해 주세요."
            />

            <Image
              onClick={handleSendButtonClick}
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              src={`/icon/activity/certification/sendIcon${
                inputValue.length > 0 ? "Pink" : ""
              }.svg`}
              alt="share icon"
              width={23.16}
              height={23.16}
            />
          </div>
        </div>
      </div>
    </>
  );
}
