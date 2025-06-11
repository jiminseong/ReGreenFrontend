export type FurnitureCategory = "WALL_PAPER" | "FLOOR" | "FURNITURE" | "WINDOW" | "PROP";

export interface FurnitureItem {
  itemId: string;
  name: string;
  price: number;
  imageUrl: string;
  previewImageUrl: string;
  category: FurnitureCategory;
  isOwned: boolean;
  coupleItemId?: string | null;
  isPlaced: boolean;
  zIndex: number;
}

interface PatchRoomItem {
  coupleItemId: string | null;
  isPlaced: boolean;
}

export interface PatchRoomRequest {
  placements: PatchRoomItem[];
}

export interface PatchRoomResponse {
  code: number;
  message: string;
}

export interface BuyFurnitureResponse {
  code: 2000;
  statusCode: 45001 | 45002 | 45003;
  message: string;
  data?: {
    coupleItemId: string;
  };
}
