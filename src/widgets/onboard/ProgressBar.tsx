interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

// ProgressBar 컴포넌트는 현재 단계(step)와 총 단계(totalSteps)를 받아 진행 상황을 시각적으로 표시하는 역할을 합니다.
const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  return (
    <div className="relative w-full h-[3px]  overflow-hidden">
      {/* 진행 바 전체를 감싸는 컨테이너 */}
      <div className="flex h-full w-full gap-[4px]">
        {/* totalSteps만큼 반복하여 각 단계의 스타일을 설정 */}
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            // 현재 단계(step)보다 작은 index는 활성화된 색상(bg-ppink)을 적용
            // 그렇지 않으면 비활성화된 색상(bg-lpink)을 적용
            className={`flex-1 rounded-full ${
              index < step ? "bg-ppink" : "bg-lpink"
            } transition-all duration-300`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
