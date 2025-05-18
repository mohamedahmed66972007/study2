
import React from "react";
import { Link } from "wouter";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">الصفحة غير موجودة</p>
        <Link href="/">
          <a className="text-blue-500 hover:text-blue-700">العودة للصفحة الرئيسية</a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
