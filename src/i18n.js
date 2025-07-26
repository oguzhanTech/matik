import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      "zikir_button": "Zikir Çek",
      "counter": "Zikir Sayacı: {{count}}",
      "reset": "Bu Sayacı Sıfırla",
      "reset_all": "Tüm Sayaçları Sıfırla",
      "auto_zikir": "Otomatik Zikir Çek",
      "stop": "Durdur",
      "adet": "adet",
      "zikir_select": "Zikir Seç:",
      "auto_zikir_status": "Otomatik zikir: {{current}} / {{target}}",
      "playing": "Ses Çalıyor...",
      "auto_active": "Otomatik Zikir Aktif",
      "info_spacebar": "💡 Klavyenizin Boşluk tuşu ile de zikir çekebilirsiniz",
      "new_sure": "Yeni Sure"
    }
  },
  en: {
    translation: {
      "zikir_button": "Count Zikr",
      "counter": "Zikr Counter: {{count}}",
      "reset": "Reset This Counter",
      "reset_all": "Reset All Counters",
      "auto_zikir": "Auto Zikr",
      "stop": "Stop",
      "adet": "pcs",
      "zikir_select": "Select Zikr:",
      "auto_zikir_status": "Auto zikr: {{current}} / {{target}}",
      "playing": "Playing sound...",
      "auto_active": "Auto Zikr Active",
      "info_spacebar": "💡 You can also count zikr with your keyboard Space key",
      "new_sure": "New Surah"
    }
  }
};

const getDefaultLanguage = () => {
  // Tarayıcı dili Türkçe ise tr, değilse en
  const navLang = navigator.language || navigator.userLanguage;
  if (navLang && navLang.toLowerCase().startsWith('tr')) return 'tr';
  return 'en';
};

// i18n başlat
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDefaultLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Ülke kontrolü ile dil güncelle (Türkiye dışı ise İngilizce)
(async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    if (data && data.country_code !== 'TR') {
      i18n.changeLanguage('en');
    }
  } catch (e) {
    // ignore
  }
})();

export default i18n; 