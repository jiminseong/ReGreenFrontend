"use client";

import { FurnitureItem, FurnitureType } from "@/entities/room/model/type";
import Furniture from "@/features/room-customizer/ui/Furniture";
import { useEffect, useState } from "react";
import { Layer, Stage, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const furnitureTypes: FurnitureType[] = [
  { id: "blue-box", color: "#4f83cc", label: "파란상자" },
  { id: "red-box", color: "#e57373", label: "빨간상자" },
  { id: "orange-box", color: "#ffb74d", label: "주황상자" },
];

export default function Room() {
  const [furniture, setFurniture] = useState<FurnitureItem[]>([
    { id: 1, type: "blue-box", x: 160, y: 200, width: 50, height: 50 },
    { id: 2, type: "red-box", x: 220, y: 220, width: 40, height: 40 },
    { id: 3, type: "orange-box", x: 280, y: 260, width: 60, height: 60 },
  ]);

  const [background] = useImage("/image/room/background.png");

  const updatePosition = (id: number, x: number, y: number) => {
    setFurniture((prev) => prev.map((item) => (item.id === id ? { ...item, x, y } : item)));
  };

  useEffect(() => {
    console.log("Furniture positions updated:");
    furniture.forEach((item) => {
      console.log(
        `${item.id}: ${item.type} → x: ${Math.round(item.x)}, y: ${Math.round(item.y)}, w: ${
          item.width
        }, h: ${item.height}`
      );
    });
  }, [furniture]);

  return (
    <div className="flex w-full h-full flex-col items-center">
      <Stage width={350} height={350} style={{ background: "#ffffff" }}>
        <Layer>
          {background && <KonvaImage image={background} width={350} height={350} />}

          {furniture.map((item) => {
            const type = furnitureTypes.find((t) => t.id === item.type);
            return (
              type && <Furniture key={item.id} item={item} type={type} onDragEnd={updatePosition} />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
