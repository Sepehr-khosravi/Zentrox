Simple Social Media App (Training Project)
معرفی

این پروژه یک اپلیکیشن تمرینی شبکه اجتماعی است که با JavaScript, Node.js, MongoDB و Socket.IO ساخته شده.
هدف، یادگیری ساختار بک‌اند، کار با دیتابیس و قابلیت‌های پایه‌ی یک اپ اجتماعی است.

⚠️ پروژه هنوز در حال توسعه است و کامل نشده.

ویژگی‌ها

مدیریت پست‌ها (ایجاد، ویرایش، حذف)

ثبت کامنت زیر پست‌ها

سیستم نوتیفیکیشن بلادرنگ با Socket.IO

پیام‌رسان ساده (بدون رمزنگاری پیشرفته)

ذخیره (Save) پست

مخفی کردن (Hide) پست

اپ موبایل با React Native (Expo)

رابط کاربری وب ساده (در حال تکمیل)

تکنولوژی‌ها

Backend: Node.js, Express, MongoDB, Socket.IO

Frontend: در حال توسعه

Mobile: React Native (Expo)

Config: مدیریت تنظیمات با پکیج config (نه .env)

راه‌اندازی

کلون پروژه:

git clone <repo-url>
cd backend


نصب وابستگی‌ها:

npm install


تنظیمات در پوشه config/ (مثل development.json یا production.json) ذخیره می‌شوند.
مثال:

{
  "port": 5000,
  "mongoURI": "mongodb://localhost:27017/social-app",
  "jwtSecret": "some_secret_key" // it can be your secret key!!
}


اجرای سرور:(از nodemon استفاده میشه و با اضافه کردن اسکریپت : "start" : "npx nodemon ./index.js " )

npm start


اجرای اپ موبایل:

cd mobile
npm install
npx expo start

وضعیت پروژه

بک‌اند: پایه‌ها پیاده‌سازی شده ولی هنوز جای توسعه دارد

موبایل: قابل اجراست اما امکانات کامل نیست

وب: در حال تکمیل
