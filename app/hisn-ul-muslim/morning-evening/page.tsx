import { AdhkarPageLayout } from '@/components/AdhkarPageLayout';
import { AdhkarCard } from '@/components/AdhkarCard';
import { getChapterById, HISN_SECTIONS } from '@/lib/hisn';
import { notFound } from 'next/navigation';

export default function MorningEveningPage() {
  const chapter = getChapterById(HISN_SECTIONS.MORNING_EVENING);

  if (!chapter) {
    notFound();
  }

  return (
    <AdhkarPageLayout 
      title={chapter.TITLE} 
      subtitle="Fortress of the Muslim"
    >
      <div className="grid gap-6">
        {chapter.TEXT.map((adhkar) => (
          <AdhkarCard key={adhkar.ID} adhkar={adhkar} />
        ))}
      </div>
    </AdhkarPageLayout>
  );
}
