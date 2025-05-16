"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFurnitureModalStore, useFurnitureStore } from "@/entities/room/model/store";
import { BuyFurnitureResponse, FurnitureItem } from "@/entities/room/model/type";
import CategorySwiper from "./CategorySwiper";
import InventoryListItem from "./InventoryListItem";
import CommonModal from "@/widgets/ComonModal";
import { useRoomStore } from "@/features/room-customizer/model/store";
import { useRouter } from "next/navigation";
import { useCoupleInfo } from "@/entities/user/lib/useCoupleInfo";
import { useMyPlacedFurniture } from "@/features/room-customizer/lib/useMyPlacedFurniture";
import { httpNoThrow } from "@/shared/lib/http";
import Loading from "@/widgets/Loading";

const InventoryListComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { data: coupleInfo, refetch: coupleRefetch } = useCoupleInfo();
  const {
    data: newCoupleFurniture,
    refetch: furnituresRefetch,
    isSuccess: furnitureSuccess,
  } = useMyPlacedFurniture();

  const { mode, setMode } = useHomeMode();
  const currentCategory = useFurnitureStore((state) => state.currentFurnituresCategory[0]);
  const setCategories = useFurnitureStore((state) => state.setCategories);
  const currentFurnitures = useRoomStore((state) => state.currentRoomFurnitures);
  const setCurrentFurnitures = useRoomStore((state) => state.setCurrentRoomFurnitures);

  const togglePlacement = useRoomStore((state) => state.toggleFurniturePlacement);

  const modal = useFurnitureModalStore((state) => state.modal);
  const modalType = useFurnitureModalStore((state) => state.modalType);
  const modalItem = useFurnitureModalStore((state) => state.modalItem);
  const setModal = useFurnitureModalStore((state) => state.setModal);

  function handleToggle(item: FurnitureItem) {
    if (item.isOwned || item.price === 0) {
      console.log(item);
      togglePlacement(item);
    } else {
      setModal(true, "buy", item);
    }
  }
  const messageSpan = (
    <span className="text-[16px] font-medium">
      {modalType === "buy" ? (
        <>
          <span className="font-bold"> 하트 {modalItem?.price}개</span>를 사용해서 <br />
          <span className="font-bold">[{modalItem?.name}]</span>를 구매하시겠습니까?
        </>
      ) : modalType === "notEnoughPoints" ? (
        <>
          <span className="font-bold">
            하트가 부족해요!
            <br />
          </span>
          <span className="font-bold">친환경 활동을 하러 갈까요?</span>
        </>
      ) : modalType === "alreadyOwned" ? (
        <>
          <span className="font-bold">이미 보유하고 있는 아이템이에요!</span>
        </>
      ) : null}
    </span>
  );

  const handleBuy = async () => {
    const coupleData = coupleInfo;
    if (!coupleData || !modalItem) {
      console.error("커플 데이터 또는 모달 아이템이 없습니다." + coupleInfo + modalItem);
      return;
    }

    if (Number(coupleInfo.data.point) < modalItem.price) {
      console.log(coupleInfo.data.point);
      setModal(true, "notEnoughPoints", modalItem);
      return;
    }

    const buyFurnitures = async () => {
      try {
        setLoading(true);
        const res = await httpNoThrow
          .post(`api/furniture/${modalItem.furnitureId}`)
          .json<BuyFurnitureResponse>();
        setLoading(false);
        if ("code" in res && res.code === 2500) {
          setModal(true, "buyFinished", modalItem);
          const updated = await furnituresRefetch();
          coupleRefetch();
          setCurrentFurnitures(updated.data?.data ?? []);
        }
        if (res.statusCode === 400) {
          setLoading(false);
          setModal(true, "notEnoughPoints", modalItem);
          coupleRefetch();
        } else if (res.statusCode === 409) {
          setLoading(false);
          setModal(true, "alreadyOwned", modalItem);
          coupleRefetch();
        } else {
        }
      } catch (error) {
        setLoading(false);
        console.error("Error buying furniture:", error);
      }
    };

    buyFurnitures();
  };

  // 초기에 카테고리 하나 설정
  useEffect(() => {
    setCategories(["interior"]);
  }, []);

  function handleHomeMode() {
    if (mode === "inventory") {
      if (furnitureSuccess) {
        if (newCoupleFurniture.data.length > 0) {
          setMode("home");
        }
      }
    }
  }

  const filteredItems = useMemo(
    () => currentFurnitures.filter((item) => item.category === currentCategory),
    [currentFurnitures, currentCategory]
  );

  return (
    <AnimatePresence mode="wait">
      {loading && <Loading />}
      {mode === "inventory" && (
        <motion.div
          key="inventory-list"
          initial={{ y: 650 }}
          animate={{ y: 0 }}
          exit={{ y: 250 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="z-2 w-full h-[40%] absolute bottom-0 bg-white px-5 pt-1 "
        >
          <Image
            onClick={handleHomeMode}
            src="icon/home/underTriangleIcon.svg"
            alt="삼각형 아이콘"
            width={25}
            height={12}
            className="absolute z-50 cursor-pointer top-[-32px] left-[50%] translate-x-[-50%]"
          />

          {/* 탭 메뉴 */}
          <CategorySwiper />
          {/* 아이템 목록 */}
          <div className="grid grid-cols-3 mt-3 overflow-y-scroll no-scrollbar h-full gap-2 pb-16">
            {filteredItems.map((item) => (
              <div id="item" key={item.furnitureId}>
                <InventoryListItem
                  isPlaced={item.isPlaced}
                  isOwned={item.isOwned}
                  item={item}
                  onToggle={() => handleToggle(item)}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}{" "}
      {modal && modalType === "buy" && (
        <CommonModal
          isOpen={modal}
          message={messageSpan}
          onConfirm={() => handleBuy()}
          onCancel={() => {
            setModal(false, null, null);
          }}
          cancelText="아니오"
          confirmText="네"
        />
      )}
      {modal && modalType === "notEnoughPoints" && (
        <CommonModal
          isOpen={modal}
          message={messageSpan}
          onConfirm={() => {
            router.push("/activity/list");
            setModal(false, null, null);
          }}
          onCancel={() => {
            setModal(false, null, null);
          }}
          confirmText="네"
          cancelText="아니오"
        />
      )}{" "}
      {modal && modalType === "alreadyOwned" && (
        <CommonModal
          isOpen={modal}
          message={
            <span className="text-[16px] font-medium">
              <span className="font-bold">[{modalItem?.name}]</span>를 이미 구매했어요.
            </span>
          }
          onCancel={() => {
            setModal(false, null, null);
          }}
          onlyCancel={true}
          cancelText="확인"
        />
      )}
      {modal && modalType === "buyFinished" && (
        <CommonModal
          isOpen={modal}
          message={
            <span className="text-[16px] font-medium">
              <span className="font-bold">[{modalItem?.name}]</span>를 이미 구매했어요.
            </span>
          }
          onCancel={() => {
            setModal(false, null, null);
          }}
          onlyCancel={true}
          cancelText="확인"
        />
      )}
    </AnimatePresence>
  );
};

export default React.memo(InventoryListComponent);
