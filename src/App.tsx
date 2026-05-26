import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Youtube, 
  Instagram, 
  Facebook,
  Phone, 
  Mail, 
  MapPin, 
  Music, 
  BookOpen, 
  Calendar, 
  Users, 
  ChevronRight,
  MessageCircle,
  Heart,
  Languages,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  CreditCard,
  Landmark
} from 'lucide-react';

import { translations, Language } from './translations';
const logo = '/logo.png';
import pavanLogo from './images/pavanLogo.png';
import bannerImg from './images/img1.jpeg';
import swamyImg from './images/imgSwamy.jpeg';
import missionImg from './images/imgMission.jpg';
import visionImg from './images/imgVision.jpeg';
import img2 from './images/img2.jpg';
import img73 from './images/img73.jpeg';
import img10 from './images/img10.jpeg';
import img84 from './images/img84.jpeg';
import qrCodeImg from './images/QRcode2.png';
import { ArchivesSection } from './components/ArchivesSection';
import { ArchivesPage } from './components/ArchivesPage';
import { YoutubeIframe } from './components/YoutubeIframe';

// --- Types ---
type Section = 'home' | 'story' | 'events' | 'fullEvents' | 'gallery' | 'fullGallery' | 'about' | 'contact' | 'donation' | 'archives' | 'donate' | 'community' | 'fullDonation' | 'fullArchives';

// --- Constants ---
const imageModules = import.meta.glob('./images/img*.{jpg,jpeg}', { eager: true, import: 'default' });
const ALL_IMAGES_DATA = Object.keys(imageModules)
  .map(path => {
    const match = path.match(/img(\d+)\.(jpg|jpeg)$/);
    return {
      src: imageModules[path] as string,
      num: match ? parseInt(match[1]) : 0
    };
  })
  .filter(img => img.num > 0 && img.num <= 103)
  .sort((a, b) => a.num - b.num);

const ALL_IMAGES = ALL_IMAGES_DATA.map(img => img.src);

const SANKEERTANALU_NUMS = [2,3,4,5,6,7,8,23,25,26,52,53,54,57,58,63,73,74,78,84,85,86,91,92,93,94,95,96,97,98,99,100,101,102,103];

// --- Components ---

const LanguagePopup = ({ onSelect }: { onSelect: (lang: Language) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-spiritual-maroon/40 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-spiritual-cream max-w-md w-full rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl border border-spiritual-gold/20 text-center space-y-6 md:space-y-8"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-spiritual-gold/10 rounded-full flex items-center justify-center mx-auto text-spiritual-gold">
          <Languages size={32} className="md:w-10 md:h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-display text-spiritual-maroon">Select Language</h2>
          <p className="text-spiritual-dark/60 font-serif italic text-sm md:text-base">భాషను ఎంచుకోండి</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => onSelect('en')}
            className="w-full py-3.5 md:py-4 bg-spiritual-maroon text-spiritual-cream rounded-2xl font-display tracking-widest uppercase text-xs md:text-sm hover:bg-spiritual-maroon/90 transition-all shadow-lg hover:-translate-y-1"
          >
            English
          </button>
          <button 
            onClick={() => onSelect('te')}
            className="w-full py-3.5 md:py-4 bg-spiritual-gold text-spiritual-cream rounded-2xl font-display tracking-widest uppercase text-xs md:text-sm hover:bg-spiritual-gold/90 transition-all shadow-lg hover:-translate-y-1"
          >
            తెలుగు (Telugu)
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Donation = ({ t, onBack, language, isSection }: { t: any, onBack?: () => void, language: Language, isSection?: boolean }) => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const UPI_ID = "kvbupiqr.105000000011105@kvb";

  const tModal = {
    en: {
      tagline: "Om Namo Venkatesaya",
      title: "Support Our Spiritual Mission",
      subtitle: "Your contribution helps us continue devotional events, training, and community services.",
      qrTitle: "QR Code Payment",
      qrCaption: "Scan this QR code using PhonePe, Google Pay, Paytm, or any UPI app",
      merchantLabel: "Merchant Name",
      merchantValue: "Sri Annamacharya Sangeeta Nrutya Kalaa Kshetram Siddipet",
      upiTitle: "UPI Payment",
      upiIdLabel: "Devotional Account UPI ID",
      accountNameLabel: "Account Name",
      accountNameValue: "Sri Annamacharya Sangeeta Nrutya Kalaa Kshetram Siddipet",
      copiedToast: "UPI ID copied successfully!",
      copyUpi: "Copy UPI ID"
    },
    te: {
      tagline: "ఓం నమో వేంకటేశాయ",
      title: "మా ఆధ్యాత్మిక సేవకు మద్దతు ఇవ్వండి",
      subtitle: "మీ విరాళం మాకు భక్తి కార్యక్రమాలు, శిక్షణ మరియు సమాజ సేవలను కొనసాగించడానికి సహాయపడుతుంది.",
      qrTitle: "QR కోడ్ చెల్లింపు",
      qrCaption: "PhonePe, Google Pay, Paytm లేదా ఏదైనా UPI యాప్ ఉపయోగించి ఈ QR కోడ్‌ని స్కాన్ చేయండి",
      merchantLabel: "మర్చంట్ పేరు",
      merchantValue: "Sri Annamacharya Sangeeta Nrutya Kalaa Kshetram Siddipet",
      upiTitle: "UPI చెల్లింపు",
      upiIdLabel: "భక్తి ఖాతా UPI ఐడీ",
      accountNameLabel: "ఖాతా పేరు",
      accountNameValue: "Sri Annamacharya Sangeeta Nrutya Kalaa Kshetram Siddipet",
      copiedToast: "UPI ఐడీ విజయవంతంగా కాపీ చేయబడింది!",
      copyUpi: "UPI ఐడీ కాపీ చేయండి"
    }
  }[language];

  const handleCopyValue = async (value: string, message: string, fieldKey?: string) => {
    try {
      await navigator.clipboard.writeText(value);
      if (fieldKey) {
        setCopiedField(fieldKey);
        setTimeout(() => setCopiedField(null), 2000);
      }
      setToastMessage(message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    await handleCopyValue(UPI_ID, tModal.copiedToast);
  };

  return (
    <div className={`${isSection ? 'py-12 bg-transparent' : 'pb-24 pt-8 bg-spiritual-cream min-h-[85vh]'} relative z-10 font-sans`}>
      <div className="px-4 md:px-6 max-w-6xl mx-auto">
        
        {/* Back Button */}
        {!isSection && onBack && (
          <div className="mb-8 font-display">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="text-spiritual-maroon/60 hover:text-spiritual-maroon hover:bg-spiritual-maroon/5 py-2 px-4 rounded-xl transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold z-20"
            >
              <ChevronRight className="rotate-180" size={16} />
              {t.nav.backToHome}
            </motion.button>
          </div>
        )}

        {/* Page Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-spiritual-gold font-serif italic text-base md:text-lg block mb-4 tracking-widest font-medium"
          >
            {tModal.tagline}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-display text-spiritual-maroon font-bold leading-tight mb-4 tracking-tight max-w-3xl mx-auto"
          >
            {tModal.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm md:text-base text-spiritual-dark/80 font-light leading-relaxed max-w-2xl mx-auto"
          >
            {tModal.subtitle}
          </motion.p>

          {/* Devotional Divider */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-spiritual-gold/60"></span>
            <svg className="w-8 h-8 text-spiritual-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22C12 22 17 18 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 18 12 22 12 22Z" fill="currentColor" fillOpacity="0.1"/>
              <path d="M12 2C12 2 15 5.5 15 8.5C15 10.433 13.6569 12 12 12C10.3431 12 9 10.433 9 8.5C9 5.5 12 2 12 2Z" fill="currentColor" fillOpacity="0.2"/>
              <circle cx="12" cy="13" r="1.5" stroke="currentColor" fill="currentColor"/>
            </svg>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-spiritual-gold/60"></span>
          </motion.div>
        </div>

        {/* Donation Sections Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto items-stretch mb-12">
          
          {/* SECTION 1 - QR CODE PAYMENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white/85 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 shadow-xl hover:shadow-2xl border border-spiritual-gold/15 transition-all flex flex-col justify-between"
          >
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-spiritual-maroon/5 flex items-center justify-center text-spiritual-maroon">
                  <QrCode size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-spiritual-maroon">
                  {tModal.qrTitle}
                </h3>
              </div>
              
              <div className="bg-white p-5 rounded-3xl shadow-lg border border-spiritual-gold/15 inline-block relative overflow-hidden group">
                <img 
                  src={qrCodeImg} 
                  alt="Donation QR Code" 
                  className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-2xl mx-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-spiritual-gold/20 rounded-3xl transition-colors duration-300 pointer-events-none" />
              </div>
            </div>

            <div className="mt-8 text-center bg-spiritual-cream/40 p-4 rounded-2xl border border-spiritual-gold/10 space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-spiritual-gold block mb-1">
                  {tModal.merchantLabel}
                </span>
                <p className="text-xs sm:text-sm font-serif font-bold text-spiritual-maroon leading-snug">
                  {tModal.merchantValue}
                </p>
              </div>
              <div className="h-[1px] w-12 bg-spiritual-gold/20 mx-auto" />
              <div>
                <p className="text-xs text-spiritual-dark/80 font-light leading-relaxed max-w-xs mx-auto select-none">
                  {tModal.qrCaption}
                </p>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 opacity-60">
                <span className="text-[10px] uppercase tracking-wider font-bold text-spiritual-maroon/70">PhonePe</span>
                <span className="w-1.5 h-1.5 bg-spiritual-gold/40 rounded-full"></span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-spiritual-maroon/70">GPay</span>
                <span className="w-1.5 h-1.5 bg-spiritual-gold/40 rounded-full"></span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-spiritual-maroon/70">Paytm</span>
              </div>
            </div>
          </motion.div>

          {/* SECTION 2 - UPI PAYMENT & BANK DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white/85 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 shadow-xl hover:shadow-2xl border border-spiritual-gold/15 transition-all flex flex-col justify-between gap-6"
          >
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-spiritual-maroon/5 flex items-center justify-center text-spiritual-maroon">
                  <CreditCard size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-spiritual-maroon">
                  {tModal.upiTitle}
                </h3>
              </div>

              {/* UPI container */}
              <div className="w-full bg-spiritual-cream/35 border border-spiritual-gold/15 p-6 md:p-8 rounded-3xl text-center space-y-6 shadow-inner">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-spiritual-gold block">
                    {tModal.upiIdLabel}
                  </span>
                  
                  <div className="bg-white border-2 border-spiritual-maroon/10 focus-within:border-spiritual-gold/40 py-3.5 px-4 rounded-2xl flex items-center justify-between gap-4 max-w-sm mx-auto shadow-sm transition-all animate-none">
                    <span className="font-mono text-xs sm:text-sm font-bold text-spiritual-maroon tracking-normal select-all break-all leading-tight">
                      {UPI_ID}
                    </span>
                    <button 
                      onClick={handleCopy}
                      className="p-3 bg-spiritual-maroon text-spiritual-cream hover:bg-spiritual-gold hover:text-spiritual-cream rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center group shrink-0"
                      title={tModal.copyUpi}
                    >
                      {copied ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} className="group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-spiritual-gold/15">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-spiritual-gold block mb-1">
                    {tModal.accountNameLabel}
                  </span>
                  <div className="font-serif text-base font-bold text-spiritual-maroon tracking-wide">
                    {tModal.accountNameValue}
                  </div>
                  <div className="text-[10px] text-spiritual-dark/50 mt-1 italic">
                    Devotional Contribution Account
                  </div>
                </div>
              </div>

              {/* NEW BANK DETAILS SUB-SECTION */}
              <div className="w-full bg-spiritual-cream/35 border border-spiritual-gold/15 p-6 md:p-8 rounded-3xl text-center space-y-5 shadow-inner">
                <div className="flex items-center justify-center gap-2.5 border-b border-spiritual-gold/15 pb-3">
                  <Landmark size={18} className="text-spiritual-maroon" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-spiritual-gold block">
                    {language === 'te' ? "బ్యాంక్ ఖాతా వివరాలు" : "BANK ACCOUNT DETAILS"}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5 text-center">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-spiritual-maroon/60 block">
                      {language === 'te' ? "ఖాతా సంఖ్య" : "Account Number"}
                    </span>
                    <div className="bg-white border-2 border-spiritual-maroon/10 focus-within:border-spiritual-gold/40 py-2.5 px-4 rounded-2xl flex items-center justify-between gap-4 max-w-sm mx-auto shadow-sm">
                      <span className="font-mono text-xs sm:text-sm font-bold text-spiritual-maroon tracking-wider select-all">
                        4852135000008261
                      </span>
                      <button 
                        onClick={() => handleCopyValue("4852135000008261", language === 'te' ? "ఖాతా సంఖ్య కాపీ విజయవంతమైంది!" : "Account Number copied successfully!", "accNum")}
                        className="p-2 bg-spiritual-maroon text-spiritual-cream hover:bg-spiritual-gold hover:text-spiritual-cream rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center group shrink-0"
                        title={language === 'te' ? "ఖాతా సంఖ్యను కాపీ చేయండి" : "Copy Account Number"}
                      >
                        {copiedField === "accNum" ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} className="group-hover:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-center">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-spiritual-maroon/60 block">
                      {language === 'te' ? "IFSC కోడ్" : "IFSC Code"}
                    </span>
                    <div className="bg-white border-2 border-spiritual-maroon/10 focus-within:border-spiritual-gold/40 py-2.5 px-4 rounded-2xl flex items-center justify-between gap-4 max-w-sm mx-auto shadow-sm">
                      <span className="font-mono text-xs sm:text-sm font-bold text-spiritual-maroon tracking-wider select-all">
                        KVBL0004852
                      </span>
                      <button 
                        onClick={() => handleCopyValue("KVBL0004852", language === 'te' ? "IFSC కోడ్ కాపీ విజయవంతమైంది!" : "IFSC Code copied successfully!", "ifsc")}
                        className="p-2 bg-spiritual-maroon text-spiritual-cream hover:bg-spiritual-gold hover:text-spiritual-cream rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center group shrink-0"
                        title={language === 'te' ? "IFSC కోడ్ కాపీ చేయండి" : "Copy IFSC Code"}
                      >
                        {copiedField === "ifsc" ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} className="group-hover:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-spiritual-gold/15 text-center">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-spiritual-maroon/60 block">
                      {language === 'te' ? "బ్యాంక్" : "Bank"}
                    </span>
                    <div className="font-serif text-sm font-black text-spiritual-maroon tracking-wide">
                      Karur Vysya Bank
                    </div>
                    <div className="text-[10px] text-spiritual-dark/70 font-display">
                      {language === 'te' ? "సిద్దిపేట శాఖ" : "Siddipet Branch"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-spiritual-maroon/5 border-2 border-dashed border-spiritual-gold/25 p-4 rounded-2xl text-center">
              <p className="text-xs text-spiritual-maroon font-serif leading-relaxed max-w-xs mx-auto">
                {language === 'te' 
                  ? "మీ విరాళం భగవద్ సేవకు ఆహార దాతృత్వమునకు ఆలయ నిర్మాణ వికాసమునకు సపోర్ట్ చేస్తుంది." 
                  : "All contributions directly support public Sankeertana concerts, local temple pujas, and community services."}
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.9 }}
            className="fixed bottom-8 left-1/2 bg-spiritual-dark/95 backdrop-blur-md text-spiritual-cream px-6 py-3 rounded-full shadow-2xl z-[300] flex items-center gap-3 border border-spiritual-gold/25"
          >
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white">
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="font-display text-xs uppercase tracking-widest font-semibold select-none">
              {toastMessage || tModal.copiedToast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CommunitySection = ({ language }: { language: Language }) => {
  const content = {
    en: {
      badge: "Spiritual Connectivity",
      heading: "WhatsApp Devotional Community",
      subtitle: "Join our vibrant global community of devotees and music enthusiasts to stay connected with the divine.",
      desc: "Receive daily highlights of Sri Annamacharya Sankeertanas, notifications about upcoming Kalyanotsavams (celestial weddings), special pooja and temple program schedules, spiritual and Vedic discourses, and direct notifications for live performances by Singer Annamayya Pavan Siddipet.",
      tip: "We respect your digital privacy. This is an announcement-only WhatsApp community channel - other members cannot see your private mobile number, ensuring a secure and peaceful experience.",
      buttonText: "Join WhatsApp Channel",
      tagline: "Om Namo Venkatesaya"
    },
    te: {
      badge: "ఆధ్యాత్మిక సమూహం",
      heading: "వాట్సాప్ భక్తి కమ్యూనిటీ",
      subtitle: "దివ్య సమాచారం మరియు భక్తి సాన్నిహిత్యంతో కనెక్ట్ కావడానికి మా వాట్సాప్ కమ్యూనిటీలో చేరండి.",
      desc: "శ్రీ అన్నమాచార్య సంకీర్తనల రోజువారీ విశేషాలు, జరగబోయే కళ్యాణోత్సవ వివరాలు, ప్రత్యేక పూజలు మరియు కార్యక్రమాల సమాచారం, మరియు సింగర్ అన్నమయ్య పవన్ గారి భక్తి సంగీత ప్రదర్శనల వివరాలు నేరుగా మీ మొబైల్‌లో పొందండి.",
      tip: "మేము మీ డిజిటల్ గోప్యతను గౌరవిస్తాము. ఇది కేవలం సమాచారం తెలిపే వాట్సాప్ కమ్యూనిటీ ఛానల్ - మీ మొబైల్ నంబర్ ఇతరులకి కనిపించదు, ఇది ఎంతో సురక్షితమైన అనుభవం.",
      buttonText: "వాట్సాప్ ఛానల్‌లో చేరండి",
      tagline: "ఓం నమో వేంకటేశాయ"
    }
  }[language];

  return (
    <div className="py-20 md:py-32 px-6 max-w-7xl mx-auto font-sans">
      <div className="bg-white/90 backdrop-blur-md rounded-[3rem] p-8 md:p-16 shadow-xl border border-spiritual-gold/15 max-w-5xl mx-auto overflow-hidden relative">
        {/* Spiritual backdrop details */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-spiritual-maroon/5 rounded-full filter blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-spiritual-gold/5 rounded-full filter blur-3xl -z-10" />

        <div className="text-center space-y-6">
          <span className="text-spiritual-gold font-serif italic text-base md:text-lg block tracking-widest font-medium">
            {content.tagline}
          </span>
          <span className="bg-spiritual-maroon/5 border border-spiritual-maroon/10 text-spiritual-maroon text-[10px] md:text-xs font-display font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full inline-block">
            {content.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-spiritual-maroon font-bold tracking-tight">
            {content.heading}
          </h2>
          <div className="w-24 md:w-32 h-1 bg-spiritual-gold mx-auto"></div>
          
          <p className="text-base md:text-lg text-spiritual-dark font-medium max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>

          <p className="text-sm md:text-base text-spiritual-dark/80 font-light max-w-3xl mx-auto leading-relaxed pt-2">
            {content.desc}
          </p>

          <div className="bg-spiritual-cream/40 border border-spiritual-gold/10 rounded-2xl p-4 md:p-6 max-w-2xl mx-auto text-center">
            <p className="text-xs md:text-sm text-spiritual-maroon/80 font-serif italic leading-relaxed">
              {content.tip}
            </p>
          </div>

          <div className="pt-6">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="https://whatsapp.com/channel/0029Vb7nBbVAInPqEv2NQx1I"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-display text-xs md:text-sm uppercase tracking-widest font-bold px-10 py-5 rounded-full shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MessageCircle size={20} fill="currentColor" />
              {content.buttonText}
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ activeSection, setActiveSection, t, language, setLanguage, scrollToSection }: { 
  activeSection: Section, 
  setActiveSection: (s: Section) => void, 
  t: any,
  language: Language,
  setLanguage: (l: Language) => void,
  scrollToSection: (id: string) => void
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  const navItems: { id: Section; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'story', label: t.nav.story },
    { id: 'events', label: t.nav.events },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'archives', label: t.nav.archives },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-spiritual-cream/95 backdrop-blur-md shadow-sm">
      <div className="max-w-full xl:max-w-[95%] mx-auto px-4 xl:px-8 flex justify-between items-center gap-4 py-2 md:py-3">
        {/* Left Side: Logo + Title + Desktop Menu Items with professional margin & spacing */}
        <div className="flex items-center gap-6 xl:gap-8 2xl:gap-11 flex-shrink-0">
          <div 
            className="flex items-center gap-3 sm:gap-4 cursor-pointer group flex-shrink-0"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={logo} 
              alt="Sri Annamacharya Sangeetha Nruthya Kalaa Kshetram Logo" 
              className="rounded-full border-2 border-spiritual-gold/25 object-cover group-hover:scale-105 transition-all duration-500 shadow-sm flex-shrink-0 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col select-none flex-shrink-0">
              <div className="font-display font-black tracking-[0.05em] text-spiritual-maroon uppercase leading-tight transition-all duration-500 text-[8px] sm:text-[9.5px]/none md:text-[10.5px] lg:text-[11px] xl:text-[11px] 2xl:text-[13px]">
                <div className="block whitespace-nowrap">SRI ANNAMACHARYA</div>
                <div className="block whitespace-nowrap">SANGEETHA NRUTHYA</div>
                <div className="block whitespace-nowrap">KALAA KSHETRAM</div>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-2 xl:gap-3 2xl:gap-4.5 flex-shrink-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-display text-[9.5px] xl:text-[10px] 2xl:text-xs uppercase tracking-normal xl:tracking-wider 2xl:tracking-widest transition-colors relative py-1 ${
                  activeSection === item.id ? 'text-spiritual-maroon font-semibold' : 'text-spiritual-dark/60 hover:text-spiritual-maroon'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-spiritual-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Desktop Actions (Language Switcher, Buttons, Avatar Logo) */}
        <div className="hidden xl:flex items-center gap-1.5 xl:gap-2 2xl:gap-3 flex-shrink-0">
          {/* Language Switcher */}
          <button 
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-full border border-spiritual-maroon/20 text-spiritual-maroon hover:bg-spiritual-maroon hover:text-spiritual-cream transition-all text-[9.5px] xl:text-[10px] 2xl:text-xs font-display uppercase tracking-normal xl:tracking-wider 2xl:tracking-widest font-semibold flex-shrink-0"
          >
            <Languages size={13} />
            {language === 'en' ? 'తెలుగు' : 'English'}
          </button>

          <button 
            onClick={() => handleNavClick('donate')}
            className="bg-spiritual-gold text-spiritual-cream px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-full font-display text-[9.5px] xl:text-[10px] 2xl:text-xs uppercase tracking-normal xl:tracking-wider 2xl:tracking-widest hover:bg-spiritual-gold/90 transition-all hover:shadow-lg hover:-translate-y-0.5 flex-shrink-0"
          >
            {t.nav.donate}
          </button>

          <button 
            onClick={() => handleNavClick('community')}
            className="bg-spiritual-maroon text-spiritual-cream px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-full font-display text-[9.5px] xl:text-[10px] 2xl:text-xs uppercase tracking-normal xl:tracking-wider 2xl:tracking-widest hover:bg-spiritual-maroon/90 transition-all hover:shadow-lg hover:-translate-y-0.5 flex-shrink-0"
          >
            {t.nav.join}
          </button>

          <div className="flex flex-col items-center select-none flex-shrink-0 ml-1 xl:ml-2">
            <img 
              src={pavanLogo} 
              alt="Annamacharya Pavan Logo" 
              className="rounded-full border-2 border-spiritual-gold/45 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 object-cover cursor-pointer hover:scale-110 transition-all duration-500 shadow-sm flex-shrink-0"
              referrerPolicy="no-referrer"
              onClick={() => handleNavClick('home')}
            />
            <span className="uppercase text-spiritual-gold font-bold mt-1 text-center whitespace-nowrap transition-all duration-500 text-[6.5px] xl:text-[7.5px] 2xl:text-[8px] tracking-[0.08em] xl:tracking-[0.1em]">
              {language === 'en' ? 'OM NAMO VENKATESAYA' : 'ఓం నమో వేంకటేశాయ'}
            </span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 xl:hidden">
          <img 
            src={pavanLogo} 
            alt="Annamacharya Pavan Logo" 
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-spiritual-maroon/15 object-cover cursor-pointer hover:scale-105 transition-all duration-350"
            referrerPolicy="no-referrer"
            onClick={() => handleNavClick('home')}
          />
          <button 
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-spiritual-maroon/20 text-spiritual-maroon text-[10px] font-display uppercase tracking-widest font-bold"
          >
            {language === 'en' ? 'TE' : 'EN'}
          </button>
          <button className="text-spiritual-maroon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-spiritual-cream border-t border-spiritual-maroon/10 shadow-xl xl:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-display text-lg text-left ${activeSection === item.id ? 'text-spiritual-maroon' : 'text-spiritual-dark/60'}`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => handleNavClick('donate')}
                className="bg-spiritual-gold text-spiritual-cream px-6 py-3 rounded-xl font-display text-center uppercase tracking-widest"
              >
                {t.nav.donate}
              </button>
              <button 
                onClick={() => handleNavClick('community')}
                className="bg-spiritual-maroon text-spiritual-cream px-6 py-3 rounded-xl font-display text-center uppercase tracking-widest"
              >
                {t.nav.join}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Home = ({ onExplore, t }: { onExplore: () => void, t: any }) => {
  const [hoverZone, setHoverZone] = useState<'left' | 'middle' | 'right' | 'none'>('none');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Side zones are 20% of the width
    if (x < width * 0.2) {
      setHoverZone('left');
    } else if (x > width * 0.8) {
      setHoverZone('right');
    } else {
      setHoverZone('middle');
    }
  };

  return (
    <div className="flex flex-col items-center bg-spiritual-cream pt-16 md:pt-32 pb-16 md:pb-20">
      {/* Banner Section */}
      <div 
        className="relative w-[95%] max-w-7xl min-h-[70vh] md:min-h-[85vh] py-12 md:py-20 flex items-center justify-center overflow-hidden rounded-[2rem] md:rounded-[4rem] shadow-2xl cursor-crosshair group/banner mb-16 md:mb-24"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverZone('none')}
      >
        {/* Banner Image - The "Overlay" layer */}
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center"
          animate={{ 
            scale: (hoverZone === 'left' || hoverZone === 'right') ? 1.15 : 1,
            filter: (hoverZone === 'left' || hoverZone === 'right') ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)',
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src={bannerImg} 
            alt="Pavan Events Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Subtle overlay gradient to help text when visible */}
          <div className={`absolute inset-0 bg-black/10 transition-opacity duration-700 ${hoverZone === 'left' || hoverZone === 'right' ? 'opacity-0' : 'opacity-100'}`} />
        </motion.div>

        {/* Hero Content - Fades out when hovering sides to let image "overlay" the view */}
        <motion.div 
          className="relative z-10 w-full h-full flex items-center justify-center px-4 md:px-6"
          animate={{ 
            opacity: (hoverZone === 'left' || hoverZone === 'right') ? 0 : 1,
            scale: (hoverZone === 'left' || hoverZone === 'right') ? 0.9 : 1,
            y: (hoverZone === 'left' || hoverZone === 'right') ? 40 : 0,
            filter: (hoverZone === 'left' || hoverZone === 'right') ? 'blur(10px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="max-w-4xl w-full text-center bg-spiritual-cream/90 backdrop-blur-xl py-12 md:py-24 px-6 md:px-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/30 shadow-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block font-serif italic text-spiritual-maroon text-xl sm:text-2xl md:text-4xl font-semibold mb-4 md:mb-6"
            >
              {t.hero.tagline}
            </motion.span>
            <h1 className="text-3xl md:text-7xl font-display font-bold text-spiritual-maroon leading-[1.2] mb-6 md:mb-8">
              {t.hero.title} <br />
              <span className="text-spiritual-gold italic font-serif">{t.hero.subtitle}</span>
            </h1>
            <p className="text-sm md:text-lg text-spiritual-dark max-w-2xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed opacity-90">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
              <button 
                onClick={onExplore}
                className="w-full sm:w-auto group relative px-12 py-4 bg-spiritual-maroon text-spiritual-cream rounded-full font-display tracking-widest uppercase text-xs overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="relative z-10">{t.hero.cta}</span>
                <div className="absolute inset-0 bg-spiritual-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
              <a 
                href="https://whatsapp.com/channel/0029Vb7nBbVAInPqEv2NQx1I"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-4 bg-white border-2 border-spiritual-maroon/10 rounded-full font-display tracking-widest uppercase text-xs hover:bg-spiritual-cream transition-all text-spiritual-maroon shadow-lg hover:-translate-y-1"
              >
                <MessageCircle size={18} className="text-green-600" />
                {t.hero.whatsapp}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Side Hover Indicators (Visual feedback) */}
        <div className="absolute inset-y-0 left-0 w-[20%] z-20 pointer-events-none bg-gradient-to-r from-black/5 to-transparent opacity-0 group-hover/banner:opacity-100 transition-opacity" />
        <div className="absolute inset-y-0 right-0 w-[20%] z-20 pointer-events-none bg-gradient-to-l from-black/5 to-transparent opacity-0 group-hover/banner:opacity-100 transition-opacity" />
      </div>

      {/* YouTube Video Section */}
      <div className="w-full py-16 md:py-24 flex flex-col items-center gap-8 md:gap-12">
        <div className="text-center space-y-4 mb-4 md:mb-8 px-6">
          <h2 className="text-3xl md:text-6xl font-display font-bold text-black">{t.video.title}</h2>
          <p className="text-base md:text-2xl font-display tracking-wider text-mango font-bold">
            {t.video.channel}
          </p>
        </div>
        
        <div className="relative shadow-2xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-spiritual-gold/10 w-[90%] max-w-[850px] aspect-video">
          <YoutubeIframe 
            id="hero-video"
            videoId="IcWeRUuWMyI"
            srcParams="si=vpaR91KYU0Fzl3C-"
            title="YouTube video player"
            className="w-full h-full border-0"
          />
        </div>
 
        {/* Video Context */}
        <div className="max-w-5xl mx-6 px-8 md:px-12 py-10 md:py-16 bg-gray-200/50 rounded-[2rem] md:rounded-[3rem] border border-gray-300/50 backdrop-blur-sm">
          <p className="text-black text-lg md:text-xl leading-relaxed font-light text-center italic">
            {t.video.context}
          </p>
        </div>
      </div>
    </div>
  );
};

const OurStory = ({ t }: { t: any }) => {
  const stats = [
    { 
      title: t.stats.sankeertanalu.title, 
      desc: t.stats.sankeertanalu.desc 
    },
    { 
      title: t.stats.viewers.title, 
      desc: t.stats.viewers.desc 
    },
    { 
      title: t.stats.students.title, 
      desc: t.stats.students.desc 
    },
    { 
      title: t.stats.kalyanam.title, 
      desc: t.stats.kalyanam.desc 
    }
  ];

  return (
    <div className="py-20 md:py-32 px-6 max-w-7xl mx-auto space-y-24 md:space-y-40">
      <div className="text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-spiritual-gold text-white px-5 py-1.5 rounded-lg font-display text-xs uppercase tracking-widest inline-block"
        >
          {t.story.badge}
        </motion.span>
      </div>

      {/* Significant Milestones */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-8 md:space-y-12 py-16 md:py-32 bg-spiritual-maroon/5 rounded-[3rem] md:rounded-[5rem] border border-spiritual-maroon/5"
      >
        <h2 className="text-3xl md:text-7xl font-display text-spiritual-gold px-4">{t.story.milestonesTitle}</h2>
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10 px-6 md:px-12">
          <p className="text-lg md:text-4xl text-spiritual-dark/80 font-light leading-relaxed">{t.story.milestonesDesc}</p>
          <div className="h-px w-32 md:w-48 bg-spiritual-gold/30 mx-auto"></div>
          <p className="text-lg md:text-2xl italic font-serif text-spiritual-maroon max-w-4xl mx-auto leading-relaxed">{t.story.milestonesQuote}</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-spiritual-gold/5 p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-spiritual-gold/10 hover:bg-spiritual-gold/10 transition-all duration-500 group"
          >
            <h3 className="text-2xl md:text-3xl font-display text-spiritual-maroon mb-6 md:mb-8 group-hover:text-spiritual-gold transition-colors">{stat.title}</h3>
            <p className="text-spiritual-dark/60 font-light leading-relaxed text-base md:text-lg">{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Mission */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row bg-spiritual-cream/50 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-spiritual-maroon/10 shadow-lg"
        >
          <div className="lg:w-2/5 h-64 md:h-80 lg:h-auto">
            <img src={missionImg} alt="Mission" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="lg:w-3/5 p-10 md:p-16 space-y-6 md:space-y-8">
            <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-spiritual-gold rounded-full flex items-center justify-center text-spiritual-gold">
              <Heart size={28} />
            </div>
            <h3 className="text-3xl md:text-5xl font-display text-spiritual-gold">{t.story.missionTitle}</h3>
            <p className="text-spiritual-dark/70 font-light leading-relaxed text-lg md:text-xl">
              {t.story.missionDesc}
            </p>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row bg-spiritual-cream/50 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-spiritual-maroon/10 shadow-lg"
        >
          <div className="lg:w-2/5 h-64 md:h-80 lg:h-auto">
            <img src={visionImg} alt="Vision" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="lg:w-3/5 p-10 md:p-16 space-y-6 md:space-y-8">
            <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-spiritual-gold rounded-full flex items-center justify-center text-spiritual-gold">
              <BookOpen size={28} />
            </div>
            <h3 className="text-3xl md:text-5xl font-display text-spiritual-gold">{t.story.visionTitle}</h3>
            <p className="text-spiritual-dark/70 font-light leading-relaxed text-lg md:text-xl">
              {t.story.visionDesc}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Gallery = ({ onViewFull, onImageClick, t }: { onViewFull: () => void, onImageClick: (src: string) => void, t: any }) => {
  // Show images from img8 to img30 (indices 7 to 29)
  const displayImages = ALL_IMAGES_DATA
    .filter(img => img.num >= 8 && img.num <= 30)
    .map(img => img.src);

  return (
    <div className="py-20 md:py-32 px-6 max-w-[1600px] mx-auto">
      <div className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-spiritual-gold text-white px-5 py-1.5 rounded-lg font-display text-xs uppercase tracking-widest inline-block"
        >
          {t.gallery.badge}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-7xl font-display text-spiritual-maroon"
        >
          {t.gallery.title}
        </motion.h2>
      </div>

      {/* Grid with uniform sizes (aspect-square) */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-8">
        {displayImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.1 }}
            className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl cursor-pointer aspect-square"
            onClick={() => onImageClick(src)}
          >
            <img 
              src={src} 
              alt={`Gallery ${i}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-spiritual-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                <ChevronRight size={24} className="md:w-8 md:h-8" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 md:mt-24 text-center">
        <button 
          onClick={onViewFull}
          className="px-10 py-4 md:px-14 md:py-5 bg-spiritual-gold text-white rounded-full font-display uppercase tracking-widest text-xs md:text-sm hover:bg-spiritual-gold/90 transition-all shadow-2xl hover:shadow-spiritual-gold/30"
        >
          {t.gallery.viewFull}
        </button>
      </div>
    </div>
  );
};

const FullGallery = ({ onImageClick, t }: { onImageClick: (src: string) => void, t: any }) => {
  const categories = t.gallery.categories;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  // Categorize images based on user request
  const fullDisplayImages = ALL_IMAGES_DATA.filter(img => {
    if (activeCategory === categories[0]) return true;
    const isSankeertanalu = SANKEERTANALU_NUMS.includes(img.num);
    if (activeCategory === categories[1]) return isSankeertanalu;
    if (activeCategory === categories[2]) return !isSankeertanalu;
    return true;
  }).map(img => img.src);

  return (
    <div className="py-20 md:py-32 px-6 max-w-7xl mx-auto space-y-12 md:space-y-20">
      <div className="text-center space-y-6 md:space-y-8">
        <h2 className="text-4xl md:text-8xl font-display text-spiritual-maroon">{t.gallery.title}</h2>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 pt-6 md:pt-10">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 md:px-8 md:py-3 rounded-full font-display text-[10px] md:text-xs uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat 
                ? 'bg-spiritual-maroon text-white border-spiritual-maroon shadow-lg' 
                : 'bg-transparent text-spiritual-maroon border-spiritual-maroon/10 hover:border-spiritual-maroon'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Large Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {fullDisplayImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            className="aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all group cursor-pointer border border-spiritual-maroon/5"
            onClick={() => onImageClick(src)}
          >
            <img 
              src={src} 
              alt={`Full Gallery ${i}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FullEvents = ({ t }: { t: any }) => {
  const detailedEvents = [
    {
      title: t.events.sankeertanalu.title,
      image: img73,
      description: t.events.sankeertanalu.desc
    },
    {
      title: t.events.kalyanam.title,
      image: img10,
      description: t.events.kalyanam.desc
    }
  ];

  return (
    <div className="py-16 md:py-32 px-6 max-w-7xl mx-auto space-y-16 md:space-y-32">
      <div className="text-center space-y-6 md:space-y-8">
        <h2 className="text-4xl md:text-8xl font-display text-spiritual-maroon">{t.events.fullTitle}</h2>
        <p className="text-spiritual-gold font-serif italic text-xl md:text-2xl">{t.events.subtitle}</p>
      </div>

      <div className="space-y-24 md:space-y-48">
        {detailedEvents.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 md:gap-16"
          >
            <div className="space-y-6 md:space-y-10">
              <h3 className="text-3xl md:text-6xl font-display text-spiritual-maroon border-l-[8px] md:border-l-[12px] border-spiritual-gold pl-6 md:pl-8">
                {event.title}
              </h3>
              <div className="w-full h-[40vh] md:h-[85vh] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 md:border-8 border-spiritual-gold/10">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="max-w-5xl mx-auto pt-8 md:pt-12">
                <p className="text-lg md:text-2xl text-spiritual-dark/80 leading-relaxed font-light first-letter:text-5xl md:first-letter:text-7xl first-letter:font-display first-letter:text-spiritual-maroon first-letter:mr-3 md:first-letter:mr-4 first-letter:float-left first-letter:mt-1 md:first-letter:mt-2">
                  {event.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Events = ({ onShowMore, t }: { onShowMore: () => void, t: any }) => {
  const events = [
    {
      title: t.events.sankeertanalu.title,
      subtitle: t.events.sankeertanalu.subtitle,
      image: img73,
      description: t.events.sankeertanalu.desc,
      details: t.events.sankeertanalu.tags,
      icon: <Music className="text-spiritual-gold" />,
      tag: t.events.sankeertanalu.tag
    },
    {
      title: t.events.kalyanam.title,
      subtitle: t.events.kalyanam.subtitle,
      image: img10,
      description: t.events.kalyanam.desc,
      details: t.events.kalyanam.tags,
      icon: <Calendar className="text-spiritual-gold" />,
      tag: t.events.kalyanam.tag
    }
  ];

  return (
    <div className="py-20 md:py-40 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-spiritual-gold font-serif italic text-lg md:text-xl"
        >
          {t.events.badge}
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-7xl font-display text-spiritual-maroon mt-4"
        >
          {t.events.title}
        </motion.h2>
        <div className="w-24 md:w-32 h-1 bg-spiritual-gold mx-auto mt-6 md:mt-8"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="group bg-spiritual-cream/50 border border-spiritual-maroon/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 md:p-8">
              <span className="text-[10px] uppercase tracking-widest font-bold bg-spiritual-maroon/5 text-spiritual-maroon px-4 py-1.5 rounded-full">
                {event.tag}
              </span>
            </div>
            
            <div className="w-full h-56 md:h-80 mb-8 md:mb-10 rounded-2xl overflow-hidden shadow-md border border-spiritual-maroon/5">
              <img 
                src={(event as any).image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-16 h-16 md:w-20 md:h-20 bg-spiritual-cream rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              {React.cloneElement(event.icon as React.ReactElement, { size: 28 })}
            </div>

            <h3 className="text-3xl md:text-4xl font-display text-spiritual-maroon mb-3 md:mb-4">{event.title}</h3>
            <p className="text-spiritual-gold font-serif italic text-base md:text-lg mb-6 md:mb-8">{event.subtitle}</p>
            <p className="text-spiritual-dark/60 mb-8 md:mb-10 leading-relaxed text-base md:text-lg">
              {event.description}
            </p>

            <div className="space-y-4 md:space-y-6">
              <h4 className="font-display text-[10px] md:text-xs uppercase tracking-widest text-spiritual-maroon font-bold">{t.events.curriculum}</h4>
              <ul className="grid grid-cols-1 gap-3 md:gap-4">
                {event.details.map((detail: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 md:gap-4 text-sm md:text-base text-spiritual-dark/80">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-spiritual-gold rounded-full"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-10 md:mt-12 flex items-center gap-2 text-spiritual-maroon font-display text-[10px] md:text-xs uppercase tracking-widest font-bold group-hover:gap-4 transition-all">
              {t.events.learnMore} <ChevronRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 md:mt-24 text-center">
        <button 
          onClick={onShowMore}
          className="px-12 py-4 md:px-16 md:py-6 bg-spiritual-maroon text-spiritual-cream rounded-full font-display uppercase tracking-widest text-xs md:text-sm hover:bg-spiritual-maroon/90 transition-all shadow-2xl hover:shadow-spiritual-maroon/30 flex items-center gap-4 mx-auto"
        >
          {t.events.knowMore} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const About = ({ t }: { t: any }) => {
  return (
    <div className="py-20 md:py-40 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-spiritual-gold font-serif italic text-lg md:text-xl">{t.about.badge}</span>
          <h2 className="text-3xl md:text-7xl font-display text-spiritual-maroon mt-4 mb-8 md:mb-10">{t.about.name}</h2>
          
          <div className="prose prose-spiritual text-spiritual-dark/70 leading-relaxed space-y-6 md:space-y-8 text-lg md:text-xl font-light">
            <p>
              {t.about.desc1}
            </p>
            <p>
              {t.about.desc2}
            </p>
          </div>

          <div className="mt-12 md:mt-16 space-y-6 md:space-y-8">
            <h4 className="font-display text-[10px] md:text-sm uppercase tracking-widest text-spiritual-maroon font-bold">{t.about.affiliations}</h4>
            <div className="grid gap-4 md:gap-6">
              {t.about.affiliationsList.map((aff: { name: string, location: string }, i: number) => (
                <div key={i} className="flex items-start gap-4 md:gap-6 p-5 md:p-6 bg-spiritual-cream/50 border border-spiritual-maroon/10 rounded-[1.5rem] md:rounded-[2rem] shadow-sm">
                  <div className="mt-1"><MapPin size={20} className="text-spiritual-gold md:w-6 md:h-6" /></div>
                  <div>
                    <p className="font-display text-base md:text-lg text-spiritual-maroon">{aff.name}</p>
                    <p className="text-[10px] md:text-sm text-spiritual-dark/50 uppercase tracking-wider mt-1">{aff.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="aspect-square bg-spiritual-maroon/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative group">
            <img 
              src={img84} 
              alt="Annamayya Pavan" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Stats/Highlights */}
          <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 bg-spiritual-gold p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-white"><Users size={28} className="md:w-10 md:h-10" /></div>
              <div>
                <p className="text-2xl md:text-4xl font-display text-white">3000+</p>
                <p className="text-[8px] md:text-xs text-white/80 uppercase tracking-widest font-bold mt-1">{t.about.studentsTrained}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Contact = ({ t }: { t: any }) => {
  return (
    <div className="py-12 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-spiritual-maroon rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative p-8 sm:p-14 md:p-24 text-spiritual-cream text-center"
      >
        {/* Subtle decorative background blur gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-spiritual-gold/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-spiritual-gold/5 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-spiritual-gold font-serif italic text-base md:text-xl block"
          >
            {t.contact.badge}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-5xl md:text-7xl font-display mt-4 mb-6 leading-tight max-w-2xl"
          >
            {t.contact.title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-spiritual-cream/70 mb-12 md:mb-16 font-light leading-relaxed text-base md:text-lg max-w-2xl"
          >
            {t.contact.desc}
          </motion.p>
        </div>

        {/* Premium multi-column responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10 max-w-5xl mx-auto">
          {/* Phone Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 hover:border-spiritual-gold/30 hover:bg-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-spiritual-gold mb-6 shadow-inner">
              <Phone size={24} />
            </div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-spiritual-gold font-bold mb-2">{t.contact.callUs}</p>
            <p className="font-display text-base sm:text-lg md:text-2xl font-semibold">+91 73311 27051</p>
          </motion.div>

          {/* Email Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 hover:border-spiritual-gold/30 hover:bg-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-spiritual-gold mb-6 shadow-inner">
              <Mail size={24} />
            </div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-spiritual-gold font-bold mb-2">{t.contact.email}</p>
            <p className="font-display text-[11px] min-[360px]:text-xs sm:text-lg md:text-xl font-semibold whitespace-nowrap">admin@annamayyapavan.org.in</p>
          </motion.div>

          {/* WhatsApp Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -5 }}
            className="bg-white/5 border border-white/10 hover:border-spiritual-gold/30 hover:bg-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl flex flex-col items-center text-center transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-spiritual-gold mb-6 shadow-inner">
              <MessageCircle size={24} />
            </div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-spiritual-gold font-bold mb-2">{t.contact.whatsapp}</p>
            <a 
              href="https://whatsapp.com/channel/0029Vb7nBbVAInPqEv2NQx1I" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-display text-base sm:text-lg md:text-xl font-semibold text-white hover:text-spiritual-gold transition-colors underline underline-offset-4 decoration-spiritual-gold/30"
            >
              {t.contact.joinCommunity}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Footer = ({ t, scrollToSection }: { t: any, scrollToSection: (id: string) => void }) => {
  return (
    <footer className="bg-spiritual-dark text-spiritual-cream pt-16 md:pt-32 pb-12 md:pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-32">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-spiritual-maroon rounded-full flex items-center justify-center text-spiritual-gold font-display font-bold text-xl md:text-2xl shadow-lg">P</div>
              <span className="font-display font-bold text-xl md:text-2xl tracking-wider">PAVAN EVENTS</span>
            </div>
            <p className="text-spiritual-cream/50 text-sm md:text-base leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <motion.a 
                href="https://www.youtube.com/@SingerAnnamayyaPavan" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#FF0000] rounded-full flex items-center justify-center text-white shadow-xl shadow-red-500/20"
              >
                <Youtube size={18} className="md:w-5 md:h-5" fill="currentColor" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/singer_annamayya_pavan" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center text-white shadow-xl shadow-purple-500/20"
              >
                <Instagram size={18} className="md:w-5 md:h-5" />
              </motion.a>
              <motion.a 
                href="https://whatsapp.com/channel/0029Vb7nBbVAInPqEv2NQx1I" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/20"
              >
                <MessageCircle size={18} className="md:w-5 md:h-5" fill="currentColor" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-[10px] md:text-xs uppercase tracking-widest text-spiritual-gold mb-6 md:mb-10 font-bold">{t.footer.nav}</h4>
            <ul className="space-y-4 md:space-y-6 text-sm md:text-base text-spiritual-cream/60">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-spiritual-gold transition-colors">{t.nav.home}</button></li>
              <li><button onClick={() => scrollToSection('donation')} className="hover:text-spiritual-gold transition-colors">{t.nav.donate}</button></li>
              <li><button onClick={() => scrollToSection('events')} className="hover:text-spiritual-gold transition-colors">{t.nav.events}</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-spiritual-gold transition-colors">{t.nav.about}</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-spiritual-gold transition-colors">{t.nav.contact}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] md:text-xs uppercase tracking-widest text-spiritual-gold mb-6 md:mb-10 font-bold">{t.footer.contact}</h4>
            <ul className="space-y-4 md:space-y-6 text-sm md:text-base text-spiritual-cream/60">
              <li className="flex items-center gap-3 md:gap-4"><Phone size={14} className="text-spiritual-gold md:w-4 md:h-4" /> +91 73311 27051</li>
              <li className="flex items-center gap-3 md:gap-4"><Mail size={14} className="text-spiritual-gold md:w-4 md:h-4" /> admin@annamayyapavan.org.in</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] md:text-xs uppercase tracking-widest text-spiritual-gold mb-6 md:mb-10 font-bold">{t.footer.locations}</h4>
            <ul className="space-y-4 md:space-y-6 text-sm md:text-base text-spiritual-cream/60">
              {t.footer.locationsList.map((loc: string, i: number) => (
                <li key={i}>{loc}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t border-white/5 text-center">
          <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-spiritual-cream/30 font-bold">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const Lightbox = ({ src, onClose }: { src: string, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={40} />
      </button>
      <motion.img 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        src={src} 
        alt="Enlarged view" 
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(() => {
    if (window.location.pathname === '/donate') return 'fullDonation';
    if (window.location.pathname === '/previous-archives') return 'fullArchives';
    return 'home';
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [showLanguagePopup, setShowLanguagePopup] = useState(true);

  const t = translations[language];

  // Sync router and active section with page path
  useEffect(() => {
    try {
      if (activeSection === 'fullDonation') {
        if (window.location.pathname !== '/donate') {
          window.history.pushState(null, '', '/donate');
        }
      } else if (activeSection === 'fullArchives') {
        if (window.location.pathname !== '/previous-archives') {
          window.history.pushState(null, '', '/previous-archives');
        }
      } else {
        if (window.location.pathname === '/donate' || window.location.pathname === '/previous-archives') {
          window.history.pushState(null, '', '/');
        }
      }
    } catch (e) {
      console.warn('History pushState failed (non-critical in sandbox):', e);
    }
  }, [activeSection]);

  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname;
        if (path === '/donate') {
          setActiveSection('fullDonation');
        } else if (path === '/previous-archives') {
          setActiveSection('fullArchives');
        } else {
          setActiveSection('home');
        }
      } catch (e) {
        console.warn(e);
      }
    };
    try {
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Scroll to top when switching to full views, but save position first
  useEffect(() => {
    const isFullView = activeSection === 'fullGallery' || activeSection === 'fullEvents' || activeSection === 'fullDonation' || activeSection === 'fullArchives';
    
    if (isFullView) {
      // Only save scroll position if we are currently on the main page (scrollY > 0)
      // and not already in a full view (which would have scrollY at 0)
      if (window.scrollY > 0) {
        setScrollPosition(window.scrollY);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  const handleBackToHome = () => {
    setActiveSection('home');
    // Use a small timeout to ensure the DOM is rendered before scrolling
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }, 50);
  };

  // Lock scroll when lightbox or language popup are open
  useEffect(() => {
    if (selectedImage || showLanguagePopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage, showLanguagePopup]);

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    if (activeSection === 'fullGallery' || activeSection === 'fullEvents' || activeSection === 'fullDonation' || activeSection === 'fullArchives') return;

    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'our-story') {
            setActiveSection('story');
          } else if (id === 'previous-archives') {
            setActiveSection('archives');
          } else if (id === 'donate') {
            setActiveSection('donate');
          } else if (id === 'about') {
            setActiveSection('about');
          } else if (id === 'contact') {
            setActiveSection('contact');
          } else if (id === 'home') {
            setActiveSection('home');
          } else if (id === 'events') {
            setActiveSection('events');
          } else if (id === 'gallery') {
            setActiveSection('gallery');
          } else if (id === 'community') {
            setActiveSection('community');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    const sections = ['home', 'our-story', 'events', 'gallery', 'previous-archives', 'about', 'contact', 'donate', 'community'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    let elementId = id;
    if (id === 'story') elementId = 'our-story';
    if (id === 'archives') elementId = 'previous-archives';
    if (id === 'donation' || id === 'donate') elementId = 'donate';
    if (id === 'community') elementId = 'community';

    if (elementId === 'home') {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If we are in full view mode, we need to switch back to 'home' (main page) first
    const isFullView = activeSection === 'fullGallery' || activeSection === 'fullEvents' || activeSection === 'fullDonation' || activeSection === 'fullArchives';

    if (isFullView) {
      setActiveSection('home');
      // Wait for re-render then scroll
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(elementId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLanguagePopup(false);
  };

  return (
    <div className="min-h-screen bg-spiritual-cream selection:bg-spiritual-maroon selection:text-spiritual-cream">
      <AnimatePresence>
        {showLanguagePopup && <LanguagePopup onSelect={handleLanguageSelect} />}
      </AnimatePresence>

      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        t={t} 
        language={language}
        setLanguage={setLanguage}
        scrollToSection={scrollToSection}
      />
      
      <main className="pt-[60px] sm:pt-[64px] md:pt-[80px]">
        <AnimatePresence mode="wait">
          {activeSection === 'fullGallery' ? (
            <motion.div
              key="fullGallery"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <FullGallery onImageClick={setSelectedImage} t={t} />
              <div className="pb-20 text-center">
                <button 
                  onClick={handleBackToHome}
                  className="px-8 py-3 bg-spiritual-maroon text-white rounded-full font-display uppercase tracking-widest text-xs hover:bg-spiritual-maroon/90 transition-all"
                >
                  {t.nav.backToHome}
                </button>
              </div>
            </motion.div>
          ) : activeSection === 'fullEvents' ? (
            <motion.div
              key="fullEvents"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <FullEvents t={t} />
              <div className="pb-20 text-center">
                <button 
                  onClick={handleBackToHome}
                  className="px-8 py-3 bg-spiritual-maroon text-white rounded-full font-display uppercase tracking-widest text-xs hover:bg-spiritual-maroon/90 transition-all"
                >
                  {t.nav.backToHome}
                </button>
              </div>
            </motion.div>
          ) : activeSection === 'fullDonation' ? (
            <motion.div
              key="donation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <Donation t={t} onBack={handleBackToHome} language={language} />
              <div className="pb-20 text-center">
                <button 
                  onClick={handleBackToHome}
                  className="px-8 py-3 bg-spiritual-maroon text-white rounded-full font-display uppercase tracking-widest text-xs hover:bg-spiritual-maroon/90 transition-all"
                >
                  {t.nav.backToHome}
                </button>
              </div>
            </motion.div>
          ) : activeSection === 'fullArchives' ? (
            <motion.div
              key="archives"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <ArchivesPage language={language} onBack={handleBackToHome} />
            </motion.div>
          ) : (
            <motion.div
              key="mainContent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <section id="home">
                <Home onExplore={() => scrollToSection('story')} t={t} />
              </section>
              <section id="our-story">
                <OurStory t={t} />
              </section>
              <section id="events">
                <Events onShowMore={() => setActiveSection('fullEvents')} t={t} />
              </section>
              <section id="gallery">
                <Gallery onViewFull={() => setActiveSection('fullGallery')} onImageClick={setSelectedImage} t={t} />
              </section>
              <section id="previous-archives" className="bg-spiritual-maroon/5 border-t border-b border-spiritual-gold/10">
                <ArchivesSection language={language} onViewMore={() => setActiveSection('archives')} />
              </section>
              <section id="donate" className="border-bottom border-spiritual-gold/10">
                <Donation t={t} language={language} isSection={true} />
              </section>
              <section id="about">
                <About t={t} />
              </section>
              <section id="community" className="bg-spiritual-maroon/5 border-t border-b border-spiritual-gold/10">
                <CommunitySection language={language} />
              </section>
              <section id="contact">
                <Contact t={t} />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer t={t} scrollToSection={scrollToSection} />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://whatsapp.com/channel/0029Vb7nBbVAInPqEv2NQx1I"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex-center shadow-2xl hover:scale-110 transition-transform hover:bg-green-600 flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
