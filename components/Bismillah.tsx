import React from "react";

export function Bismillah({ fontFamily }: { fontFamily?: string }) {
  const resolvedFontFamily = fontFamily || "'UthmanicHafs', serif";

  return (
    <div className="mb-4 flex flex-col items-center justify-center text-center space-y-2">
      <div
        className="text-4xl sm:text-5xl md:text-6xl leading-tight text-gray-900 select-none"
        style={{ fontFamily: resolvedFontFamily, direction: 'rtl' }}
      >
        ﷽
      </div>
      <p className="text-[10px] md:text-xs italic text-gray-600 font-medium tracking-wide">
        In the Name of Allah—the Most Compassionate, Most Merciful
      </p>
    </div>
  );
}

