"use client";

import React from "react";

interface CommonModalProps {
  className?: string;
  marginBottom?: string;
  isOpen: boolean;
  message: string | React.ReactNode;
  subMessage?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onlyCancel?: boolean;
  onlyConfirm?: boolean;
  danger?: boolean;
}

/**
 * 메시지와 액션을 표시하기 위한 재사용 가능한 모달 컴포넌트입니다.
 *
 * @component
 * @param {string} className - 모달의 추가 CSS 클래스입니다.
 * @param {string} [marginBottom="mb-64"] - 모달의 하단 여백을 설정합니다. 기본값은 "mb-64"입니다.
 * @param {CommonModalProps} props
 * @param {boolean} props.isOpen - 모달의 표시 여부를 결정합니다.
 * @param {string | React.ReactNode} props.message - 모달에 표시할 주요 메시지입니다. "\n"으로 줄바꿈이 가능합니다.
 * @param {string} [props.subMessage] - 주요 메시지 아래에 표시할 선택적 서브 메시지입니다.
 * @param {string} [props.confirmText="확인"] - 확인 버튼에 표시할 텍스트입니다.
 * @param {string} [props.cancelText="취소"] - 취소 버튼에 표시할 텍스트입니다.
 * @param {() => void} props.onConfirm - 확인 버튼 클릭 시 호출되는 콜백 함수입니다.
 * @param {() => void} props.onCancel - 취소 버튼 클릭 시 호출되는 콜백 함수입니다.
 * @param {boolean} [props.onlyCancel=false] - true일 경우 취소 버튼만 표시됩니다.
 * @param {boolean} [props.onlyConfirm=false] - true일 경우 확인 버튼만 표시됩니다.
 * @param {boolean} [props.danger=false] - true일 경우 확인 버튼에 위험 스타일이 적용됩니다.
 *
 * @example
 * <CommonModal
 *   isOpen={true}
 *   message="이 항목을 삭제하시겠습니까?"
 *   subMessage="이 작업은 되돌릴 수 없습니다."
 *   confirmText="삭제"
 *   cancelText="취소"
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 *   onlyConfirm={false}
 *   danger={true}
 * />
 */
const CommonModal: React.FC<CommonModalProps> = ({
  className,
  isOpen,
  message,
  subMessage,
  confirmText = "확인",
  cancelText = "취소",
  marginBottom = "mb-64",
  onConfirm,
  onCancel,
  onlyConfirm = false,
  onlyCancel = false,
  danger = false,
}) => {
  if (!isOpen) return null;

  const confirmButtonStyle = danger ? "bg-pink-100 text-pink-600" : "bg-gray-100";

  return (
    <div className="z-300 fixed inset-0 bg-black/70  flex items-center justify-center">
      <div
        className={`bg-white rounded-[20px] min-w-[280px] text-center shadow-xl ${marginBottom}`}
      >
        {typeof message === "string" ? (
          <p className="pt-10 pb-4 w-full text-base font-semibold ">{message}</p>
        ) : (
          <div className={`${className} pt-10 pb-4`}>{message}</div>
        )}

        {subMessage && <p className="text-sm text-gray-500 mt-1">{subMessage}</p>}

        <div className={`mt-6 grid ${onlyConfirm || onlyCancel ? "grid-cols-1" : "grid-cols-2"}`}>
          {!onlyConfirm && (
            <button
              onClick={onCancel}
              className={`${
                onlyCancel ? "rounded-b-[20px]" : ""
              } py-4 text-sm font-semibold rounded-bl-[20px]  bg-gray-100`}
            >
              {cancelText}
            </button>
          )}
          {!onlyCancel && (
            <button
              onClick={onConfirm}
              className={`py-4 text-sm font-semibold text-ppink bg-lpink ${
                onlyConfirm ? "rounded-b-[20px]" : "rounded-br-[20px]"
              } ${confirmButtonStyle}`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
