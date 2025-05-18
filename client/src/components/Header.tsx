import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, User, LogOut, Moon, Sun, Globe } from "lucide-react";
import UploadModal from "./UploadModal";
import LoginModal from "./LoginModal";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { useLanguage } from "@/hooks/use-language";

interface HeaderProps {
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdmin }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleLanguageToggle = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    i18n.changeLanguage(newLang);
    toggleLanguage();
  };

  const handleLogout = async () => {
    await logout();
  };


  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px:6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">منصة المواد الدراسية</h1>
            {isAdmin && <span className="inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-red-100 bg-red-600 rounded mr-3">مسؤول</span>}
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageToggle}
              title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              title={theme === 'dark' ? 'وضع النهار' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            {isAdmin && (
              <>
                <Button 
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
                >
                  <Upload className="w-4 h-4 ml-1" />
                  رفع ملف
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-gray-900">
                    <User className="w-5 h-5" />
                    <span className="mr-1">المسؤول</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
          </div>
        </div>
      </div>

      {isUploadModalOpen && <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />}
      {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />}
    </header>
  );
};

export default Header;