/* =========================================================
   كن أمة — إعدادات Supabase (قاعدة البيانات الحقيقية)
   =========================================================
   1) أنشئ مشروعاً مجانياً على https://supabase.com
   2) من لوحة المشروع: Project Settings -> API
   3) انسخ القيمتين التاليتين والصقهما هنا:
      - Project URL          -> SUPABASE_URL
      - anon public API key  -> SUPABASE_ANON_KEY
   هذا المفتاح (anon key) مخصص للاستخدام في المتصفح وهو آمن للنشر
   العلني (محمي عبر Row Level Security من جهة Supabase).
   ========================================================= */

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

const supabaseClient = (SUPABASE_URL.startsWith("http") && SUPABASE_ANON_KEY.length > 20)
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

if (!supabaseClient) {
  console.warn(
    "[كن أمة] لم يتم ضبط Supabase بعد. افتح ملف config.js وضع رابط ومفتاح مشروعك " +
    "حتى يعمل تسجيل الدخول وإنشاء الحساب فعلياً."
  );
}
