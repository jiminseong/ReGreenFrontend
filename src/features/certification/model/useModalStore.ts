import { create } from "zustand";

// 모달은 열리고 닫힘(boolean)과 내용(React.Node)을 관리
interface ModalState {
  isOpen: boolean; // 모달이 열려있는지 여부
  content: string | React.ReactNode; // 모달에 표시할 내용
  setIsOpen?: (isOpen: boolean) => void; // 모달 열림 상태 설정 함수
  onClose?: () => void; // 모달 닫기 함수
  onConfirm?: () => void; // 모달 확인 함수
}

interface ModalStore extends ModalState {
  setIsOpen: (isOpen: boolean) => void; // 모달 열림 상태 설정 함수
  openModal: (content: React.ReactNode, onClose?: () => void, onConfirm?: () => void) => void; // 모달 열기
  closeModal: () => void; // 모달 닫기
}
export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false, // 모달 초기 상태는 닫힘
  content: null, // 초기 내용은 null
  onClose: undefined, // 초기 onClose 함수는 정의되지 않음
  onConfirm: undefined, // 초기 onConfirm 함수는 정의되지 않음
  openModal: (content, onClose, onConfirm) => set({ isOpen: true, content, onClose, onConfirm }), // 모달 열기 함수
  closeModal: () => set({ isOpen: false, content: null, onClose: undefined, onConfirm: undefined }), // 모달 닫기 함수
  setIsOpen: (isOpen) => set({ isOpen: isOpen }),
}));
