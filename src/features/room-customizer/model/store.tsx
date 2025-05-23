// 현재 방에 isPlaced가 true인 furniture들의 리스트를 전역으로 관리 하기 위한 store
//
// 방에 있는 가구들의 상태를 관리하는 store
import { create } from "zustand";
import { FurnitureItem } from "@/entities/room/model/type";

interface RoomStore {
  currentRoomFurnitures: FurnitureItem[];
  setCurrentRoomFurnitures: (furnitures: FurnitureItem[]) => void;
  toggleFurniturePlacement: (furniture: FurnitureItem) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  currentRoomFurnitures: [],
  setCurrentRoomFurnitures: (furnitures) => set({ currentRoomFurnitures: furnitures }),
  toggleFurniturePlacement: (furniture) =>
    set((state) => {
      const existingFurniture = state.currentRoomFurnitures.find(
        (item) => item.coupleItemId === furniture.coupleItemId
      );

      if (existingFurniture) {
        return {
          currentRoomFurnitures: state.currentRoomFurnitures.map((item) =>
            item.coupleItemId === furniture.coupleItemId
              ? { ...item, isPlaced: !item.isPlaced }
              : item
          ),
        };
      } else {
        return {
          currentRoomFurnitures: [...state.currentRoomFurnitures, { ...furniture, isPlaced: true }],
        };
      }
    }),
}));
