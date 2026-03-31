import { AdhkarPageLayout } from '@/components/AdhkarPageLayout';
import { AdhkarCard } from '@/components/AdhkarCard';
import { getChapterById } from '@/lib/hisn';
import { notFound } from 'next/navigation';

export default async function ChapterPage({ 
  params 
}: { 
  params: Promise<{ chapterId: string }> 
}) {
  const { chapterId } = await params;
  const id = parseInt(chapterId, 10);
  const chapter = getChapterById(id);

  if (!chapter) {
    notFound();
  }

  return (
    <AdhkarPageLayout 
      title={chapter.TITLE} 
      subtitle="Hisn-ul-Muslim"
      backHref="/hisn-ul-muslim/book"
    >
      <div className="grid gap-6">
        {chapter.TEXT.map((adhkar) => (
          <AdhkarCard key={adhkar.ID} adhkar={adhkar} />
        ))}
      </div>
    </AdhkarPageLayout>
  );
}
