# ปวดอึ (Poad-Ee) — Design System

> Version 1.0 · ออกแบบโดย Claude · อ้างอิงจาก Project Proposal v2

---

## 1. Design Philosophy

**"Friendly Authority"** — สองแรงตึงที่ต้องสมดุลตลอดเวลา:

- **Friendly:** ชื่อพูดตรงๆ ไม่อ้อมค้อม, สีโทนอบอุ่น, ไอคอนน่ารัก, ภาษาที่ไม่ตัดสิน → ลดกำแพงทางสังคม
- **Authority:** Bristol Stool Chart มาตรฐานทางการแพทย์, รายงานสรุปสำหรับแพทย์, Health Score, ข้อมูลถูกต้องแม่นยำ → สร้างความน่าเชื่อถือ

ทุก UI decision ตอบคำถาม 2 ข้อ:
1. สิ่งนี้ลดแรงเสียดทานในการบันทึกหรือไม่? (ความเร็ว, ความสบายใจ)
2. สิ่งนี้สร้างความไว้วางใจหรือไม่? (บริบทการแพทย์, ความชัดเจนของข้อมูล)

---

## 2. Brand Identity

| | |
|---|---|
| **App Name** | ปวดอึ (/pùat-ʔɯ̂ː/) |
| **Tagline** | ลำไส้ดี ชีวิตดี |
| **Tone** | Casual · Non-judgmental · Health-conscious |
| **Product Type** | PWA / Offline-first · iOS A2HS |
| **Tech Stack** | React + Vite · Tailwind CSS · localStorage · gh-pages |

---

## 3. Color System

### Brand Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--coral` | `#E8634B` | Primary CTA, screen headers, FAB, active nav |
| `--coral-d` | `#C04A34` | Coral hover / active / today indicator |
| `--coral-l` | `#FFEDE8` | Coral tinted surfaces, selected card bg |
| `--coral-p` | `#FFF7F5` | Subtle coral wash, page background accent |
| `--navy` | `#1C3B5A` | Export/Medical screen header, formal elements |
| `--amber` | `#F5A432` | Warning alerts, streak indicators |
| `--success` | `#4A8F62` | Ideal stool type (Type 4), positive stats |
| `--danger` | `#DC2626` | Critical alerts (blood in stool, >3 days no log) |

**ทำไมถึงเลือก Coral เป็น Primary?**
Health app ทั่วไปใช้สีเขียวหรือน้ำเงิน Coral ให้ความรู้สึกอบอุ่น, กระตือรือร้น, ไม่น่ากลัว — ลดความอึดอัดของหัวข้อที่ถือว่าเป็น Taboo และยังทำให้แอปโดดเด่นแตกต่างจากคู่แข่ง

### Neutral Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FFFBF8` | App background (warm white, not clinical cold) |
| `--surface` | `#FFF4EE` | Card backgrounds |
| `--text` | `#1A1412` | Primary text (warm near-black) |
| `--muted` | `#8A6F6A` | Secondary text, labels, placeholders |
| `--border` | `#EDD5CE` | Card borders, dividers |

### Bristol Stool Chart — Color Vocabulary (Signature Element)

คือ **Signature Element** ของแอปนี้ — ระบบสีที่เข้ารหัสความหมายทางสุขภาพให้ผู้ใช้จดจำโดยอัตโนมัติหลังใช้ไม่กี่ครั้ง

| Type | Color | Hex | ความหมาย |
|------|-------|-----|-----------|
| Type 1 | Dark Brown | `#6B3A1F` | ท้องผูกรุนแรง (Constipation) |
| Type 2 | Medium Brown | `#8B5230` | ท้องผูก |
| Type 3 | Sage Green | `#4A7A50` | ใกล้เคียงปกติ |
| Type 4 | Emerald | `#2E8B52` | **ดีที่สุด (IDEAL)** ✓ |
| Type 5 | Steel Blue | `#3A6FA8` | เริ่มหลวม |
| Type 6 | Slate Blue | `#5A6ABF` | ท้องเสีย |
| Type 7 | Purple | `#7A55A8` | ท้องเสียรุนแรง |

> สีน้ำตาล = ท้องผูก · เขียว = ปกติ · น้ำเงิน = หลวม · ม่วง = ท้องเสีย

---

## 4. Typography

**Typeface:** [Sarabun](https://fonts.google.com/specimen/Sarabun) — Google Fonts
รองรับ Thai + Latin ในฟอนต์เดียว, humanist style, อ่านง่ายบนหน้าจอมือถือทุกขนาด

### Type Scale

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Display | 26–28px | 800 | Health score, big stats |
| H1 | 19px | 700 | Screen titles |
| H2 | 15–17px | 700 | Section headings, questions |
| Body | 13–14px | 400 | Content text, descriptions |
| Small | 11–12px | 500 | Subtitles, secondary info |
| Caption | 9–11px | 600 | Labels, timestamps, badges (UPPERCASE + letter-spacing) |

### Typography Principles
- Thai text line-height: `1.6` เพื่อให้อ่านสบาย
- ตัวเลขสำคัญ (scores, stats): weight 800, สีที่ตัดกัน
- Labels ใน chart/table: uppercase + letter-spacing 0.6–0.8px

---

## 5. Component Library

### Buttons

| Variant | Style | Usage |
|---------|-------|-------|
| Primary | Coral fill, white text, r-12px | Main CTAs: บันทึก, ถัดไป |
| Navy | Navy fill, white text | รายงาน PDF, export actions |
| Outline | White bg, navy border | แชร์ผ่านแอป, secondary |
| Ghost | Surface bg, coral text | Tertiary, in-card actions |

### Cards

| Card Type | Style | Usage |
|-----------|-------|-------|
| Stat Card | White bg, colored value, small label | Dashboard stats row |
| Log Entry Card | White bg + icon badge + info + time tag | Recent log list |
| Bristol Card | White bg + 2px border (transparent/coral/green) + SVG icon | Quick Log selector |
| Chart Card | White bg + section label | Bar chart, distribution |
| Alert Card | Colored left border (4px) + tinted bg | Warning / danger messages |
| Report Card | Navy header + white rows | Medical export preview |

### Bristol Card States
```
Default:    border: var(--border) · bg: white
Hover:      border: #C8A8A0
Selected:   border: var(--coral) · bg: var(--coral-p)
Ideal:      border: var(--success) · bg: #F0FAF3  (always shown)
Ideal+Sel:  border: var(--success) · bg: #E0F5EA
```
Type 4 เป็น Ideal Type — แสดง green border ตลอดเวลาแม้ไม่ได้ถูกเลือก เพื่อสื่อสารว่า "นี่คือ healthy target"

### Alert Cards
```
Warning:  bg #FFFBEB · left-border var(--amber) · text amber-900
Danger:   bg #FFF5F5 · left-border var(--danger) · text red-800
```

### Navigation

**Bottom Nav (5 items):**
- 🏠 หน้าหลัก — Dashboard
- ✏️ บันทึก — Quick Log
- 📊 วิเคราะห์ — Analytics
- 📄 นำเข้า/ส่งออก — Import & Export
- ⚙️ ตั้งค่า — Settings

Active state: `color: var(--coral)` · Inactive: `color: var(--muted)`

---

## 6. Screen Designs

### Screen 1 — Dashboard (หน้าหลัก)

**Layout:**
```
┌──────────────────────────────┐
│  Status Bar (coral bg)       │
├──────────────────────────────┤
│  Coral Header                │
│  ┌────────────────────────┐  │
│  │ 🌅 สวัสดีตอนเช้า      │  │
│  │ สุขภาพของคุณ      [👤] │  │
│  │ ┌─────────────────────┐│  │
│  │ │ [Ring 82] ระดับดี ✓ ││  │
│  │ │         +5% จากก่อน ││  │
│  │ └─────────────────────┘│  │
│  └────────────────────────┘  │
├──────────────────────────────┤
│  [scroll area]               │
│  สัปดาห์นี้                 │
│  [7/wk] [Type 4] [3 days]   │
│                              │
│  บันทึกล่าสุด                │
│  [🟢 Type 4 — เรียบนุ่ม]   │
│  [🔵 Type 5 — ก้อนนุ่ม]    │
│                              │
│  ความถี่ 7 วัน               │
│  [bar chart]                 │
├──────────────────────────────┤
│  Bottom Nav           [FAB+] │
└──────────────────────────────┘
```

**Health Score Ring:** SVG circle r=28, circumference≈176. Score 82 = dasharray 144/176. ตัวเลขอยู่ตรงกลาง Ring ด้วย SVG `<text>`.

### Screen 2 — Quick Log (3-Step Flow)

**Layout:**
```
┌──────────────────────────────┐
│  Coral Header                │
│  บันทึกการขับถ่าย   [time]  │
│  [━━━━━━] [──────] [──────]  │  ← step 1/3
├──────────────────────────────┤
│  ขั้นที่ 1 จาก 3            │
│  ลักษณะอุจจาระเป็นอย่างไร?  │
│                              │
│  [T1 icon│แข็ง] [T2│ขรุขระ] │
│  [T3 icon│รอยแตก][T4│✓ดีที่สุด] ← ideal (green border always)
│  [T5 icon│นุ่ม] [T6│ฟู]     │
│  [T7 icon│เหลว]             │
│                              │
│  [      ถัดไป →           ] │
├──────────────────────────────┤
│  Bottom Nav                  │
└──────────────────────────────┘
```

**Step 2:** Color selector (6 options: น้ำตาล, เขียว, ดำ, แดงปน, เหลือง, ขาว)
**Step 3:** Amount (น้อย/ปกติ/มาก) + Effort (สบาย/ออกแรง/เจ็บ)

Auto-capture: timestamp ISO 8601, timezone +07:00

### Screen 3 — Analytics (ผลวิเคราะห์)

**Layout:**
```
┌──────────────────────────────┐
│  Coral Header                │
│  ผลวิเคราะห์                │
│  [วันนี้] [สัปดาห์นี้●] [เดือน]│
├──────────────────────────────┤
│  [Chart Card]                │
│  ความถี่การขับถ่าย           │
│  [bar chart 7 days]          │
│                              │
│  [Chart Card]                │
│  ประเภทที่พบบ่อย            │
│  Type 4 ████████████ 40%    │
│  Type 3 ███████       25%   │
│  Type 5 █████         20%   │
│  Type 2 ██            10%   │
│                              │
│  [⚠️ Warning Alert]          │
│  พบการถ่ายบ่อยกว่าปกติ...  │
├──────────────────────────────┤
│  Bottom Nav                  │
└──────────────────────────────┘
```

**Warning Triggers:**
- ไม่ถ่ายเกิน 3 วัน → Danger alert
- Type 5–6 เพิ่มขึ้นติดต่อ 2 วัน → Warning alert
- พบสีดำหรือมีเลือดปน → Critical danger alert

### Screen 4 — Import & Export (นำเข้า/ส่งออก)

**Layout:**
```
┌──────────────────────────────┐
│  Navy Status Bar             │
│  Navy Header                 │
│  นำเข้า/ส่งออกข้อมูล        │
│  สำรองและย้ายข้อมูล        │
├──────────────────────────────┤
│  [Import Card]               │
│  ┌──── navy header ─────┐   │
│  │ นำเข้าข้อมูล         │   │
│  │ กู้คืนจากไฟล์สำรอง  │   │
│  └───────────────────────┘   │
│  🔒 ข้อมูลเก็บในเครื่อง    │
│  [📂 เลือกไฟล์ JSON]        │
│                              │
│  ── หรือ ──                 │
│                              │
│  [Export Card]               │
│  ┌──── navy header ─────┐   │
│  │ ส่งออกข้อมูล         │   │
│  │ สำรองข้อมูลทั้งหมด  │   │
│  └───────────────────────┘   │
│  [📥 ส่งออก JSON]           │
│                              │
├──────────────────────────────┤
│  [Report Card]               │
│  ┌──── navy header ─────┐   │
│  │ รายงานพฤติกรรมขับถ่าย│   │
│  │ 1 มิ.ย.–2 ก.ค. 2569  │   │
│  └───────────────────────┘   │
│  จำนวนครั้ง      32 ครั้ง   │
│  เฉลี่ยต่อวัน   1.0 ✓       │
│  ประเภทหลัก     Type 4 ✓   │
│  ท้องผูก         10%         │
│  ท้องเสีย        15% ⚠      │
│  สีผิดปกติ       ไม่พบ ✓   │
│  [📄 ส่งออก PDF]            │
│  [↑ แชร์ผ่านแอป]           │
├──────────────────────────────┤
│  Bottom Nav                  │
└──────────────────────────────┘
```

**ทำไม Navy สำหรับหน้า Export?**
บริบทการแพทย์ต้องการความเป็นทางการและน่าเชื่อถือ — Navy แยกประสบการณ์การบันทึก (casual/coral) ออกจากบริบทรายงานทางการแพทย์ (formal/navy) อย่างชัดเจน

---

## 7. PWA & iOS A2HS Implementation

### Web App Manifest
```json
{
  "name": "ปวดอึ",
  "short_name": "ปวดอึ",
  "display": "standalone",
  "theme_color": "#E8634B",
  "background_color": "#FFFBF8",
  "start_url": "/"
}
```

### iOS-Specific Meta Tags
```html
<link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png">
<link rel="apple-touch-icon" sizes="192x192" href="/icon-192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="ปวดอึ">
```

### Custom iOS A2HS Prompt Flow
```
detectiOS() + !isStandalone()
  → แสดง Overlay Prompt (bottom sheet animation)
  → ข้อความ: "เพิ่มแอปไปที่หน้าจอโฮม"
  → Animation ชี้ไปที่ปุ่ม Share (↑) ของ Safari
  → คำแนะนำ: แตะ Share → "เพิ่มไปยังหน้าจอโฮม"
  → บันทึกว่า prompt แสดงแล้ว (localStorage) เพื่อไม่แสดงซ้ำ
```

### Service Worker Strategy
- **Cache-first** สำหรับ assets (fonts, icons, JS/CSS)
- **Network-first + fallback** สำหรับ API calls (ถ้ามีในอนาคต)
- **localStorage** สำหรับข้อมูลการบันทึกทั้งหมด

### Import Deduplication Logic
```
importJSON(data)
  → อ่าน existingRecords จาก localStorage
  → สำหรับแต่ละ record ใน data:
      if existingRecords มี record ที่ timestamp + type ตรงกัน:
          ข้าม (skip) — ข้อมูลเดิม
      else:
          insert ลงใน existingRecords
  → บันทึกลง localStorage
  → รายงานผล: จำนวนที่นำเข้าใหม่ / จำนวนที่ซ้ำ / จำนวนทั้งหมด
```

---

## 8. Health Score Algorithm

```
health_score = (
  type_score     × 0.50 +   // % ที่ Type 3–4 จากทั้งหมด
  frequency_score × 0.30 +   // ความสม่ำเสมอ 1 ครั้ง/วัน ± 1
  color_score    × 0.20      // % สีปกติ (น้ำตาล)
) × 100
```

- **80–100:** ระดับดีมาก 🟢
- **60–79:** ระดับดี ✓
- **40–59:** ควรระวัง ⚠️
- **< 40:** ควรพบแพทย์ 🔴

---

## 9. Accessibility Notes

- WCAG AA contrast: ข้อความทุกตัวผ่าน 4.5:1 minimum
- Touch targets: ทุก interactive element ≥ 44×44px
- Bristol card text: ไม่ใช้สีเป็นตัวสื่อสารเพียงอย่างเดียว (มี label + description ประกอบ)
- `prefers-reduced-motion`: skip ring animation
- Font size: minimum 11px สำหรับข้อความ, ไม่ต่ำกว่า 10px สำหรับ labels
- Bottom nav labels: แสดงทุกครั้ง ไม่ icon-only

---

## 10. Design Decisions Summary

| Decision | Rationale |
|----------|-----------|
| Coral primary | ไม่ใช่สีทั่วไปของ health app → แตกต่าง + warm + accessible |
| Sarabun typeface | Thai + Latin ในฟอนต์เดียว, อ่านง่ายบนมือถือ |
| 7-hue Bristol system | สีเข้ารหัสความหมาย → ผู้ใช้จำได้โดยไม่ต้องอ่าน |
| Type 4 always green | Green border ติดตัว Type 4 ตลอด → เป็น "healthy target" visual |
| Navy for export | Formal context requires formal color → differentiation by context |
| FAB (+) for quick log | 1 tap จาก Dashboard → Quick Log, ลด friction |
| localStorage | ข้อมูลขนาดเล็ก (key-value logs) ไม่ต้องใช้ IndexedDB ที่ซับซ้อน, เข้าถึงได้ทันที, export/import ง่าย |
| gh-pages | Deploy ฟรีจาก GitHub Repository โดยตรง, ไม่ต้องจัดการเซิร์ฟเวอร์, CI/CD ผ่าน GitHub Actions ได้ |
| Score ring in header | ข้อมูลสำคัญมองเห็นทันทีที่เปิดแอป |
