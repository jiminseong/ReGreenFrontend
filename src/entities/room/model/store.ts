import { create } from "zustand";
import { FurnitureCategory, FurnitureItem } from "./type";

// 카테고리 한글 변환 맵
export const categoryMap: Record<FurnitureCategory, string> = {
  interior: "인테리어",
  decor: "소품",
  storage: "수납",
  window: "창문",
  fabric: "패브릭",
  flooring: "바닥재",
  lighting: "조명",
  bed: "침대",
  desk: "책상",
  chair: "의자",
};

function toKoreanCategory(category: FurnitureCategory): string {
  return categoryMap[category];
}

interface FurnitureStore {
  currentFurnitures: FurnitureItem[];
  currentFurnituresCategory: FurnitureCategory[];

  setFurnitures: (items: FurnitureItem[]) => void;
  addFurniture: (item: FurnitureItem) => void;
  addFurnitures: (items: FurnitureItem[]) => void;
  setCategories: (categories: FurnitureCategory[]) => void;
  getKoreanCategories: () => string[];
  updateFurniture: (furnitureId: string, updatedFields: Partial<FurnitureItem>) => void;
}

export const useFurnitureStore = create<FurnitureStore>((set, get) => ({
  currentFurnitures: [],
  currentFurnituresCategory: [],

  setFurnitures: (items) => set({ currentFurnitures: items }),
  addFurniture: (item) =>
    set((state) => ({
      currentFurnitures: [...state.currentFurnitures, item],
    })),
  addFurnitures: (items) =>
    set((state) => ({
      currentFurnitures: [...state.currentFurnitures, ...items],
    })),
  setCategories: (categories) => set(() => ({ currentFurnituresCategory: categories })),
  getKoreanCategories: () => get().currentFurnituresCategory.map((cat) => toKoreanCategory(cat)),

  updateFurniture: (furnitureId: string, updatedFields: Partial<FurnitureItem>) =>
    set((state) => ({
      currentFurnitures: state.currentFurnitures.map((item) =>
        item.furnitureId === furnitureId ? { ...item, ...updatedFields } : item
      ),
    })),
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
