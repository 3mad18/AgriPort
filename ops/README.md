# AgriPort Ops Suite (منظومة العمليات والتصدير)

مشروع لوحة التحكم والعمليات المستقل تماماً لشركة **AgriPort**.

---

## 🚀 كيفية النشر على Vercel (استضافة واحدة للمشروعين)

### 1. موقع الزوار الأساسي (`agriport.com`):
* في حسابك على **Vercel**، قم بعمل New Project واختر مستودع `AgriPort`.
* في إعداد **Root Directory**، اتركه فارغاً `.` أو المجلد الرئيسي.
* اربط النطاق: `agriport.com`.

### 2. لوحة تحكم العمليات (`ops.agriport.com`):
* في نفس الحساب على **Vercel**، اضغط **Add New Project** واختر نفس المستودع.
* في إعداد **Root Directory**، اضغط Edit واختر مجلد: `ops`.
* اربط النطاق الفرعي: `ops.agriport.com`.

---

## 🔐 بيانات الدخول الافتراضية
* الرابط السري: `/secure-login`
* البريد الإلكتروني: `ops@agriport.com`
* كلمة المرور: `ops`

---

## 🗄️ ربط قاعدة البيانات (Supabase Realtime)
1. افتح حساب مجاني على [Supabase.com](https://supabase.com).
2. أنشئ مشروع جديد وانسخ محتوى ملف `SUPABASE_SETUP.sql` وشغله في الـ SQL Editor.
3. أضف متغيرات البيئة في Vercel لكلا المشروعين:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
