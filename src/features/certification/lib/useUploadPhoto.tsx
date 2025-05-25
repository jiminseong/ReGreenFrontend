import { useRouter } from "next/navigation";
import { useLoadingStore } from "../model/useLoadingStore";
import { openFileDialog } from "../lib/openFileDialog";
import { postCertification } from "../lib/postCertification";
import { useToastStore } from "../../../shared/store/useToastStore";

export const useUploadPhoto = () => {
  const router = useRouter();
  const { setLoading } = useLoadingStore();
  const { openToast } = useToastStore();

  const uploadPhoto = async (
    id: string,
    title: string,
    ecoLovePoint: number,
    breakupBufferPoint: number
  ) => {
    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    const { file } = await openFileDialog();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      openToast("파일 크기가 20MB를 초과합니다.", () => {
        setLoading(false);
      });

      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await postCertification(id, formData);

    setLoading(false);

    if (res.data.status === "REJECTED") {
      openToast("활동과 무관한 사진입니다.", () => setLoading(false));
      return;
    }
    if (res.code === 47003) {
      openToast("이미 인증한 활동입니다.", () => setLoading(false));
      return;
    }
    if (res.code === 54001) {
      openToast("인증 사진은 1개만 업로드할 수 있습니다.", () => setLoading(false));
      return;
    }
    if (res.code === 44001) {
      openToast("등록 되지 않은 활동이에요", () => setLoading(false));
      return;
    }

    if (res.data.status === "APPROVED" && res.code === 2000) {
      const { memberEcoVerificationId, imageUrl } = res.data;
      router.push(
        `/activity/${memberEcoVerificationId}?imageUrl=${imageUrl}&title=${title}&ecoLovePoint=${ecoLovePoint}&breakupBufferPoint=${breakupBufferPoint}`
      );
    }
  };

  return { uploadPhoto };
};
