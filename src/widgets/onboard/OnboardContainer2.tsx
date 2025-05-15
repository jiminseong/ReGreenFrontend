import Image from "next/image";
import { OnboardContainerProps } from "./OnboardContainer1";
import MotionDiv from "./MotionDiv";

const OnboardContainer2 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className="text-2xl font-bold text-center  ">
        친구, 연인과 함께
        <br />
        <span className="text-ppink"> 환경보호활동하고</span>
        <br />
        인증해보세요!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={391}
        height={554}
        className="absolute  bottom-[-64px] z-0"
      />
    </MotionDiv>
  );
};

export default OnboardContainer2;
