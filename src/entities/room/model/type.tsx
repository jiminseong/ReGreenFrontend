export interface FurnitureType {
  id: string;
  color: string;
  label: string;
}

export interface FurnitureItem {
  id: number;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
