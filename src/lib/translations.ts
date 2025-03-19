
// Define the structure of our translations
export type TranslationKey = 
  | 'resources'
  | 'documentation' 
  | 'tryInterfuck'
  | 'contact'
  | 'community'
  | 'legal'
  | 'privacyPolicy'
  | 'license'
  | 'language'
  | 'madeWith'
  | 'by'
  | 'copyright';

// Create a type for our translation objects
export type Translation = {
  [key in TranslationKey]: string;
};

// Define the translations for each language
export const translations: Record<string, Translation> = {
  en: {
    resources: 'Resources',
    documentation: 'Documentation',
    tryInterfuck: 'Try Interfuck',
    contact: 'Contact',
    community: 'Community',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    license: 'License',
    language: 'Language',
    madeWith: 'Made with',
    by: 'by esoteric enthusiasts',
    copyright: '© 2025 Interfuck',
  },
  es: {
    resources: 'Recursos',
    documentation: 'Documentación',
    tryInterfuck: 'Probar Interfuck',
    contact: 'Contacto',
    community: 'Comunidad',
    legal: 'Legal',
    privacyPolicy: 'Política de Privacidad',
    license: 'Licencia',
    language: 'Idioma',
    madeWith: 'Hecho con',
    by: 'por entusiastas esotéricos',
    copyright: '© 2025 Interfuck',
  },
  fr: {
    resources: 'Ressources',
    documentation: 'Documentation',
    tryInterfuck: 'Essayer Interfuck',
    contact: 'Contact',
    community: 'Communauté',
    legal: 'Mentions légales',
    privacyPolicy: 'Politique de confidentialité',
    license: 'Licence',
    language: 'Langue',
    madeWith: 'Fait avec',
    by: 'par des passionnés ésotériques',
    copyright: '© 2025 Interfuck',
  },
  de: {
    resources: 'Ressourcen',
    documentation: 'Dokumentation',
    tryInterfuck: 'Interfuck ausprobieren',
    contact: 'Kontakt',
    community: 'Gemeinschaft',
    legal: 'Rechtliches',
    privacyPolicy: 'Datenschutzerklärung',
    license: 'Lizenz',
    language: 'Sprache',
    madeWith: 'Gemacht mit',
    by: 'von esoterischen Enthusiasten',
    copyright: '© 2025 Interfuck',
  },
  pl: {
    resources: 'Zasoby',
    documentation: 'Dokumentacja',
    tryInterfuck: 'Wypróbuj Interfuck',
    contact: 'Kontakt',
    community: 'Społeczność',
    legal: 'Informacje prawne',
    privacyPolicy: 'Polityka prywatności',
    license: 'Licencja',
    language: 'Język',
    madeWith: 'Stworzone z',
    by: 'przez entuzjastów ezoteryki',
    copyright: '© 2025 Interfuck',
  },
  zh: {
    resources: '资源',
    documentation: '文档',
    tryInterfuck: '尝试 Interfuck',
    contact: '联系我们',
    community: '社区',
    legal: '法律信息',
    privacyPolicy: '隐私政策',
    license: '许可证',
    language: '语言',
    madeWith: '制作于',
    by: '由深奥编程爱好者',
    copyright: '© 2025 Interfuck',
  },
  ja: {
    resources: 'リソース',
    documentation: 'ドキュメント',
    tryInterfuck: 'Interfuckを試す',
    contact: '問い合わせ',
    community: 'コミュニティ',
    legal: '法的情報',
    privacyPolicy: 'プライバシーポリシー',
    license: 'ライセンス',
    language: '言語',
    madeWith: '制作',
    by: '難解プログラミング愛好家より',
    copyright: '© 2025 Interfuck',
  },
  hi: {
    resources: 'संसाधन',
    documentation: 'दस्तावेज़ीकरण',
    tryInterfuck: 'Interfuck आज़माएं',
    contact: 'संपर्क करें',
    community: 'समुदाय',
    legal: 'कानूनी',
    privacyPolicy: 'गोपनीयता नीति',
    license: 'लाइसेंस',
    language: 'भाषा',
    madeWith: 'बनाया गया',
    by: 'रहस्यमय प्रोग्रामिंग के शौकीनों द्वारा',
    copyright: '© 2025 Interfuck',
  },
  ar: {
    resources: 'الموارد',
    documentation: 'التوثيق',
    tryInterfuck: 'جرب Interfuck',
    contact: 'اتصل بنا',
    community: 'المجتمع',
    legal: 'قانوني',
    privacyPolicy: 'سياسة الخصوصية',
    license: 'الترخيص',
    language: 'اللغة',
    madeWith: 'صنع بـ',
    by: 'بواسطة هواة البرمجة الغامضة',
    copyright: '© 2025 Interfuck',
  },
};

// Create a context to manage translations
import { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: TranslationKey) => string;
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage]?.[key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
