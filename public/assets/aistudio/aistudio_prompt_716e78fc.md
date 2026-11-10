Төмендегі өзгерістерді барлық жобаға енгіз. Қолданыстағы дизайнды, мәтіндерді, түстер палитрасын (#C5A880 алтын, #1D1D1F қара) және анимацияларды бұзба. Тек көрсетілген нәрселерді өзгерт. Барлық өзгерген файлдарды толық кодымен қайтар.

---

## 1. Карточкалардың мөлдірлігі (50–65% аралығы)

Файл: `src/index.css`. `.glass-card` және `.glass-matte-btn` класстарын мынаған ауыстыр (фон opacity = 55%, мәтін оқылуы үшін blur сақталады):

```css
.glass-card {
  background-color: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  backdrop-filter: blur(18px) saturate(160%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.05);
}

.glass-matte-btn {
  background-color: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
```

---

## 2. Карточкалардың өлшемін ықшамдау

Барлық `glass-card` қолданылған жерде padding, radius, шрифт өлшемін кішірейт. Нақты ауыстырулар:

**`HeroSection.tsx`**
- Бірінші карточка (Үйлену тойына шақыру + күні/уақыты/орны): `glass-card w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-8 mb-8 text-center` → `glass-card w-full max-w-md mx-auto rounded-2xl p-4 sm:p-5 mb-6 text-center`
- Ішіндегі тақырып: `text-xs md:text-sm tracking-[0.25em] ... mb-2` → `text-[11px] sm:text-xs tracking-[0.2em] ... mb-1.5`
- Қала жазуы: `mb-4` → `mb-3`
- Күн/уақыт/орын жолы: `gap-3 sm:gap-5 pt-4 ... text-xs sm:text-sm` → `gap-2 sm:gap-3 pt-3 ... text-[11px] sm:text-xs`, ондағы иконкалар `w-4 h-4` → `w-3.5 h-3.5`
- Екінші карточка (цитата + шақыру мәтіні): `glass-card mt-10 max-w-2xl px-6 py-8 rounded-3xl mx-4` → `glass-card mt-6 max-w-lg px-5 py-5 rounded-2xl mx-4`
- Цитата: `text-2xl md:text-3xl ... leading-relaxed mb-4` → `text-xl md:text-2xl ... leading-snug mb-2`
- Шақыру мәтіні: `text-sm md:text-base leading-relaxed` → `text-xs md:text-sm leading-snug`
- parentsText: `mt-4 text-xs md:text-sm` → `mt-3 text-[11px] md:text-xs`

**Бөлім тақырыптарының капсулалары** (`VenueSection`, `WishesSection`, `RsvpSection`):
- `glass-card py-4 px-8 rounded-2xl` → `glass-card py-2.5 px-5 rounded-xl`
- ішіндегі `h2`: `text-3xl sm:text-4xl md:text-5xl` → `text-2xl sm:text-3xl md:text-4xl`, иконка `w-6 h-6` → `w-5 h-5`
- тақырып блогының `mb-12` → `mb-8`, секцияның `py-24` → `py-16`

**`VenueSection.tsx`**
- Оң жақ карточка: `rounded-3xl p-6 md:p-8` → `rounded-2xl p-4 md:p-5`
- Сурет: `min-h-[300px] lg:min-h-[420px]` → `min-h-[220px] lg:min-h-[320px]`, `rounded-3xl` → `rounded-2xl`
- Карточка ішіндегі `pb-6` → `pb-4`, `h4` `text-lg` → `text-base`

**`WishesSection.tsx`**
- Форма карточкасы: `rounded-3xl p-6 md:p-8 mb-12` → `rounded-2xl p-4 md:p-5 mb-8`
- Тілек карточкалары: `rounded-2xl p-6` → `rounded-xl p-4`, тілек мәтіні `text-base` → `text-sm`

**`RsvpSection.tsx`**: `rounded-3xl p-6 md:p-10` → `rounded-2xl p-4 md:p-6`

**`LoveStorySection.tsx`**: мәтін карточкасы `p-6 sm:p-8 md:p-10 rounded-3xl` → `p-4 sm:p-5 md:p-6 rounded-2xl`

**`CountdownSection.tsx`**: `rounded-3xl p-6 sm:p-8` → `rounded-2xl p-4 sm:p-5`

**`Footer.tsx`**: `py-8 px-6 rounded-3xl` → `py-5 px-5 rounded-2xl`, атаулар `text-4xl md:text-5xl` → `text-3xl md:text-4xl`

Карточка ішіндегі мәтіндер шашыраңқы көрінбеуі үшін: ішкі `mb-*`, `gap-*`, `space-y-*` мәндерін бір қадам азайт (мысалы `mb-6` → `mb-4`, `gap-6` → `gap-4`), `leading-relaxed` орнына `leading-snug` қолдан, мәтін `text-center` немесе біркелкі тураланған болсын.

---

## 3. Бірінші беттегі «Жасұлан & Шырайлы» жазуына алтын түсті жұмсақ свечение

Файл: `src/components/KineticTypography.tsx`.

`InteractiveLetter` ішіндегі қалыпты (hover емес) күйдегі `textShadow: 'none'` жолын мынаған ауыстыр:

```tsx
textShadow: '0 0 10px rgba(212, 175, 55, 0.45), 0 0 22px rgba(197, 168, 128, 0.30)',
```

Hover күйіндегі `textShadow` мынау болсын (свечение күшейеді):

```tsx
textShadow: '0 0 14px rgba(212, 175, 55, 0.6), 0 8px 20px rgba(197, 168, 128, 0.3)',
```

Амперсанд (`&`) `span`-іне де осындай жеңіл свечение қос:

```tsx
style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.45)' }}
```

Свечение кішігірім және нәзік болсын, әріптердің оқылуына кедергі келтірмесін. Әріптердің түсі (#1D1D1F) өзгермейді.

---

## 4. Жүктеу экраны: 2–2.5 секунд және Ж & Ш шеңберге сыюы

Файл: `src/components/LoadingScreen.tsx`. Прогресс уақытқа негізделсін (барлығы шамамен 2.25 сек: 2 сек прогресс + 0.25 сек үзіліс), содан кейін перде көтеріледі. Бұрынғы `useEffect` блогын мына кодпен ауыстыр. `onComplete` ref арқылы сақталады, өйткені App.tsx-те ол inline функция және әр рендерде эффектті қайта іске қосып жібермеуі керек:

```tsx
import React, { useState, useEffect, useRef } from 'react';
// ...

const DURATION_MS = 2000; // прогресс ұзақтығы
const HOLD_MS = 250;      // 100% көрсетілгеннен кейінгі үзіліс

const onCompleteRef = useRef(onComplete);
onCompleteRef.current = onComplete;

useEffect(() => {
  const start = performance.now();
  let raf = 0;
  let holdTimer: ReturnType<typeof setTimeout>;
  let doneTimer: ReturnType<typeof setTimeout>;

  const tick = (now: number) => {
    const t = Math.min((now - start) / DURATION_MS, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    setProgress(Math.round(eased * 100));

    if (t < 1) {
      raf = requestAnimationFrame(tick);
    } else {
      holdTimer = setTimeout(() => {
        setIsVisible(false);
        doneTimer = setTimeout(() => onCompleteRef.current(), 600);
      }, HOLD_MS);
    }
  };

  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(holdTimer);
    clearTimeout(doneTimer);
  };
}, []);
```

Монограмма шеңбері: Ж & Ш жазуы толық сыйып, шеңбердің ортасында тұруы үшін шеңберді үлкейтіп, мәтінді кішірейт және бір жолда ұста:

```tsx
<div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-black/[0.08] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center">
  <span className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#1D1D1F] tracking-normal leading-none whitespace-nowrap">
    {monogram}
  </span>
</div>
```

Айналатын нүктелі сақина (`absolute -inset-1.5 ... border-dashed`) сол күйінде қалсын.

---

## 5. Салтанат Орны: навигация карточкасын ықшамдау және 2GIS-ті иконкамен жасау

Файл: `src/components/VenueSection.tsx`.

Импортты өзгерт: `ExternalLink` керек емес, орнына `Navigation` қос:

```tsx
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
```

«Direct Navigation Links (2GIS only)» блогын толығымен мынаған ауыстыр (`href={data.mapGisUrl}` сақталады):

```tsx
{/* Navigation: compact 2GIS icon button */}
<div className="mt-4 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-3">
  <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider">
    Навигация
  </span>

  <a
    href={data.mapGisUrl}
    target="_blank"
    rel="noreferrer"
    aria-label="2GIS арқылы маршрут ашу"
    title="2GIS арқылы маршрут ашу"
    className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full bg-[#008A27] hover:bg-[#007A22] active:scale-95 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
  >
    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
      <Navigation className="w-4 h-4" />
    </span>
    2GIS
  </a>
</div>
```

Бұл блок бұрынғы үлкен «2GIS арқылы маршрут ашу» жолағының орнына тұрады: иконка + қысқа «2GIS» жазуы, ал толық мәтін `aria-label` пен `title` ішінде қалады.

---

Аяғында: өзгерген файлдар тізімін жаз, TypeScript қатесі (қолданылмаған импорттар, мысалы `ExternalLink`) қалмағанын тексер.
