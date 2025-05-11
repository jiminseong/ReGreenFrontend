"use client";

import React from "react";

interface CommonModalProps {
  isOpen: boolean;
  message: string | React.ReactNode;
  subMessage?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onlyConfirm?: boolean;
  danger?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  message,
  subMessage,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  onlyConfirm = false,
  danger = false,
}) => {
  if (!isOpen) return null;

  const confirmButtonStyle = danger ? "bg-pink-100 text-pink-600" : "bg-gray-100";

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-[20px] w-[280px] p-6 text-center shadow-xl">
        <p className="text-base font-semibold whitespace-pre-line">{message}</p>
        {subMessage && <p className="text-sm text-gray-500 mt-1">{subMessage}</p>}

        <div className={`mt-6 grid ${onlyConfirm ? "grid-cols-1" : "grid-cols-2"}`}>
          {!onlyConfirm && (
            <button
              onClick={onCancel}
              className="py-2 text-sm font-semibold rounded-bl-[20px] bg-gray-100"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`py-2 text-sm font-semibold ${
              onlyConfirm ? "rounded-[20px]" : "rounded-br-[20px]"
            } ${confirmButtonStyle}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
