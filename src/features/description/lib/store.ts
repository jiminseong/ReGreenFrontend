import { create } from "zustand";

interface CertificationState {
  progress?: number; // 선택적으로 progress를 추가할 수 있습니다.
  plusProgress?: (value: number) => void; // 선택적으로 progress를 증가시키는 함수를 추가할 수 있습니다.
}

export const useCertificationStore = create<CertificationState>((set) => ({
  progress: 0, // 초기값 설정
  plusProgress: (value) =>
    set((state) => ({
      progress: state.progress ? state.progress + value : value, // progress가 undefined일 경우 초기값 설정
    })),
}));
