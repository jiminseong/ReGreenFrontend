// lib/useShare.ts
export interface UseShareOptions {
  file?: File;
  title?: string;
  text?: string;
  url?: string;
  onSuccess?: () => void;
  onFailure?: (err: unknown) => void;
}

export const useShare = () => {
  const isiOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !("MSStream" in window);

  const isWhatsApp = /whatsapp/i.test(navigator.userAgent);

  const share = async ({
    file,
    title = "",
    text = "",
    url = "",
    onSuccess,
    onFailure,
  }: UseShareOptions) => {
    try {
      const canShareFiles = (file && navigator.canShare?.({ files: [file] })) ?? false;

      const shareData: ShareData = {};

      // iOS + WhatsApp → files만 보냄
      if (isiOS && isWhatsApp && file) {
        shareData.files = [file];
      } else {
        if (canShareFiles && file) {
          shareData.files = [file];
        }
        if (title) shareData.title = title;
        if (text) shareData.text = text;
        if (url) shareData.url = url;
      }

      console.log("공유 데이터:", shareData);
      console.log("파일 공유 가능 여부:", canShareFiles);

      if (canShareFiles) {
        await navigator.share(shareData);
        onSuccess?.();
      } else if (file) {
        alert("파일 공유 불가");
      } else {
        throw new Error("Web Share API not supported or file sharing not available.");
      }
    } catch (err) {
      console.error("❌ 공유 실패:", err);
      onFailure?.(err);
    }
  };

  return { share };
};
