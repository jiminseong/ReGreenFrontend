import Image from "next/image";
import { OnboardContainerProps } from "./OnboardContainer1";
import MotionDiv from "./MotionDiv";

const OnboardContainer4 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className="text-2xl font-bold text-center ">
        구매한 가구로
        <br />
        우리만의 아지트를 꾸며보세요!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={326}
        height={444}
        className="absolute bottom-[39px] z-0"
      />
    </MotionDiv>
  );
};

export default OnboardContainer4;
