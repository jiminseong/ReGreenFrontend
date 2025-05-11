import Image from "next/image";

const OnboardContainer3 = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <h1 className="absolute text-2xl font-bold text-center top-[101px]">
        인증 후 받은 보상으로
        <br />
        우리만의 아지트를 꾸며보자!
      </h1>
      <Image
        src="/image/onboard/3.png"
        alt="온보딩 이미지"
        width={326}
        height={444}
        className="absolute bottom-[117px] z-0"
      />
    </div>
  );
};

export default OnboardContainer3;
