import { create } from "zustand";
import { persist } from "zustand/middleware";

// 토스트 전역 상태, 열리고 닫힘(boolean)과 내용(string)을 관리 토스트는 3초뒤에 닫히고 동기적으로 onNext가 진행
interface ToastState {
  isOpen: boolean; // 토스트가 열려있는지 여부
  message: string;
  onNext?: () => void; // 다음 단계로 넘어가는 함수
}
interface ToastStore extends ToastState {
  openToast: (message: string, onNext?: () => void) => void; // 토스트 열기
  closeToast: () => void; // 토스트 닫기
}
export const useToastStore = create<ToastStore>()(
  persist(
    (set) => ({
      isOpen: false, // 토스트 초기 상태는 닫힘
      message: "", // 초기 메시지는 빈 문자열
      onNext: undefined, // 초기 onNext 함수는 정의되지 않음
      openToast: (message, onNext) => set({ isOpen: true, message, onNext }), // 토스트 열기 함수
      closeToast: () => set({ isOpen: false, message: "", onNext: undefined }), // 토스트 닫기 함수
    }),
    {
      name: "toast-storage", // 로컬 스토리지에 저장될 이름
    }
  )
);
