"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import React from "react";

interface FurnitureItem {
  furnitureId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  type: "furniture" | "decor" | "structure";
  zIndex: number;
  s3ImageUrl: string;
}

const Room = () => {
  const { mode } = useHomeMode();

  const roomData: FurnitureItem[] = [
    {
      furnitureId: 1,
      name: "Eco Bag",
      description: "This is a bag",
      price: 100,
      category: "BAG",
      type: "furniture",
      zIndex: 4,
      s3ImageUrl: "/image/home/inventory/green/bag.svg",
    },
    {
      furnitureId: 2,
      name: "Eco Bed",
      description: "This is a bed",
      price: 1200,
      category: "BED",
      type: "furniture",
      zIndex: 3,
      s3ImageUrl: "/image/home/inventory/green/bed.svg",
    },
    {
      furnitureId: 3,
      name: "Eco Book",
      description: "This is a book",
      price: 60,
      category: "BOOK",
      type: "decor",
      zIndex: 5,
      s3ImageUrl: "/image/home/inventory/green/book.svg",
    },
    {
      furnitureId: 4,
      name: "Eco Calendar",
      description: "This is a calendar",
      price: 80,
      category: "CALENDAR",
      type: "decor",
      zIndex: 6,
      s3ImageUrl: "/image/home/inventory/green/calendar.svg",
    },
    {
      furnitureId: 5,
      name: "Eco Carpet",
      description: "This is a carpet",
      price: 200,
      category: "CARPET",
      type: "furniture",
      zIndex: 1,
      s3ImageUrl: "/image/home/inventory/green/carpet.svg",
    },
    {
      furnitureId: 6,
      name: "Eco Chair",
      description: "This is a chair",
      price: 150,
      category: "CHAIR",
      type: "furniture",
      zIndex: 4,
      s3ImageUrl: "/image/home/inventory/green/chair.svg",
    },
    {
      furnitureId: 7,
      name: "Eco Cushion",
      description: "This is a cushion",
      price: 70,
      category: "CUSHION",
      type: "decor",
      zIndex: 5,
      s3ImageUrl: "/image/home/inventory/green/cushion.svg",
    },
    {
      furnitureId: 8,
      name: "Eco Desk",
      description: "This is a desk",
      price: 900,
      category: "DESK",
      type: "furniture",
      zIndex: 3,
      s3ImageUrl: "/image/home/inventory/green/desk.svg",
    },
    {
      furnitureId: 9,
      name: "Eco Frame",
      description: "This is a frame",
      price: 110,
      category: "FRAME",
      type: "decor",
      zIndex: 6,
      s3ImageUrl: "/image/home/inventory/green/frame.svg",
    },
    {
      furnitureId: 10,
      name: "Eco Globe",
      description: "This is a globe",
      price: 140,
      category: "GLOBE",
      type: "decor",
      zIndex: 5,
      s3ImageUrl: "/image/home/inventory/green/globe.svg",
    },
    {
      furnitureId: 11,
      name: "Eco Ladder",
      description: "This is a ladder",
      price: 300,
      category: "LADDER",
      type: "furniture",
      zIndex: 2,
      s3ImageUrl: "/image/home/inventory/green/ladder.svg",
    },
    {
      furnitureId: 12,
      name: "Eco Nightstand",
      description: "This is a nightstand",
      price: 250,
      category: "NIGHTSTAND",
      type: "furniture",
      zIndex: 3,
      s3ImageUrl: "/image/home/inventory/green/nightstand.svg",
    },
    {
      furnitureId: 13,
      name: "Eco Rabbit",
      description: "This is a rabbit",
      price: 130,
      category: "RABBIT",
      type: "decor",
      zIndex: 6,
      s3ImageUrl: "/image/home/inventory/green/rabbit.svg",
    },
    {
      furnitureId: 14,
      name: "Eco Wall",
      description: "This is a wall",
      price: 0,
      category: "WALL",
      type: "structure",
      zIndex: 0,
      s3ImageUrl: "/image/home/inventory/green/wall.svg",
    },
    {
      furnitureId: 15,
      name: "Eco Window",
      description: "This is a window",
      price: 0,
      category: "WINDOW",
      type: "structure",
      zIndex: 0,
      s3ImageUrl: "/image/home/inventory/green/window.svg",
    },
  ];

  return (
    <div
      className={`
    flex w-full h-full flex-col items-center justify-center
    transition-all duration-1000 ease-in-out
    ${mode === "inventory" ? "pb-[75%] md:pb-[65%]" : "pb-0"}
  `}
    >
      {roomData
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((item) => (
          <img
            key={item.furnitureId}
            src={item.s3ImageUrl}
            alt={item.name}
            className={`absolute z-[${item.zIndex}]`}
          />
        ))}
    </div>
  );
};

export default Room;
