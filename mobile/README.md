# 📱 Dyad Mobile App

تطبيق React Native Native لمشروع Dyad مع واجهة مطابقة للتصميم الأصلي.

## 🚀 الميزات

- ✅ **واجهة مطابقة للتصميم** - نفس الألوان والخطوط والتباعد
- ✅ **دعم الوضع المظلم/المضيء** - يتكيف تلقائياً مع إعدادات النظام
- ✅ **تصميم متجاوب** - يعمل على جميع أحجام الشاشات
- ✅ **ملاحة سلسة** - Stack Navigation مع انتقالات سلسة
- ✅ **مكونات قابلة لإعادة الاستخدام** - Header, Card, Button
- ✅ **نظام ثيم متكامل** - ألوان، خطوط، مسافات موحدة

## 🏗️ هيكل المشروع

```
mobile/
├── app/
│   ├── screens/           # شاشات التطبيق
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   └── DetailsScreen.tsx
│   ├── components/        # مكونات قابلة لإعادة الاستخدام
│   │   ├── Header.tsx
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   └── Responsive.ts
│   └── theme/            # نظام الثيم
│       ├── colors.ts
│       ├── typography.ts
│       ├── spacing.ts
│       └── index.ts
├── App.tsx               # نقطة الدخول الرئيسية
└── package.json
```

## 🛠️ التثبيت والتشغيل

### المتطلبات

- Node.js 18+
- React Native CLI
- Android Studio (للأندرويد)
- Xcode (لـ iOS - macOS فقط)

### التثبيت

```bash
# تثبيت المتطلبات
npm install

# للأندرويد
npm run android

# لـ iOS (macOS فقط)
npm run ios
```

## 🎨 نظام الثيم

### الألوان

```typescript
const colors = {
  primary: '#6C5CE7', // اللون الأساسي
  primaryAlt: '#A29BFE', // اللون البديل
  bg: '#0B0B0E', // خلفية الشاشة
  surface: '#15151B', // خلفية البطاقات
  text: '#FFFFFF', // النص الأساسي
  textMuted: '#A1A1AA', // النص الثانوي
  border: '#26262F', // حدود العناصر
  success: '#22C55E', // نجاح
  warning: '#F59E0B', // تحذير
  danger: '#EF4444', // خطأ
};
```

### الخطوط

```typescript
const typography = {
  h1: {fontSize: 28, fontWeight: '700', lineHeight: 34},
  h2: {fontSize: 22, fontWeight: '700', lineHeight: 28},
  h3: {fontSize: 18, fontWeight: '600', lineHeight: 24},
  body: {fontSize: 15, lineHeight: 20},
  caption: {fontSize: 12, lineHeight: 16},
};
```

### المسافات

```typescript
const spacing = (n: number) => n * 4; // نظام 4px
// spacing(1) = 4px, spacing(2) = 8px, etc.
```

## 📱 المكونات

### Header

```typescript
<Header title="عنوان الصفحة" />
```

### Card

```typescript
<Card>
  <Text>محتوى البطاقة</Text>
</Card>
```

### Button

```typescript
<Button
  label="زر"
  onPress={() => {}}
  variant="primary" // أو "ghost"
/>
```

## 🔧 التخصيص

### إضافة شاشة جديدة

1. أنشئ ملف في `app/screens/`
2. أضف الشاشة إلى `App.tsx`
3. استخدم `navigation.navigate('ScreenName')`

### إضافة مكون جديد

1. أنشئ ملف في `app/components/`
2. استخدم `useTheme()` للوصول للثيم
3. اتبع نمط التصميم الموجود

### تعديل الألوان

1. عدّل `app/theme/colors.ts`
2. التغييرات ستطبق تلقائياً

## 🚀 النشر

### بناء APK للأندرويد

```bash
cd android
./gradlew assembleRelease
```

### GitHub Actions

- يتم بناء APK تلقائياً عند كل push
- يتم إنشاء Release عند دفع tag مثل `v1.0.0`

## 📚 المصادر

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

## 🤝 المساهمة

1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/AmazingFeature`)
3. اكتب التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. ادفع للفرع (`git push origin feature/AmazingFeature`)
5. أنشئ Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](../LICENSE) للتفاصيل.

---

**Built with ❤️ for Dyad**
