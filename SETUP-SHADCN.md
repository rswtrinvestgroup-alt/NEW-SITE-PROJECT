# SİWİWORLD — React / shadcn / Tailwind Kurulumu

Proje artık **Vite + React + TypeScript + Tailwind** ile animated cards stack bileşenini destekler.

## Proje yapısı

```
components/
  ui/
    testimonial.tsx            ← Animasyonlu mezun carousel (framer-motion)
    testimonial-demo.tsx
    animated-cards-stack.tsx   ← Scroll kart yığını (isteğe bağlı)
    animated-cards-stack-demo.tsx
    avatar.tsx
    spinning-logos.tsx
  blocks/
    siwiworld-testimonials.tsx ← SİWİWORLD mezun hikayeleri
lib/
  utils.ts                     ← cn() yardımcısı
src/
  index.css                    ← Tailwind + CSS değişkenleri
  testimonials-mount.tsx       ← #testimonials-react-root mount
```

**Neden `components/ui`?** shadcn CLI bileşenleri bu klasöre ekler; `@/components/ui/...` import yolları standart kalır.

## Kurulum (ilk kez)

```bash
cd "NEW SITE PROJECT"
npm install
```

### Bağımlılıklar

```bash
npm install motion class-variance-authority @radix-ui/react-avatar clsx tailwind-merge react react-dom
npm install -D tailwindcss postcss autoprefixer typescript @vitejs/plugin-react @types/react @types/react-dom @types/node
```

## Çalıştırma

```bash
npm run dev
```

Tarayıcıda Vite’ın verdiği adresi açın (ör. `http://localhost:5173`).  
**Başarı Hikayeleri** bölümünde scroll ile kart yığını animasyonu çalışır.

Üretim build:

```bash
npm run build
npm run preview
```

## shadcn CLI (isteğe bağlı)

```bash
npx shadcn@latest init
npx shadcn@latest add avatar
```

`components.json` dosyası projede hazırdır.

## Bileşen kullanımı

```tsx
import { SiwiworldTestimonials } from "@/components/blocks/siwiworld-testimonials";

<SiwiworldTestimonials />
```

Veya ham bileşenler:

```tsx
import {
  ContainerScroll,
  CardsContainer,
  CardTransformed,
  ReviewStars,
} from "@/components/ui/animated-cards-stack";
```

## Statik HTML notu

`index.html` dosyasını doğrudan çift tıklayarak açarsanız React modülü yüklenmez. Mutlaka `npm run dev` veya `npm run build` sonrası `dist` kullanın.

GSAP split-text ve spinning social vanilla script’leri `npm run dev` ile birlikte çalışmaya devam eder.
