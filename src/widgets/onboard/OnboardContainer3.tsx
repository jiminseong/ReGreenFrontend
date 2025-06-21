import Image from "next/image";
import { OnboardContainerProps } from "./OnboardContainer1";
import MotionDiv from "./MotionDiv";

const OnboardContainer3 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className=" text-2xl font-semibold text-center ">
        인증 후 받은 보상으로
        <br />
        상점에서 가구를 살 수 있어요!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={400}
        height={244}
        className="absolute top-52"
      />
    </MotionDiv>
  );
};

export default OnboardContainer3;
