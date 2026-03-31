import { AdhkarPageLayout } from '@/components/AdhkarPageLayout';
import { getAllChapters } from '@/lib/hisn';
import Link from 'next/link';

export default function HisnUlMuslimIndexPage() {
  const chapters = getAllChapters();

  return (
    <AdhkarPageLayout
      title="Hisn-ul-Muslim"
      subtitle="The Full Collection"
    >
      <div className="grid gap-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.ID}
            href={`/hisn-ul-muslim/book/${chapter.ID}`}
            className="group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 
              bg-white/[0.02] border-[#FF7F50]/10 hover:border-[#FF7F50]/40 hover:bg-[#FF7F50]/5"
          >
            <div className="flex items-center gap-4">
              <span className="flex-none flex items-center justify-center w-10 h-10 rounded-full bg-[#FDF5E6] text-xs font-bold text-[#2D3436] group-hover:bg-[#FF7F50] group-hover:text-white transition-all duration-300 shadow-sm">
                {chapter.ID}
              </span>
              <div className="flex-1">
                <h3 className="text-gray-300 font-medium group-hover:text-white transition-colors">
                  {chapter.TITLE}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {chapter.TEXT.length} Supplication
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700 group-hover:text-[#FF7F50] transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          </Link>
        ))}
      </div>
    </AdhkarPageLayout>
  );
}
