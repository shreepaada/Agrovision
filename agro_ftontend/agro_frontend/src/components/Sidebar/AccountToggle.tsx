import React from "react";

export const AccountInfo = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <div className="flex gap-2 items-center">
        <img
          src="/agrovision.webp"
          alt="Agro Vision Logo"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">Agro Vision</span>
          <span className="text-xs block text-stone-500">
            Precision Farming Insights
          </span>
        </div>
      </div>
    </div>
  );
};
