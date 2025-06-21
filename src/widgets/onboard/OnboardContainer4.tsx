import Image from "next/image";
import { OnboardContainerProps } from "./OnboardContainer1";
import MotionDiv from "./MotionDiv";

const OnboardContainer4 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className="text-2xl font-semibold text-center ">
        우리만의 아지트를 꾸미고,
        <br /> 이별을 미뤄보세요!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={350}
        height={244}
        className="absolute top-50 "
      />
    </MotionDiv>
  );
};

export default OnboardContainer4;
