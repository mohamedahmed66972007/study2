
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-right">عن المنصة</h3>
            <p className="text-gray-600 dark:text-gray-400 text-right">
              منصة تعليمية متخصصة في توفير المواد الدراسية والمصادر التعليمية للطلاب
              في مختلف المراحل الدراسية.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-right">تواصل معنا</h3>
            <div className="text-gray-600 dark:text-gray-400 text-right">
              <p className="mb-2">الهاتف: 96566162173+</p>
              <p>البريد الإلكتروني: mohamedahmed66972007@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
