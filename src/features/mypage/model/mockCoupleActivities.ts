import { SubmitCoupleActivitiesResponse } from "./type";

export const mockCoupleActivities: SubmitCoupleActivitiesResponse = {
  code: 2000,
  message: "OK",
  data: {
    today: {
      date: "2025-06-01",
      members: [
        {
          isMe: false,
          memberId: "user-1",
          nickname: "홍길동",
          memberEcoVerifications: [
            {
              memberEcoVerificationId: "verif-1",
              type: "REUSABLE_CUP",
              ecoLovePoint: 200,
              breakupBufferPoint: 50,
              linkUrl: null,
              status: "APPROVED",
            },
            {
              memberEcoVerificationId: "verif-2",
              type: "SECOND_HAND",
              ecoLovePoint: 200,
              breakupBufferPoint: 50,
              linkUrl: "https://example.com",
              status: "REJECTED",
            },
          ],
        },
        {
          isMe: true,
          memberId: "user-2",
          nickname: "윤선영(나)",
          memberEcoVerifications: [
            {
              memberEcoVerificationId: "verif-3",
              type: "PLOGGING_PROOF",
              ecoLovePoint: 200,
              breakupBufferPoint: 50,
              linkUrl: null,
              status: "APPROVED",
            },
            {
              memberEcoVerificationId: "verif-4",
              type: "SECOND_HAND",
              ecoLovePoint: 200,
              breakupBufferPoint: 50,
              linkUrl: null,
              status: "APPROVED",
            },
          ],
        },
      ],
    },
    yesterday: {
      date: "2025-05-31",
      members: [],
    },
  },
};
