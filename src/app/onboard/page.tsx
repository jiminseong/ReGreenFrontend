"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const steps = [
    {
      title: "온보딩1",
      description: "지구가 망하면 우리의 인연도 끝이다!",
    },
    {
      title: "온보딩2",
      description: "친구, 연인과 함께 환경보호활동하고 인증해보세요!",
    },
    {
      title: "온보딩3",
      description: "인증 후 받은 보상으로 우리만의 아지트를 꾸며보자!",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/login"); // 온보딩 완료 후 로그인으로 이동
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h1>
      <p className="text-center text-lg mb-8">{steps[currentStep].description}</p>
      <button
        onClick={handleNext}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        {currentStep < steps.length - 1 ? "다음" : "시작하기"}
      </button>
    </div>
  );
};

export default OnboardingPage;
