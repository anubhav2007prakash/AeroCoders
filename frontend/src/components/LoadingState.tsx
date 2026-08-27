"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading IMD weather data...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center select-none">
      <Loader2 className="w-9 h-9 animate-spin text-[#00DDE5] mb-3" />
      <p className="text-sm font-medium text-white/90">{message}</p>
      <p className="text-xs text-white/60 mt-1">India Meteorological Department</p>
    </div>
  );
};
