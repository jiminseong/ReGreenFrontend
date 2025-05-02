import Image from "next/image";

const OnboardContainer2 = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        친구, 연인과 함께
        <br />
        <span className="text-ppink"> 환경보호활동하고</span>
        <br />
        인증해보세요!
      </h1>
      <Image
        src="/image/onboard/2.webp"
        alt="온보딩 이미지"
        width={259}
        height={338}
        className="mb-4"
      />
    </div>
  );
};

export default OnboardContainer2;
