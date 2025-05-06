"use client";

import { Group, Text, Rect } from "react-konva";

import { KonvaEventObject } from "konva/lib/Node";
import { FurnitureItem, FurnitureType } from "@/entities/room/model/type";

interface FurnitureProps {
  item: FurnitureItem;
  type: FurnitureType;
  onDragEnd: (id: number, x: number, y: number) => void;
}

function isInsideHexagon(x: number, y: number): boolean {
  const hexPath = [
    [170, 0], // 상단 중앙
    [340, 85], // 우측 상단
    [340, 255], // 우측 하단
    [170, 340], // 하단 중앙
    [0, 255], // 좌측 하단
    [0, 85], // 좌측 상단
  ];

  let inside = false;
  for (let i = 0, j = hexPath.length - 1; i < hexPath.length; j = i++) {
    const xi = hexPath[i][0],
      yi = hexPath[i][1];
    const xj = hexPath[j][0],
      yj = hexPath[j][1];

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export default function Funiture({ item, type, onDragEnd }: FurnitureProps) {
  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const newX = e.target.x();
    const newY = e.target.y();

    if (isInsideHexagon(newX + item.width / 2, newY + item.height / 2)) {
      onDragEnd(item.id, newX, newY);
    } else {
      e.target.to({ x: item.x, y: item.y, duration: 0.2 });
    }
  };

  return (
    <Group x={item.x} y={item.y} draggable onDragEnd={handleDragEnd}>
      <Rect width={item.width} height={item.height} fill={type.color} cornerRadius={8} />
      <Text text={type.label} fontSize={12} fill="#fff" x={5} y={item.height / 2 - 6} />
    </Group>
  );
}
