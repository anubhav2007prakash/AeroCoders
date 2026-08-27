"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sprout, Users } from "lucide-react";

export const FeatureButtons: React.FC = () => {
  const router = useRouter();

  return (
    <section className="px-4 py-2 select-none">
      <div className="grid grid-cols-2 gap-3">
        {/* Left: Agromet Button */}
        <button
          onClick={() => router.push("/agromet")}
          className="bg-white hover:bg-gray-100 active:scale-[0.98] text-[#06345C] font-semibold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all"
        >
          <Sprout className="w-5 h-5 text-[#06345C] stroke-[2.2]" />
          <span className="text-[14px]">Agromet</span>
        </button>

        {/* Right: Crowd Source Button */}
        <button
          onClick={() => router.push("/crowd-source")}
          className="bg-white hover:bg-gray-100 active:scale-[0.98] text-[#06345C] font-semibold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all"
        >
          <Users className="w-5 h-5 text-[#06345C] stroke-[2.2]" />
          <span className="text-[14px]">Crowd Source</span>
        </button>
      </div>
    </section>
  );
};
