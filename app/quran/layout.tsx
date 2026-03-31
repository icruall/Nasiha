import SurahIndexPanel from "@/components/SurahIndexPanel";
import { FontSizeControls } from "@/components/FontSizeControls";

export default function QuranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      <SurahIndexPanel />
      <FontSizeControls />
    </div>
  );
}
