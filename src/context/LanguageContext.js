/**
 * Language Context
 * Provides language switching functionality (English/Arabic)
 */

import React, { createContext, useState, useContext, useEffect } from 'react';

// Translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    units: 'Units',
    contact: 'Contact',
    admin: 'Admin',
    findProperty: 'Find Property',
    
    // Hero
    welcome: 'Welcome to Vexora Estates',
    findYour: 'Find Your',
    dreamHome: 'Dream Home',
    discover: 'Discover premium properties across Egypt\'s most sought-after locations. Your perfect home is just a click away.',
    browseProperties: 'Browse Properties',
    contactUs: 'Contact Us',
    
    // Stats
    propertiesListed: 'Properties Listed',
    happyClients: 'Happy Clients',
    yearsExperience: 'Years Experience',
    citiesCovered: 'Cities Covered',
    
    // About
    aboutUs: 'About Us',
    whoWeAre: 'Who We Are',
    aboutText1: 'Vexora Estates is a premier real estate platform dedicated to connecting buyers with their dream properties. With over a decade of experience in the Egyptian real estate market, we have established ourselves as trusted advisors for both local and international clients.',
    aboutText2: 'Our mission is to simplify the property search process by providing comprehensive listings, detailed information, and expert guidance. Whether you\'re looking for a family villa, a beachfront chalet, or a commercial investment, we have the perfect property for you.',
    premiumProperties: 'Premium Properties',
    expertGuidance: 'Expert Guidance',
    trustedPartners: 'Trusted Partners',
    bestDeals: 'Best Deals',
    
    // Featured
    featuredListings: 'Featured Listings',
    featuredProperties: 'Featured Properties',
    featuredDesc: 'Explore our handpicked selection of premium properties, chosen for their exceptional value and prime locations.',
    viewAll: 'View All Properties',
    
    // CTA
    readyToFind: 'Ready to Find Your Perfect Home?',
    ctaText: 'Let our experts guide you through the process. Get personalized recommendations based on your preferences.',
    startBrowsing: 'Start Browsing',
    scheduleCall: 'Schedule a Call',
    
    // Contact
    quickContact: 'Quick Contact',
    whatsapp: 'WhatsApp',
    callNow: 'Call Now',
    sendMessage: 'Send Message',
    fullName: 'Full Name',
    phone: 'Phone',
    unit: 'Unit',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    phoneWhatsApp: 'Phone / WhatsApp',
    workingHours: 'Working Hours',
    sunThu: 'Sun - Thu: 9:00 AM - 6:00 PM',
    
    // Footer
    footerText: 'Your trusted partner in finding the perfect property. We connect you with premium real estate across Egypt.',
    quickLinks: 'Quick Links',
    browseUnits: 'Browse Units',
    propertyTypes: 'Property Types',
    
    // Admin
    login: 'Login',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',
    dashboard: 'Admin Dashboard',
    manageMessages: 'Manage messages and properties',
    totalMessages: 'Total Messages',
    unread: 'Unread',
    totalUnits: 'Total Units',
    featured: 'Featured',
    search: 'Search',
    delete: 'Delete',
    markRead: 'Mark as Read',
    date: 'Date',
    status: 'Status',
    actions: 'Actions',
    
    // Property Types
    villa: 'Villa',
    apartment: 'Apartment',
    chalet: 'Chalet',
    penthouse: 'Penthouse',
    commercial: 'Commercial',
    office: 'Office',
    
    // Language
    language: 'Language',
    english: 'English',
    arabic: 'العربية',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    units: 'الوحدات',
    contact: 'تواصل معنا',
    admin: 'الإدارة',
    findProperty: 'ابحث عن عقار',
    
    // Hero
    welcome: 'مرحباً بك في فيكسورا العقارية',
    findYour: 'ابحث عن',
    dreamHome: 'منزل أحلامك',
    discover: 'اكتشف العقارات المتميزة في أرقى مواقع مصر. منزل أحلامك على بعد نقرة واحدة.',
    browseProperties: 'تصفح العقارات',
    contactUs: 'تواصل معنا',
    
    // Stats
    propertiesListed: 'عقار معروض',
    happyClients: 'عميل سعيد',
    yearsExperience: 'سنوات خبرة',
    citiesCovered: 'مدينة',
    
    // About
    aboutUs: 'من نحن',
    whoWeAre: 'نحن نحن',
    aboutText1: 'فيكسورا العقارية هي منصة عقارات رائدة مكرسة لربط المشترين بعقارات أحلامهم. بخبرة تزيد عن عشر سنوات في السوق العقاري المصري، قمنا بتأسيس أنفسنا كمستشارين موثوقين للعملاء المحليين والدوليين.',
    aboutText2: 'مهمتنا هي تبسيط عملية البحث عن العقارات من خلال تقديم قوائم شاملة ومعلومات تفصيلية وتوجيهات خبيرة. سواء كنت تبحث عن فيلا عائلية أو شاليه على الشاطئ أو استثمار تجاري، لدينا العقار المثالي لك.',
    premiumProperties: 'عقارات متميزة',
    expertGuidance: 'إرشاد خبير',
    trustedPartners: 'شركاء موثوقون',
    bestDeals: 'أفضل العروض',
    
    // Featured
    featuredListings: 'عروض مميزة',
    featuredProperties: 'عقارات مميزة',
    featuredDesc: 'استكشف مجموعتنا المختارة بعناية من العقارات المتميزة، المختارة لقيمتها الاستثنائية ومواقعها الرائعة.',
    viewAll: 'عرض جميع العقارات',
    
    // CTA
    readyToFind: 'مستعد للعثور على منزل أحلامك؟',
    ctaText: 'دع خبراءنا يرشدونك خلال العملية. احصل على توصيات مخصصة بناءً على تفضيلاتك.',
    startBrowsing: 'ابدأ التصفح',
    scheduleCall: 'حدد مكالمة',
    
    // Contact
    quickContact: 'تواصل سريع',
    whatsapp: 'واتساب',
    callNow: 'اتصل الآن',
    sendMessage: 'إرسال رسالة',
    fullName: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    unit: 'الوحدة',
    message: 'الرسالة',
    send: 'إرسال',
    sending: 'جاري الإرسال...',
    phoneWhatsApp: 'الهاتف / واتساب',
    workingHours: 'ساعات العمل',
    sunThu: 'الأحد - الخميس: 9:00 ص - 6:00 م',
    
    // Footer
    footerText: 'شريكك الموثوق في العثور على العقار المثالي. نربطك بالعقارات المتميزة في جميع أنحاء مصر.',
    quickLinks: 'روابط سريعة',
    browseUnits: 'تصفح الوحدات',
    propertyTypes: 'أنواع العقارات',
    
    // Admin
    login: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    manageMessages: 'إدارة الرسائل والعقارات',
    totalMessages: 'إجمالي الرسائل',
    unread: 'غير مقروء',
    totalUnits: 'إجمالي الوحدات',
    featured: 'مميز',
    search: 'بحث',
    delete: 'حذف',
    markRead: 'تحديد كمقروء',
    date: 'التاريخ',
    status: 'الحالة',
    actions: 'إجراءات',
    
    // Property Types
    villa: 'فيلا',
    apartment: 'شقة',
    chalet: 'شاليه',
    penthouse: 'بنتهاوس',
    commercial: 'تجاري',
    office: 'مكتب',
    
    // Language
    language: 'اللغة',
    english: 'English',
    arabic: 'العربية',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const [isRTL, setIsRTL] = useState(() => {
    return (localStorage.getItem('language') || 'en') === 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    setIsRTL(language === 'ar');
    
    // Update HTML direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage, 
      t, 
      isRTL,
      translations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
