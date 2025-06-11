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
      const arr = state.currentRoomFurnitures;
      const { category, coupleItemId } = furniture;
      const isExclusive = category === "WALL_PAPER" || category === "FLOOR";

      // 1) 배열에 이미 있는 아이템인지 찾아본다.
      const exists = arr.find((item) => item.coupleItemId === coupleItemId);

      if (exists) {
        // 2) 이미 있던 아이템 클릭 → isPlaced 토글
        return {
          currentRoomFurnitures: arr.map((item) => {
            if (item.coupleItemId === coupleItemId) {
              // 자신만 토글
              return { ...item, isPlaced: !item.isPlaced };
            }
            if (isExclusive && item.category === category) {
              // 독점 카테고리면 다른 아이템은 무조건 false
              return { ...item, isPlaced: false };
            }
            return item;
          }),
        };
      } else {
        // 3) 새 아이템 추가
        let newArr = arr;
        if (isExclusive) {
          // 독점 카테고리면 같은 카테고리 전부 false로 만들기
          newArr = arr.map((item) =>
            item.category === category ? { ...item, isPlaced: false } : item
          );
        }
        return {
          currentRoomFurnitures: [
            ...newArr,
            // 새로 추가된 아이템은 항상 true
            { ...furniture, isPlaced: true },
          ],
        };
      }
    }),
}));
