import { create } from "zustand";
import { FurnitureCategory, FurnitureItem } from "./type";

// 카테고리 한글 변환 맵
export const categoryMap: Record<FurnitureCategory, string> = {
  WALLPAPER: "벽지",
  PROP: "소품",
  WINDOW: "창문",
  FLOOR: "바닥",
  FURNITURE: "가구",
};

function toKoreanCategory(category: FurnitureCategory): string {
  return categoryMap[category];
}

interface FurnitureStore {
  currentFurnituresCategory: FurnitureCategory[];

  setCategories: (categories: FurnitureCategory[]) => void;
  getKoreanCategories: () => string[];
}

export const useFurnitureStore = create<FurnitureStore>((set, get) => ({
  currentFurnituresCategory: [],

  setCategories: (categories) => set(() => ({ currentFurnituresCategory: categories })),
  getKoreanCategories: () => get().currentFurnituresCategory.map((cat) => toKoreanCategory(cat)),
}));

// 사용 예시
// import { useFurnitureStore } from "@/store";

// const furnitures = useFurnitureStore((state) => state.currentFurnitures);
// const koreanCategories = useFurnitureStore((state) => state.getKoreanCategories());

interface FurnitureModalStore {
  modal: boolean;
  modalType: string | null;
  modalItem: FurnitureItem | null;
  setModal: (modal: boolean, modalType: string | null, modalItem: FurnitureItem | null) => void;
  getModal: () => {
    modal: boolean;
    modalType: string | null;
    modalItem: FurnitureItem | null;
  };
}
export const useFurnitureModalStore = create<FurnitureModalStore>((set, get) => ({
  setModal: (modal, modalType, modalItem) => set({ modal, modalType, modalItem }),
  modalItem: null,
  modalType: null,
  modal: false,
  getModal: () => ({
    modal: get().modal,
    modalType: get().modalType,
    modalItem: get().modalItem,
  }),
}));
