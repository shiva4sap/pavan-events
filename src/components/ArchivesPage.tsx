import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Calendar, ArrowLeft, Video, ChevronRight } from 'lucide-react';
import { ARCHIVES_DATA, ARCHIVES_TRANSLATIONS } from '../data/archives';
import { Language } from '../translations';
import { YoutubeIframe } from './YoutubeIframe';

interface ArchivesPageProps {
  language: Language;
  onBack: () => void;
}

export const ArchivesPage: React.FC<ArchivesPageProps> = ({ language, onBack }) => {
  const tArr = ARCHIVES_TRANSLATIONS[language];
  const [selectedYear, setSelectedYear] = useState<'all' | '2025' | '2024' | '2023'>('all');

  // Filter archives by year if selected, otherwise display all year sections
  const filteredData = selectedYear === 'all' 
    ? ARCHIVES_DATA 
    : ARCHIVES_DATA.filter(group => group.year === selectedYear);

  return (
    <div className="pb-24 pt-8 bg-spiritual-cream min-h-[85vh] relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Button */}
        <div className="mb-10">
          <button 
            onClick={onBack}
            className="text-spiritual-maroon/60 hover:text-spiritual-maroon hover:bg-spiritual-maroon/5 py-2 px-4 rounded-xl transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={14} />
            {tArr.backToHome}
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-spiritual-gold font-serif italic text-base md:text-lg block mb-4 tracking-widest font-medium"
          >
            {tArr.badge}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-7xl font-display text-spiritual-maroon font-bold leading-tight mb-4 tracking-tight"
          >
            {tArr.pageTitle}
          </motion.h1>
          <div className="w-24 md:w-32 h-1 bg-spiritual-gold mx-auto mt-6 md:mt-8"></div>
          <p className="text-sm md:text-base text-spiritual-dark/85 font-light leading-relaxed max-w-2xl mx-auto mt-8">
            {tArr.pageSubtitle}
          </p>
        </div>

        {/* Year Quick Navigation / Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-5 py-2.5 rounded-full border text-xs sm:text-sm font-display uppercase tracking-widest font-bold transition-all shadow-sm ${
              selectedYear === 'all'
                ? 'bg-spiritual-maroon text-white border-spiritual-maroon shadow-md'
                : 'bg-white/60 text-spiritual-maroon border-spiritual-gold/25 hover:border-spiritual-maroon'
            }`}
          >
            {tArr.allYears}
          </button>
          
          {ARCHIVES_DATA.map(group => (
            <button
              key={group.year}
              onClick={() => setSelectedYear(group.year as any)}
              className={`px-6 py-2.5 rounded-full border text-xs sm:text-sm font-display uppercase tracking-widest font-bold transition-all shadow-sm ${
                selectedYear === group.year
                  ? 'bg-spiritual-maroon text-white border-spiritual-maroon shadow-md'
                  : 'bg-white/60 text-spiritual-maroon border-spiritual-gold/25 hover:border-spiritual-maroon'
              }`}
            >
              {group.year}
            </button>
          ))}
        </div>

        {/* Archives content sorted as separate year-wise drawers/blocks */}
        <div className="space-y-24 md:space-y-32">
          <AnimatePresence mode="wait">
            {filteredData.map((group, groupIdx) => {
              const yearTitle = language === 'en' ? `${group.year} Archives` : `${group.year} ఆర్కైవ్స్`;
              const is2025 = group.year === '2025';
              const yearSubtitle = is2025 
                ? (language === 'en' ? "Featured devotional recordings and spiritual programs from 2025." : "2025 సంవత్సరం నాటి ఎంపిక చేసిన భక్తి రికార్డింగ్‌లు మరియు ఆధ్యాత్మిక కార్యక్రమాలు.")
                : null;
              
              return (
                <motion.div
                  key={group.year}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -35 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12"
                >
                  {/* Year Group Divider Title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-spiritual-gold/25 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-spiritual-maroon/10 flex items-center justify-center text-spiritual-maroon shadow-md border border-spiritual-maroon/5 shrink-0">
                        <Calendar size={22} className="text-spiritual-maroon" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-5xl font-display text-spiritual-maroon font-bold tracking-tight">
                          {yearTitle}
                        </h2>
                        {yearSubtitle ? (
                          <p className="text-xs sm:text-sm text-spiritual-gold font-serif mt-1 italic font-medium leading-relaxed max-w-xl">
                            {yearSubtitle}
                          </p>
                        ) : (
                          <p className="text-xs text-spiritual-gold font-serif italic mt-0.5">
                            {group.videos.length} {language === 'en' ? 'Recordings' : 'రికార్డింగులు'}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {yearSubtitle && (
                      <span className="self-start sm:self-center text-[10px] md:text-xs uppercase tracking-widest font-bold bg-spiritual-gold/15 text-spiritual-maroon border border-spiritual-gold/20 px-4 py-1.5 rounded-full select-none">
                        {group.videos.length} {language === 'en' ? 'Recordings' : 'రికార్డింగులు'}
                      </span>
                    )}
                  </div>

                  {/* Year Group Video Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {group.videos.map((video, idx) => {
                      const title = language === 'en' ? video.titleEn : video.titleTe;

                      return (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ delay: idx * 0.05, duration: 0.4 }}
                          className="w-full aspect-video rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-black border border-spiritual-gold/10"
                        >
                          <YoutubeIframe
                            id={`page-${video.id}`}
                            videoId={video.id}
                            title={title}
                            className="w-full h-full border-0"
                            loading="lazy"
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Back To Home Footer Button */}
        <div className="mt-24 text-center border-t border-spiritual-gold/15 pt-16">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-8 sm:px-12 py-4 bg-spiritual-maroon text-white rounded-full font-display uppercase tracking-widest text-xs font-bold hover:bg-spiritual-maroon/90 transition-all shadow-xl"
          >
            {tArr.backToHome}
          </motion.button>
        </div>

      </div>
    </div>
  );
};
