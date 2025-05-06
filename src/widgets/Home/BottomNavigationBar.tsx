import { useRouter } from "next/navigation";

const BottomNavigationBar = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <div className="w-full ">
      <div className="flex w-full justify-center gap-4">
        <div
          onClick={() => handleNavigation("/activity/select")}
          className="flex w-[50%] cursor-pointer flex-col rounded-[22px] bg-white p-10 text-center"
        >
          <p className="font-semibold text-[14px]">환경 보호</p>
          <p className="text-xl font-bold">
            인증 하기 <br /> 📷
          </p>
          <p className="font-medium text-[#999999]">이별 미루기</p>
        </div>

        <div className="flex w-[50%] cursor-pointer flex-col rounded-[22px] bg-white p-10 text-center">
          <p className="font-semibold text-[14px]">우리의 아지트</p>
          <p className="text-xl font-bold">
            방 꾸미기 <br /> 🎀
          </p>
          <p className="font-medium text-[#999999]">쇼핑하기</p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
