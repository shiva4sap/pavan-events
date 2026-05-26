import React from 'react';
import { motion } from 'motion/react';
import { Youtube, ArrowRight } from 'lucide-react';
import { ARCHIVES_DATA, ARCHIVES_TRANSLATIONS } from '../data/archives';
import { Language } from '../translations';
import { YoutubeIframe } from './YoutubeIframe';

interface ArchivesSectionProps {
  language: Language;
  onViewMore: () => void;
}

export const ArchivesSection: React.FC<ArchivesSectionProps> = ({ language, onViewMore }) => {
  const tArr = ARCHIVES_TRANSLATIONS[language];
  
  // Showcase the latest 6 videos on the homepage, 3 in 2025, 3 in 2024 (balanced and rich)
  const featuredVideos = [
    ...ARCHIVES_DATA[0].videos.slice(0, 3), // 2025 latest
    ...ARCHIVES_DATA[1].videos.slice(0, 3)  // 2024 latest
  ];

  return (
    <div className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      {/* Title & Badge */}
      <div className="text-center mb-16 md:mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-spiritual-gold font-serif italic text-lg md:text-xl tracking-widest font-medium"
        >
          {tArr.badge}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-7xl font-display text-spiritual-maroon mt-4"
        >
          {tArr.heading}
        </motion.h2>
        <div className="w-24 md:w-32 h-1 bg-spiritual-gold mx-auto mt-6 md:mt-8"></div>
        <p className="text-sm md:text-base text-spiritual-dark/80 font-light leading-relaxed max-w-2xl mx-auto mt-8">
          {tArr.subtitle}
        </p>
      </div>

      {/* Grid Layout (Desktop 3, Tablet 2, Mobile 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {featuredVideos.map((video, idx) => {
          const title = language === 'en' ? video.titleEn : video.titleTe;

          return (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="w-full aspect-video rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-black border border-spiritual-gold/10"
            >
              <YoutubeIframe
                id={`section-${video.id}`}
                videoId={video.id}
                title={title}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </div>

      {/* VIEW MORE Centered Button */}
      <div className="mt-16 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewMore}
          className="group px-8 sm:px-12 py-4 bg-spiritual-maroon text-spiritual-cream hover:bg-spiritual-gold rounded-full font-display uppercase tracking-widest text-xs font-bold transition-all shadow-xl hover:shadow-spiritual-maroon/25 flex items-center gap-3 mx-auto"
        >
          {tArr.viewMore}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
};
