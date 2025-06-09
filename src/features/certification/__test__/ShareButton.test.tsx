import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ShareButton from "../ui/ShareButton";

// html2canvas 모킹
jest.mock("html2canvas-pro", () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      toBlob: (cb: (blob: Blob) => void) => {
        const blob = new Blob(["test"], { type: "image/png" });
        cb(blob);
      },
      toDataURL: () => "data:image/png;base64,test",
    })
  ),
}));

describe("ShareButton", () => {
  it("클릭 시 navigator.share가 호출된다", async () => {
    const imageRef = { current: document.createElement("div") };

    const shareSpy = jest.fn();
    const canShareSpy = jest.fn(() => true);
    Object.assign(navigator, {
      share: shareSpy,
      canShare: canShareSpy,
    });

    const { getByText } = render(
      <ShareButton memberEcoVerificationId="123" containerRef={imageRef} title="테스트" />
    );
    fireEvent.click(getByText("공유하기"));

    await waitFor(() => {
      expect(shareSpy).toHaveBeenCalled();
    });
  });

  it("공유를 지원하지 않는 경우 alert를 띄운다", async () => {
    const imageRef = { current: document.createElement("div") };

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    Object.assign(navigator, {
      canShare: () => false,
      share: jest.fn(),
    });

    const { getByText } = render(
      <ShareButton memberEcoVerificationId="123" containerRef={imageRef} title="테스트" />
    );
    fireEvent.click(getByText("공유하기"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("이 브라우저는 이미지 공유를 지원하지 않습니다.");
    });

    alertSpy.mockRestore();
  });
});
