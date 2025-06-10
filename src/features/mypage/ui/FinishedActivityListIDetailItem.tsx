import HeartAndCalendarCard from "@/widgets/mypage/HeartAndCalendarCard";
import React from "react";
import { getActivityInfo } from "../lib/getActivityInfo";
import BottomShareModal from "@/features/share/ui/BottomShareModal";
import { useModalStore } from "@/features/certification/model/useModalStore";
import { useToastStore } from "@/shared/store/useToastStore";

interface FinishedActivityListIDetailItemProps {
  activity: {
    memberEcoVerificationId: string;
    nickname: string;
    ecoLovePoint: number; // 사랑의 점수
    breakupBufferPoint: number; // 이별 완충 포인트
    isMe: boolean;
  };
}

const FinishedActivityListIDetailItem = ({ activity }: FinishedActivityListIDetailItemProps) => {
  const { setIsOpen: setIsOpenBottomModal } = useModalStore();
  const { openToast } = useToastStore();
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<string>("");
  const [memberEcoVerificationId, setMemberEcoVerificationId] = React.useState<string | null>(null);

  const handleClick = async () => {
    const res = await getActivityInfo(activity.memberEcoVerificationId);
    if (!res) {
      console.error("Failed to fetch image for activity:", activity.memberEcoVerificationId);
      return;
    }

    if (res.code === 47002) {
      openToast("아쉽지만, 다른 구성원의 인증 사진은 볼 수없어요.");
      return;
    }
    const { imageUrl, title, memberEcoVerificationId } = res.data;
    setImageUrl(imageUrl);
    setTitle(title);
    setMemberEcoVerificationId(memberEcoVerificationId);
    setIsOpenBottomModal(true);
  };

  return (
    <div>
      <BottomShareModal
        title={title}
        imageUrl={imageUrl}
        memberEcoVerificationId={
          typeof memberEcoVerificationId === "string" ? memberEcoVerificationId : null
        }
        actionLabel="닫기"
      />

      <div
        key={activity.memberEcoVerificationId}
        className="bg-white w-full rounded-[10px] px-4 py-5 flex flex-col items-start cursor-pointer"
        onClick={handleClick}
      >
        <div className="font-regular text-sm  text-[#777777]">{activity.nickname}</div>
        <div className="w-full mt-2 flex justify-center">
          <HeartAndCalendarCard
            ecoLovePoint={activity.ecoLovePoint}
            breakupBufferPoint={activity.breakupBufferPoint}
          />
        </div>
      </div>
    </div>
  );
};

export default FinishedActivityListIDetailItem;
