"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InstallPrompt = ({ isIOS }: { isIOS: boolean }) => {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mb-32 md:mb-0 p-6 bg-white rounded-2xl shadow-lg text-center border">
      {isIOS ? (
        <div className="text-sm text-gray-500">
          iOS에서는 아래의
          <div className="flex justify-center items-center mt-2">
            <span className="font-semibold mr-1">공유 버튼</span>
            <Image src="/icon/shareIcon.svg" width={16} height={16} alt="공유하기" />을 누른 후
          </div>
          <div className="flex justify-center items-center mt-2">
            <span className="font-semibold mr-1">‘홈 화면에 추가’</span>
            <Image src="/icon/plusIcon.svg" width={16} height={16} alt="추가하기" />를 선택해주세요.
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          브라우저 주소창 옆에 <strong>설치 버튼</strong>이 보인다면 눌러서 <br /> 홈 화면에 추가할
          수 있어요.
        </p>
      )}
      <button onClick={() => router.push("/onboard")} className="mt-6 px-4 py-2 underline text-sm">
        웹으로 그냥 시작하기
      </button>
    </div>
  );
};

export default InstallPrompt;
