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

export interface PatchRoomRequest {
  coupleId: string;
  replacedFurniture: {
    coupleFurnitureId: string;
    isPlaced: boolean;
  }[];
}

export interface PatchRoomResonse {
  statusCode: number;
  message: string;
}
