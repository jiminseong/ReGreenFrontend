//useToastStore용 store.ts
import { create } from "zustand";

interface ToastStore {
  isCoupleJoinedToast: boolean;
  setIsCoupleJoinedToast: (isVisible: boolean) => void;
}
export const useToastStore = create<ToastStore>((set) => ({
  isCoupleJoinedToast: false,
  setIsCoupleJoinedToast: (isVisible) => set({ isCoupleJoinedToast: isVisible }),
}));
// 사용 예시
// import { useToastStore } from "@/store";
//
// const isCoupleJoinedToast = useToastStore((state) => state.isCoupleJoinedToast);
// const setIsCoupleJoinedToast = useToastStore((state) => state.setIsCoupleJoinedToast);
// setIsCoupleJoinedToast(true); // 토스트를 보이게 설정
// setIsCoupleJoinedToast(false); // 토스트를 숨기게 설정
