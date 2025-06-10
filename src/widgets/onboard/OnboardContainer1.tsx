import Image from "next/image";
import MotionDiv from "./MotionDiv";

export interface OnboardContainerProps {
  imageUrl: string;
}
const OnboardContainer1 = ({ imageUrl }: OnboardContainerProps) => {
  return (
    <MotionDiv>
      <h1 className=" text-2xl font-bold text-center ">
        지구가 망하면 <br /> 우리의 연애도 끝이다!
      </h1>
      <Image
        src={imageUrl}
        alt="온보딩 이미지"
        width={259}
        height={338}
        className="absolute top-[200px] "
      />
    </MotionDiv>
  );
};

export default OnboardContainer1;
