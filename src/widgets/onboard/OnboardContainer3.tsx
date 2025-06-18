import Image from "next/image";
import { OnboardContainerProps } from "./OnboardContainer1";
import MotionDiv from "./MotionDiv";

const OnboardContainer3 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className=" text-[26px] font-semibold text-center ">
        인증 후 받은 보상으로
        <br />
        상점에서 가구를 살 수 있어요!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={326}
        height={444}
        className="absolute bottom-[68px] z-0"
      />
    </MotionDiv>
  );
};

export default OnboardContainer3;
