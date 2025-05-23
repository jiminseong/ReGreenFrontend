export type FurnitureCategory = "wallPaper" | "floor" | "furniture" | "window" | "decor";

export interface FurnitureItem {
  itemId: string;
  name: string;
  description: string;
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
  code: number;
  statusCode?: number;
  message: string;
  data?: {
    coupeFurnitureId: string;
  };
}

export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
}
