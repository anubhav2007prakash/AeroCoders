"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Unable to connect to IMD weather server.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center select-none bg-white/10 rounded-2xl mx-4 my-6 border border-white/20">
      <AlertCircle className="w-10 h-10 text-[#FFBE00] mb-2" />
      <h3 className="text-base font-semibold text-white">Weather Data Unavailable</h3>
      <p className="text-xs text-white/80 max-w-xs mt-1 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#A7C0D6] text-[#06345C] font-bold text-xs rounded-xl hover:bg-white active:scale-95 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
};
