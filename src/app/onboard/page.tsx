"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardContainer1 from "@/widgets/onboard/OnboardContainer1";
import Button from "@/shared/ui/Button";
import OnboardContainer2 from "@/widgets/onboard/OnboardContainer2";
import OnboardContainer3 from "@/widgets/onboard/OnboardContainer3";
import ProgressBar from "@/widgets/onboard/ProgressBar";
import OnboardContainer4 from "@/widgets/onboard/OnboardContainer4";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleOnboardfinsh = () => {
    const isOnboarded = localStorage.getItem("onboarded");

    if (isOnboarded === "true") {
      router.push("/login");
      return;
    }

    localStorage.setItem("onboarded", "true");
    router.push("/login");
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 3) {
      // 마지막 단계에서 온보딩 완료 버튼 클릭 시
      // 로컬 스토리지에 온보딩 열람 상태 저장
      handleOnboardfinsh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5">
      <div className="relative w-full flex flex-col items-center justify-center ">
        <ProgressBar step={currentStep + 1} totalSteps={4} />
        <button
          className="absolute top-5 text-ppink text-lg font-semibold right-0 z-50"
          onClick={() => handleOnboardfinsh()}
        >
          skip
        </button>
      </div>

      {currentStep === 0 ? (
        <OnboardContainer1 imageUrl="/image/onboard/1.png" />
      ) : currentStep === 1 ? (
        <OnboardContainer2 imageUrl="/image/onboard/2.png" />
      ) : currentStep === 2 ? (
        <OnboardContainer3 imageUrl="/image/onboard/3.png" />
      ) : (
        <OnboardContainer4 imageUrl="/image/onboard/4.png" />
      )}

      <Button className="text-lg font-bold" onClick={handleNext}>
        {currentStep < 3 ? "다음" : "시작하기"}
      </Button>
    </div>
  );
};

export default OnboardingPage;
