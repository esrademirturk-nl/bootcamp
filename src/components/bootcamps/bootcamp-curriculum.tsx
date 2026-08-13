/**
 * src/components/bootcamps/bootcamp-curriculum.tsx
 * Bootcamp müfredatını modül modül açılır-kapanır (Accordion) liste şeklinde gösterir.
 */

'use client';

import React, { useState } from 'react';
import { useT } from 'next-i18next/client';
import type { ResolvedCurriculumModule } from '@/types';

interface BootcampCurriculumProps {
  curriculum: ResolvedCurriculumModule[];
}

export const BootcampCurriculum: React.FC<BootcampCurriculumProps> = ({ curriculum }) => {
  const { t } = useT('common');
  // İlk modülü varsayılan olarak açık tutuyoruz (index: 0)
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  // Modül başlığına tıklandığında açma/kapama mantığı
  const toggleModule = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">
        {t('bootcampDetailPage.curriculumTitle', { defaultValue: 'Eğitim Müfredatı' })}
      </h2>

      <div className="space-y-3">
        {curriculum.map((module, index) => {
          const isOpen = openIndexes.includes(index);

          return (
            <div
              key={index}
              className="border border-border/60 rounded-xl overflow-hidden bg-card transition-all"
            >
              {/* Modül Başlığı ve Aç/Kapat Tetikleyicisi */}
              <button
                type="button"
                onClick={() => toggleModule(index)}
                className="w-full p-4 text-left font-semibold flex items-center justify-between bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-primary font-bold">#{index + 1}</span>
                  <span className="text-foreground">{module.title}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span>
                    ⏱ {module.durationHours}{' '}
                    {t('bootcampDetailPage.hoursSuffix', { defaultValue: 'Saat' })}
                  </span>
                  <span className="text-lg">{isOpen ? '−' : '+'}</span>
                </div>
              </button>

              {/* Modül İçi Ders Listesi */}
              {isOpen && (
                <div className="p-4 border-t border-border/40 space-y-2 bg-card">
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {module.lessons.map((lesson, lessonIdx) => (
                      <li key={lessonIdx} className="hover:text-foreground transition-colors">
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BootcampCurriculum;
