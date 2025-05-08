import CoupleProfile from "@/entities/user/ui/CoupleProfile";
import Image from "next/image";

const TopSatatusBar = () => {
  return (
    <div className=" w-full flex flex-col justify-center items-center gap-4">
      {/* <div className="w-full text-center rounded-lg bg-[#FFFFFF8C] py-2  font-semibold">
        길동이네
      </div> */}
      <div className="flex w-full justify-between">
        {/* 일러스트 */}
        <div className="p-2 bg-[#FFFFFF8C] rounded-lg">
          <CoupleProfile size="small" />
        </div>

        <div className="flex flex-col rounded-lg gap-2.5">
          {/* D-Day */}
          <div className="flex justify-between">
            <div className="w-[52px] font-semibold bg-[#FFFFFFC2] border-[#EEEEEE] py-1.25 text-center rounded-full border-[1px]">
              이별
            </div>
            <div className=" font-semibold py-1.25 px-3.25 text-right">D-100</div>
          </div>

          {/* 하트 */}
          <div className="flex justify-between">
            <div className="w-[52px]  font-semibold bg-[#FFFFFFC2] border-[#EEEEEE] py-1.25 flex justify-center items-center rounded-full border-[1px]">
              <Image width={14.17} height={12.19} alt="하트" src="/icon/home/heartIcon.svg" />
            </div>
            <div className=" font-semibold py-1.25 px-3.25 text-right ">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSatatusBar;
