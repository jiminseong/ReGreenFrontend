import Image from "next/image";
import { OnboardContainerProps } from "./OnboardContainer1";
import MotionDiv from "./MotionDiv";

const OnboardContainer2 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className="text-2xl font-semibold text-center">
        친구, 연인과 함께
        <br />
        <span className="text-ppink font-bold"> 환경보호활동</span>하고
        <br />
        인증해보세요!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={400}
        height={244}
        className="absolute top-60 "
      />
    </MotionDiv>
  );
};

export default OnboardContainer2;
