import LoginButton from "@/features/auth/ui/LoginButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen p-5  ">
      {/* 로고 및 타이틀 */}
      <div className="text-center h-[60%] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl ">우리는 이별을 미루기로 했다.</p>
      </div>

      <div className=" w-full items-center justify-center flex flex-col gap-4">
        {/* 카카오 로그인 버튼 */}
        <LoginButton provider="kakao" />
        {/* 네이버 로그인 버튼 */}
        {/* <LoginButton provider="naver" /> */}
      </div>
      {/* 하단 텍스트 */}
      <button className="underline text-sm text-gray-500 mt-4">로그인에 어려움이 있나요?</button>
    </div>
  );
};

export default LoginPage;
