import Image from "next/image";

const OnboardContainer1 = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        지구가 망하면 <br /> 우리의 인연도 끝이다!
      </h1>
      <Image
        src="/image/onboard/1.webp"
        alt="온보딩 이미지"
        width={259}
        height={338}
        className="mb-4"
      />
    </div>
  );
};

export default OnboardContainer1;
