const BottomNavigationBar = () => {
  return (
    <div className="absolute bottom-10 w-full px-5">
      <div className="flex w-full justify-center gap-4">
        <div className="flex w-[40%] cursor-pointer flex-col rounded-[22px] bg-white p-[1.0125em] text-center text-[22px] font-semibold shadow-custom">
          <p className="text-[18px] font-semibold md:text-[20px]">환경 보호</p>
          <p className="font-bold">인증 하기</p>
          📷<p className="text-[14px] text-[#929292]">이별 미루기</p>
        </div>

        <div className="flex w-[40%] cursor-pointer flex-col rounded-[22px] bg-white p-[1.0125em] text-center text-[22px] font-semibold shadow-custom">
          <p className="text-[18px] font-semibold md:text-[20px]">우리아지트</p>
          <p className="font-bold">방 꾸미기</p>
          🎀<p className="text-[14px] text-[#929292]">쇼핑하기</p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
