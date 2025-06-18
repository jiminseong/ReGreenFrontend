import Image from "next/image";
import MotionDiv from "./MotionDiv";

export interface OnboardContainerProps {
  imageUrl: string;
}
const OnboardContainer1 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className=" text-[26px] font-semibold text-center ">
        지구가 망하면 <br /> 우리의 연애도 끝이다!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={220}
        height={244}
        className="absolute top-[248px] "
      />
    </MotionDiv>
  );
};

export default OnboardContainer1;
