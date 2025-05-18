
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "platform": "Study Platform",
          "upload": "Upload File",
          "login": "Login",
          "logout": "Logout",
          "admin": "Admin",
          "dark_mode": "Dark Mode",
          "light_mode": "Light Mode",
          "switch_language": "Switch Language",
          "contact_us": "Contact Us",
          "about_us": "About Us",
          "phone": "Phone",
          "email": "Email"
        }
      },
      ar: {
        translation: {
          "platform": "منصة المواد الدراسية",
          "upload": "رفع ملف",
          "login": "تسجيل الدخول",
          "logout": "تسجيل الخروج",
          "admin": "مسؤول",
          "dark_mode": "الوضع الليلي",
          "light_mode": "الوضع النهاري",
          "switch_language": "تغيير اللغة",
          "contact_us": "تواصل معنا",
          "about_us": "عن المنصة",
          "phone": "الهاتف",
          "email": "البريد الإلكتروني"
        }
      }
    },
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
