export type FurnitureCategory =
  | "interior"
  | "decor"
  | "storage"
  | "window"
  | "fabric"
  | "flooring"
  | "lighting"
  | "bed"
  | "desk"
  | "chair";

export interface FurnitureItem {
  furnitureId: string;
  name: string;
  description: string;
  price: number;
  s3ImageUrl: string;
  s3PreviewImageUrl: string;
  category: FurnitureCategory;
  isOwned: boolean;
  coupleFurnitureId?: string | null;
  isPlaced: boolean;
  zIndex: number;
}

interface PatchRoomItem {
  coupleFurnitureId: string | null;
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
