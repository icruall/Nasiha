import SurahIndexPanel from "@/components/SurahIndexPanel";

export default function QuranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      <SurahIndexPanel />
    </div>
  );
}
