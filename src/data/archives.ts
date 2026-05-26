export interface ArchiveVideo {
  id: string; // YouTube Video ID
  titleEn: string;
  titleTe: string;
  subtitleEn?: string;
  subtitleTe?: string;
  dateEn?: string;
  dateTe?: string;
}

export interface ArchiveYear {
  year: string;
  videos: ArchiveVideo[];
}

export const ARCHIVES_DATA: ArchiveYear[] = [
  {
    year: "2025",
    videos: [
      {
        id: "IcWeRUuWMyI",
        titleEn: "Sankeertana Sudha Lahari",
        titleTe: "సంకీర్తన సుధా లహరి",
        subtitleEn: "A Soulful Devotional Recital",
        subtitleTe: "మధురమైన అన్నమయ్య భక్తి తరంగాలు",
        dateEn: "Jan 2025",
        dateTe: "జనవరి 2025"
      },
      {
        id: "n38D4oWVGtE",
        titleEn: "Sri Venkateswara Mangalasasanam",
        titleTe: "శ్రీ వేంకటేశ్వర మంగళాశాసనం",
        subtitleEn: "Divine Hymns & Devotional Slokas",
        subtitleTe: "శ్రీనివాసుడికి భక్తి పూర్వక మంగళహారతి",
        dateEn: "Feb 2025",
        dateTe: "ఫిబ్రవరి 2025"
      },
      {
        id: "nbdgURB1XEg",
        titleEn: "Kalyanotsava Vaibhavam",
        titleTe: "కళ్యాణోత్సవ వైభవం",
        subtitleEn: "Celestial Wedding Divine Sangeetam",
        subtitleTe: "స్వామివారి దివ్య కళ్యాణోత్సవ కీర్తనలు",
        dateEn: "Feb 2025",
        dateTe: "ఫిబ్రవరి 2025"
      },
      {
        id: "to3SU5oREXg",
        titleEn: "Adhyatma Sankeertanalu",
        titleTe: "ఆధ్యాత్మిక సంకీర్తనలు",
        subtitleEn: "Philosophical Compositions of Annamayya",
        subtitleTe: "అన్నమయ్య వేదాంత తత్వ ప్రబోధ గీతాలు",
        dateEn: "Mar 2025",
        dateTe: "మార్చి 2025"
      },
      {
        id: "Y3FDFwKtJJk",
        titleEn: "Sri Krishna Pada Seva Sankeertana",
        titleTe: "శ్రీ కృష్ణ పద సేవ సంకీర్తన",
        subtitleEn: "Melodious Vocal Offering to Lord Krishna",
        subtitleTe: "కాళీయ మర్దనుడిపై మధుర గానాంజలి",
        dateEn: "Apr 2025",
        dateTe: "ఏప్రిల్ 2025"
      },
      {
        id: "aI59WyjsnhI",
        titleEn: "Nama Sankeertana Chaitanyam",
        titleTe: "నామ సంకీర్తన చైతన్యం",
        subtitleEn: "Group Worship & Soul-Stirring Melodies",
        subtitleTe: "భక్త సమూహ చైతన్య రామ నామ భజన",
        dateEn: "May 2025",
        dateTe: "మే 2025"
      },
      {
        id: "Yt3MQIBpP8w",
        titleEn: "Govinda Nama Archana",
        titleTe: "గోవింద నామ అర్చన",
        subtitleEn: "Sacred Concert Highlights",
        subtitleTe: "గోవింద నామ స్మరణ దివ్య కచేరీ విశేషాలు",
        dateEn: "Jun 2025",
        dateTe: "జూన్ 2025"
      },
      {
        id: "WzuQH7_dECE",
        titleEn: "Annamacharya Shraddhanjali",
        titleTe: "అన్నమాచార్య శ్రద్ధాంజలి",
        subtitleEn: "Classical Renditions of Saint's Gems",
        subtitleTe: "వాగ్గేయకారునికి స్వరార్చన నివాళి",
        dateEn: "Jun 2025",
        dateTe: "జూన్ 2025"
      },
      {
        id: "1Zdfuq8UdR0",
        titleEn: "Srinivasa Divya Sangeeta Seva",
        titleTe: "శ్రీనివాస దివ్య సంగీత సేవ",
        subtitleEn: "Temple Concert Performance in Siddipet",
        subtitleTe: "సిద్దిపేట దివ్యక్షేత్రంలో అన్నమయ్య కీర్తనలు",
        dateEn: "Jul 2025",
        dateTe: "జులై 2025"
      }
    ]
  },
  {
    year: "2024",
    videos: [
      {
        id: "iKikl2gL1g4",
        titleEn: "Dharma Prachara Sankeertanam",
        titleTe: "ధర్మ ప్రచార సంకీర్తనం",
        subtitleEn: "Spreading Sanatana Dharma with Singing",
        subtitleTe: "సంగీతం ద్వారా సనాతన ధర్మ ప్రచారం",
        dateEn: "Jan 2024",
        dateTe: "జనవరి 2024"
      },
      {
        id: "FGXXGrpPeuU",
        titleEn: "Adivo Alladivo Sacred Melodies",
        titleTe: "అదివో అల్లదివో దివ్య మధురిమలు",
        subtitleEn: "Special Concert at Local Temple",
        subtitleTe: "స్థానిక ఆలయంలో ప్రత్యేక ప్రదర్శన",
        dateEn: "Apr 2024",
        dateTe: "ఏప్రిల్ 2024"
      },
      {
        id: "F69DetzeWa8",
        titleEn: "Annamayya Pada Sudha Recital",
        titleTe: "అన్నమయ్య పద సుధా గానం",
        subtitleEn: "Devotional Praise and Classical Ragas",
        subtitleTe: "భక్తి స్తుతులు మరియు శాస్త్రీయ రాగాలు",
        dateEn: "Jul 2024",
        dateTe: "జులై 2024"
      },
      {
        id: "WzpwMWTVkrk",
        titleEn: "Govindanama Sankeertanam",
        titleTe: "గోవిందనామ సంకీర్తనం",
        subtitleEn: "Congregational Chanting & Melodies",
        subtitleTe: "భక్త సమూహ కీర్తనలు & భజన",
        dateEn: "Sep 2024",
        dateTe: "సెప్టెంబర్ 2024"
      },
      {
        id: "u_rcYWgvOq8",
        titleEn: "Devotional Solo Concert Peak",
        titleTe: "భక్తి సోలో సంగీత విభావరి",
        subtitleEn: "Live Performance Highlights",
        subtitleTe: "ప్రత్యక్ష ప్రదర్శన విశేషాలు",
        dateEn: "Oct 2024",
        dateTe: "అక్టోబర్ 2024"
      },
      {
        id: "F05B88TzTdc",
        titleEn: "Sri Rama Nama Sankeertanalu",
        titleTe: "శ్రీరామ నామ సంకీర్తనలు",
        subtitleEn: "Training Batch & Sacred Choir",
        subtitleTe: "సంకీర్తన శిక్షణ బృందం ప్రదర్శన",
        dateEn: "Nov 2024",
        dateTe: "నవంబర్ 2024"
      },
      {
        id: "ohgrJM-81ug",
        titleEn: "Sringara & Bhakti Sankeertanalu",
        titleTe: "శృంగార & భక్తి సంకీర్తనాలహరి",
        subtitleEn: "Exquisite Compositions Performance",
        subtitleTe: "అద్భుత అన్నమాచార్య కీర్తనల సమర్పణ",
        dateEn: "Dec 2024",
        dateTe: "డిసెంబర్ 2024"
      },
      {
        id: "Y0KMI2VNpP0",
        titleEn: "Annamayya Sangeeta Confluence",
        titleTe: "అన్నమయ్య సంగీత సమ్మేళనం",
        subtitleEn: "Annual Feast of Soulful Ragas",
        subtitleTe: "వార్షిక సంకీర్తన నృత్య ప్రదర్శన",
        dateEn: "Dec 2024",
        dateTe: "డిసెంబర్ 2024"
      }
    ]
  },
  {
    year: "2023",
    videos: [
      {
        id: "kG-oj420LvM",
        titleEn: "Nada Neerajanam Solo Performance",
        titleTe: "నాద నీరాజనం సోలో ప్రదర్శన",
        subtitleEn: "Classic Sacred Temple Recital",
        subtitleTe: "సాంప్రదాయ దివ్యాలయ సమర్పణ",
        dateEn: "Jan 2023",
        dateTe: "జనవరి 2023"
      },
      {
        id: "7GPaPWSQg4U",
        titleEn: "Laksha Gala Sankeertana Archana",
        titleTe: "లక్ష గళ సంకీర్తన అర్చన",
        subtitleEn: "Mass Devotional Choir Rendition",
        subtitleTe: "సామూహిక దివ్య సంకీర్తనాలాపన",
        dateEn: "Mar 2023",
        dateTe: "మార్చి 2023"
      },
      {
        id: "A5EEX1mHuro",
        titleEn: "Alivelu Manga Devotional Solo",
        titleTe: "అలివేలు మంగ భక్తి సంకీర్తన",
        subtitleEn: "Offering to Divine Mother Goddess",
        subtitleTe: "అమ్మవారికి మధుర గానాంజలి",
        dateEn: "May 2023",
        dateTe: "మే 2023"
      },
      {
        id: "6oiCM6IdeJc",
        titleEn: "Hari Divyanama Sankeertanam",
        titleTe: "హరి దివ్యనామ సంకీర్తనం",
        subtitleEn: "Temple Fest Devotional Singing",
        subtitleTe: "ఆలయ ఉత్సవ భక్తి గీతాలు",
        dateEn: "Jul 2023",
        dateTe: "జులై 2023"
      },
      {
        id: "CnSxDEDLXuo",
        titleEn: "Tirupati-Style Traditional Festival",
        titleTe: "తిరుపతి తరహా సంకీర్తన వైభవం",
        subtitleEn: "Sacred Spiritual Seva In Siddipet",
        subtitleTe: "సిద్దిపేటలో అత్యద్భుత ఆధ్యాత్మిక సేవ",
        dateEn: "Aug 2023",
        dateTe: "ఆగస్టు 2023"
      },
      {
        id: "v5RW5keG6oo",
        titleEn: "Balaji Bhakti Sangeet Sammelan",
        titleTe: "బాలాజీ భక్తి సంగీత సమ్మేళనం",
        subtitleEn: "Devotional Group Chorus and Bhajans",
        subtitleTe: "సామూహిక భక్తి గీతాలు & భజనలు",
        dateEn: "Sep 2023",
        dateTe: "సెప్టెంబర్ 2023"
      },
      {
        id: "Pu4I8RN5Zoo",
        titleEn: "Annamayya Aradhana Mahotsavam",
        titleTe: "అన్నమయ్య ఆరాధన మహోత్సవాలు",
        subtitleEn: "Spiritual Teachings through Soulful Music",
        subtitleTe: "సంగీత మాధ్యమంగా సమాజ హిత బోధ",
        dateEn: "Oct 2023",
        dateTe: "అక్టోబర్ 2023"
      },
      {
        id: "iLc018rNwGE",
        titleEn: "Kalyanotsava Sangeeta Seva",
        titleTe: "కళ్యాణోత్సవ సంగీత సేవ",
        subtitleEn: "Special Concert Dedicated to Lord Srinivasa",
        subtitleTe: "శ్రీనివాస మహారాజుకు భక్తి సమర్పణ",
        dateEn: "Nov 2023",
        dateTe: "నవంబర్ 2023"
      },
      {
        id: "p1QeFUYajBM",
        titleEn: "Spreading Divine Teachings",
        titleTe: "దైవ సందేశ ప్రచార శిబిరం",
        subtitleEn: "Connecting Communities with Sanatana Dharma",
        subtitleTe: "సామాజిక శ్రేయస్సుకై సనాతన ధర్మ విద్యా బోధ",
        dateEn: "Dec 2023",
        dateTe: "డిసెంబర్ 2023"
      }
    ]
  }
];

// Returns all archive videos compiled in chronological order or grouped
export const getFeaturedVideos = (limit: number = 6): ArchiveVideo[] => {
  const allVideos: ArchiveVideo[] = [];
  ARCHIVES_DATA.forEach(yr => {
    allVideos.push(...yr.videos);
  });
  return allVideos.slice(0, limit);
};

export const ARCHIVES_TRANSLATIONS = {
  en: {
    badge: "Divine Memories",
    heading: "Previous Archives",
    subtitle: "Explore our spiritual journey, devotional concerts, cultural programs, and sacred event memories from previous years.",
    viewMore: "View More",
    pageTitle: "Previous Archives",
    pageSubtitle: "Relive the divine moments from our previous devotional events and cultural celebrations.",
    backToHome: "Back to Home",
    watchOnYoutube: "Watch on YouTube",
    allYears: "All Years"
  },
  te: {
    badge: "దివ్య స్మృతులు",
    heading: "గత ఆర్కైవ్స్ (వీడియోలు)",
    subtitle: "గత సంవత్సరాల నుండి మా ఆధ్యాత్మిక ప్రయాణం, భక్తి కచేరీలు, సాంస్కృతిక కార్యక్రమాలు మరియు పవిత్ర కార్యక్రమ జ్ఞాపకాలను ఇక్కడ అన్వేషించండి.",
    viewMore: "మరిన్ని చూడండి",
    pageTitle: "గత ఆర్కైవ్స్",
    pageSubtitle: "మా మునుపటి భక్తి కార్యక్రమాలు మరియు సాంస్కృతిక వేడుకల నుండి దివ్య క్షణాలను పునరాలోచించండి.",
    backToHome: "హోమ్‌కి తిరిగి వెళ్ళండి",
    watchOnYoutube: "యూట్యూబ్‌లో చూడండి",
    allYears: "అన్ని సంవత్సరాలు"
  }
};
