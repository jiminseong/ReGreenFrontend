import { FurnitureItem } from "@/entities/room/model/type";

export function normalizeExclusivePlacement(items: FurnitureItem[]): FurnitureItem[] {
  const exclusiveCategories = ["WALL_PAPER", "FLOOR"];
  const normalized: FurnitureItem[] = [];

  for (const category of exclusiveCategories) {
    const categoryItems = items.filter((item) => item.category === category);
    const placed = categoryItems.find((item) => item.isPlaced);
    // 하나만 true로, 나머지는 false로
    if (placed) {
      normalized.push(
        ...categoryItems.map((item) => ({
          ...item,
          isPlaced: item.coupleItemId === placed.coupleItemId,
        }))
      );
    } else {
      normalized.push(...categoryItems);
    }
  }

  const otherItems = items.filter((item) => !exclusiveCategories.includes(item.category));
  return [...normalized, ...otherItems];
}
