import { create } from "zustand";

// 간단한 로딩 상태 관리
interface LoadingState {
  loading: boolean; // 로딩 상태
  setLoading: (loading: boolean) => void; // 로딩 상태 설정 함수
}
interface LoadingStore extends LoadingState {
  startLoading: () => void; // 로딩 시작 함수
  stopLoading: () => void; // 로딩 종료 함수
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false, // 초기 로딩 상태는 false
  setLoading: (loading) => set({ loading }), // 로딩 상태 설정 함수
  startLoading: () => set({ loading: true }), // 로딩 시작 함수
  stopLoading: () => set({ loading: false }), // 로딩 종료 함수
}));
