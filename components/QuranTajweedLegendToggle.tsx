"use client";

import { useState } from "react";

const tajweedLegend = [
  {
    label: "Madd lāzim (6 counts)",
    color: "#930707", // .madd-lazim
    description:
      "Strongest type of madd, lengthened for six counts in all cases.",
  },
  {
    label: "Madd wājib (4–5 counts)",
    color: "#F10504", // .madd-wajib
    description:
      "Obligatory madd usually held for four to five counts depending on recitation.",
  },
  {
    label: "Madd jāʾiz (2–4–6 counts)",
    color: "#F81E16", // .madd-jaiz
    description:
      "Permissible madd where the length can vary (often 2, 4, or 6 counts).",
  },
  {
    label: "Madd ṭabīʿī (2 counts)",
    color: "#D7590F", // .madd-tabii
    description:
      "Basic vowel lengthening held for two counts with no extra cause.",
  },
  {
    label: "Ikhfāʼ with ghunnah",
    color: "#3A6E20", // .ikhfa-ghunnah
    description:
      "Concealed ن or tanwīn with a light nasal sound before certain letters.",
  },
  {
    label: "Idghām with ghunnah",
    color: "#8D918E", // .idgham-ghunnah
    description:
      "Merging a letter into the next while maintaining a nasal sound.",
  },
  {
    label: "Qalqalah (echo)",
    color: "#0478FA", // .qalqalah
    description:
      "Echoing bounce on ق ط ب ج د when they are sākin or at pause.",
  },
  {
    label: "Tafkhīm (heaviness)",
    color: "#08446B", // .tafkheem
    description:
      "Heavy, full-mouth quality given to certain letters in specific positions.",
  },
];

export function QuranTajweedLegendToggle() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-3 py-1.5 text-xs text-gray-100 hover:border-white/25"
        aria-expanded={open}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
        <span className="font-medium tracking-wide">Tajweed rules</span>
        <span className="text-[10px] text-gray-300/80">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-[11px] text-gray-100">
          <p className="mb-2 text-gray-200/90">
            Colours help highlight tajwīd rules. Always learn with a qualified
            teacher; this is only a visual aid.
          </p>
          <ul className="space-y-1.5">
            {tajweedLegend.map((item) => (
              <li key={item.label} className="flex items-start gap-2">
                <span
                  className="mt-0.5 inline-flex h-2.5 w-2.5 rounded-full ring-1 ring-white/40"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="opacity-80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

