"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardContainer1 from "@/widgets/Onboard/OnboardContainer1";
import Button from "@/shared/ui/Button";
import OnboardContainer2 from "@/widgets/Onboard/OnboardContainer2";
import OnboardContainer3 from "@/widgets/Onboard/OnboardContainer3";
import ProgressBar from "@/widgets/Onboard/ProgressBar";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100 p-4">
      <div className="relative w-full flex flex-col items-center justify-center ">
        <ProgressBar step={currentStep} totalSteps={3} />
        <button className="absolute top-5 text-ppink text-lg font-semibold right-0">skip</button>
      </div>
      <div className="flex flex-col gap-8 items-center justify-center">
        {currentStep === 0 ? (
          <OnboardContainer1 />
        ) : currentStep === 1 ? (
          <OnboardContainer2 />
        ) : (
          <OnboardContainer3 />
        )}
      </div>
      <Button className="text-lg font-bold" onClick={handleNext}>
        {currentStep < 2 ? "다음" : "시작하기"}
      </Button>
    </div>
  );
};

export default OnboardingPage;
