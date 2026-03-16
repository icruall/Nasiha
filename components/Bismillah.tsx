import React from "react";
import { refineTajweed } from "@/lib/tajweed";

export function Bismillah() {
  const bismillah = refineTajweed('بِسۡمِ <rule class="ham_wasl">ٱ</rule>للَّهِ ٱلرَّحۡمَ<rule class="madda_normal">ـٰ</rule>نِ ٱلرَّح<rule class="madda_permissible">ِي</rule>مِ');

  return (
    <div className="mb-4 flex flex-col items-center justify-center text-center space-y-2">
      <div
        className="text-4xl md:text-5xl leading-tight text-gray-900 select-none tajweed"
        style={{ fontFamily: "'UthmanicHafs', serif", direction: 'rtl' }}
        dangerouslySetInnerHTML={{ __html: bismillah }}
      />
      <p className="text-[10px] md:text-xs italic text-gray-600 font-medium tracking-wide">
        In the Name of Allah—the Most Compassionate, Most Merciful
      </p>
    </div>
  );
}
