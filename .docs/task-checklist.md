# ปวดอึ (Poad-Ee) — Task Checklist

> อ้างอิงจาก Project Proposal v2 และ Design System v1.0
> วันที่: 2026-07-05 (ปรับปรุงจาก 2026-07-03)

---

## Phase 1: Project Setup & Foundation

- [x] **`[P1-01]` Initialize Project** — สร้างโปรเจกต์ด้วย React + Vite + Tailwind CSS ตั้งค่าโครงสร้างโฟลเดอร์ (`components/`, `screens/`, `hooks/`, `utils/`, `services/`, `assets/`, `public/`)
- [x] **`[P1-02]` Configure Fonts** — ติดตั้ง Google Fonts Sarabun (Thai + Latin) และประกาศใน Tailwind config + CSS `@import`
- [x] **`[P1-03]` CSS Custom Properties** — ประกาศ Design Tokens ทั้งหมดใน `:root`:
- [x] **`[P1-04]` Typography Scale** — ตั้งค่า font-size classes ใน Tailwind ตาม Design System: Display (26–28px/800), H1 (19px/700), H2 (15–17px/700), Body (13–14px/400), Small (11–12px/500), Caption (9–11px/600 uppercase+tracking). Thai text line-height: `1.6`. ค่าตัวเลขสำคัญใช้ weight 800
- [x] **`[P1-05]` Base Layout** — สร้าง Layout component: viewport `max-w-md mx-auto` (mobile-first), Coral Status Bar area, scrollable content area, Bottom Nav placeholder. รองรับ `env(safe-area-inset-*)` สำหรับ iPhone notch/Dynamic Island และ Android edge-to-edge
- [x] **`[P1-06]` Web App Manifest** — สร้าง `public/manifest.json` (name: "ปวดอึ", display: standalone, theme_color: #E8634B, background_color: #FFFBF8)
- [x] **`[P1-07]` Apple Meta Tags** — เพิ่มใน `index.html`:
- [x] **`[P1-08]` Generate App Icons** — สร้างไอคอนแอปขนาด 180×180px และ 192×192px (แนวคิด: อุจจาระน่ารัก + โทน Coral) วางใน `public/`

---

## Phase 2: Design System Components

### Buttons
- [x] **`[P2-01]` Button: Primary** — Coral fill (#E8634B), white text, `border-radius: 12px`, hover #C04A34, active press state. Usage: "บันทึก", "ถัดไป"
- [x] **`[P2-02]` Button: Navy** — Navy fill (#1C3B5A), white text, `border-radius: 12px`. Usage: "ส่งออก PDF", export actions
- [x] **`[P2-03]` Button: Outline** — White bg, navy border, navy text. Usage: "แชร์ผ่านแอป", secondary actions
- [x] **`[P2-04]` Button: Ghost** — Surface bg, coral text. Usage: in-card tertiary actions

### Cards
- [x] **`[P2-05]` Card: StatCard** — White bg, colored large value (weight 800), small muted label below. Usage: "7 ครั้ง/สัปดาห์", "Type 4 เด่น"
- [x] **`[P2-06]` Card: LogEntryCard** — White bg + icon badge (Bristol type color dot) + description text + time tag. Swipe-to-delete gesture (optional). Usage: recent logs list
- [x] **`[P2-07]` Card: BristolCard** — Selectable card with SVG icon + type label + description. States:
  - Default: `border: --border`, bg: white
  - Hover: `border: #C8A8A0`
  - Selected: `border: --coral`, bg: `--coral-p`
  - **Type 4 Always Green**: `border: --success`, bg: #F0FAF3 (Ideal indicator ติดตัวตลอดเวลา)
  - Ideal+Selected: `border: --success`, bg: #E0F5EA
- [x] **`[P2-08]` Card: ChartCard** — White bg + section label header + chart content area. `border-radius: 12px`
- [x] **`[P2-09]` Card: AlertCard** — Warning: bg #FFFBEB, left-border 4px `--amber`, text amber-900. Danger: bg #FFF5F5, left-border 4px `--danger`, text red-800. Critical: bg #FFF5F5, left-border 4px `--danger`, text red-800 + icon ⚠️
- [x] **`[P2-10]` Card: ReportCard** — Navy header (#1C3B5A) + white data rows. Usage: medical export preview, import/export sections

### Selectors & Inputs
- [x] **`[P2-11]` Bristol Type Selector** — Grid layout 7 BristolCards (Type 1–7) แสดง SVG icons ของ Bristol Stool Chart แต่ละ type พร้อม label และ description ภาษาไทย. Type 4 มี green border ตลอด + ป้าย "✓ ดีที่สุด"
- [x] **`[P2-12]` Color Selector** — 6 สี: น้ำตาล, เขียว, ดำ, แดงปน, เหลือง, ขาว — แสดงเป็นวงกลมสีที่กดเลือกได้ พร้อมชื่อสีใต้แต่ละวง
- [x] **`[P2-13]` Amount Selector** — 3 ตัวเลือก: น้อย / ปกติ / มาก — segmented control หรือ radio group
- [x] **`[P2-14]` Effort Selector** — 3 ตัวเลือก: เบ่งสบาย / ต้องออกแรง / ท้องผูก/เจ็บ — segmented control

### Navigation
- [x] **`[P2-15]` Bottom Navigation Bar** — 5 tabs: 🏠 หน้าหลัก, ✏️ บันทึก, 📊 วิเคราะห์, 📄 นำเข้า/ส่งออก, ⚙️ ตั้งค่า. Active: `color: --coral`. Inactive: `color: --muted`. มี label กำกับทุกอัน (ไม่ icon-only). Touch target ≥ 44×44px
- [x] **`[P2-16]` FAB (Floating Action Button)** — Coral circle button with "+" icon, ตำแหน่งล่างขวา, 1-tap ไปยัง Quick Log. แสดงเฉพาะเมื่ออยู่หน้า Dashboard. `border-radius: 50%`, ขนาด ≥ 56×56px

### Charts
- [x] **`[P2-17]` BarChart Component** — Vertical bar chart แสดงความถี่รายวัน (7 วัน) — แกน X: วัน (จ-อา), แกน Y: จำนวนครั้ง. Bar color: `--coral`. แถบวันที่ไม่มีบันทึกเป็น 0 (bar height: 0)
- [x] **`[P2-18]` HorizontalBar Component** — Horizontal bar สำหรับแสดงการกระจายประเภท Bristol Type (เรียงลำดับจากมากไปน้อย) — แต่ละ bar ใช้สีประจำ Bristol Type นั้น (7 สีตาม Design System)
- [x] **`[P2-19]` HealthScoreRing** — SVG donut/ring chart: วงกลมรัศมี ~28px, เส้นรอบวง ~176px. `stroke-dasharray` คำนวณจากคะแนน. ตัวเลขแสดงตรงกลางด้วย `<text>`. แสดงสีตามช่วงคะแนน (🟢 เขียว / 🟡 เหลือง / 🔴 แดง). รองรับ `prefers-reduced-motion` (ปิด animation)

### Feedback & Overlay
- [x] **`[P2-20]` Toast Component** — แสดงข้อความแจ้งเตือนชั่วคราวด้านบน/ล่างของหน้าจอ พร้อม animation slide + auto-dismiss (2–3 วินาที). Variants: success (เขียว), error (แดง), info (น้ำเงิน). Usage: บันทึกสำเร็จ, นำเข้าสำเร็จ, แจ้งเตือน SW update, แจ้งข้อผิดพลาด
- [x] **`[P2-21]` Confirm Dialog Component** — Modal dialog พร้อม overlay backdrop, ข้อความ, ปุ่มยืนยัน (Coral/Danger) และปุ่มยกเลิก (Ghost). Focus trap ภายใน dialog. Usage: ยืนยันการลบบันทึก, ยืนยันการล้างข้อมูลทั้งหมด, ยืนยันการนำเข้าทับข้อมูล

---

## Phase 3: Application Screens

### Screen 1: Dashboard (หน้าหลัก)

- [x] **`[P3-01]` Greeting Header** — Coral background header แสดงคำทักทายตามช่วงเวลา (🌅 สวัสดีตอนเช้า / ☀️ สวัสดีตอนบ่าย / 🌙 สวัสดีตอนเย็น) + avatar placeholder (👤)
- [x] **`[P3-02]` Health Score Ring in Header** — แสดงคะแนนสุขภาพกลาง header (HealthScoreRing component) พร้อม label ระดับ (🟢 ดีมาก / ✓ ดี / ⚠️ ควรระวัง / 🔴 ควรพบแพทย์) และ % เปลี่ยนแปลงเทียบกับช่วงก่อน (%+ หรือ %-)
- [x] **`[P3-03]` Weekly Stats Row** — 3 StatCards: [จำนวนครั้ง/สัปดาห์], [Bristol Type ที่พบบ่อย], [จำนวนวันที่ถ่ายติดต่อกัน (streak)]
- [x] **`[P3-04]` Recent Logs List** — แสดง LogEntryCard 5 รายการล่าสุด เรียงตามเวลา desc. แต่ละ card แสดง Bristol icon + Type name + description + timestamp. แตะเพื่อแก้ไข, ปัดซ้ายเพื่อลบ (swipe-to-delete)
- [x] **`[P3-05]` 7-Day Frequency Chart** — ChartCard + BarChart แสดงจำนวนครั้งต่อวันย้อนหลัง 7 วัน. แถบวันที่ไม่มีบันทึกเป็น 0 (bar height: 0, แสดงแกน X ครบทุกวัน)
- [x] **`[P3-06]` Empty State** — ถ้ายังไม่มีบันทึกเลย: แสดง illustration + ข้อความ "ยังไม่มีบันทึกวันนี้" + ปุ่ม "บันทึกครั้งแรก →". Empty states สำหรับทุกหน้า: หน้าวิเคราะห์ ("ยังมีข้อมูลไม่เพียงพอ"), หน้านำเข้า/ส่งออก ("ยังไม่มีข้อมูลให้ส่งออก")

### Screen 2: Quick Log (บันทึกด่วน)

- [x] **`[P3-07]` Step Indicator** — Progress bar 3 ขั้นตอนด้านบน header: `[━━━━━━] [──────] [──────]` ตอน Step 1, `[━━━━━━] [━━━━━━] [──────]` ตอน Step 2, `[━━━━━━] [━━━━━━] [━━━━━━]` ตอน Step 3
- [x] **`[P3-08]` Step 1: Bristol Type** — แสดงคำถาม "ลักษณะอุจจาระเป็นอย่างไร?" + Bristol Type Selector (7 cards, grid 2–3 columns). Type 4 มี green border เสมอ + ป้าย "✓ ดีที่สุด"
- [x] **`[P3-09]` Step 2: Color** — แสดงคำถาม "สีเป็นอย่างไร?" + Color Selector (6 วงกลมสี). แสดงชื่อสีใต้แต่ละวง
- [x] **`[P3-10]` Step 3: Amount, Effort & Note** — แสดงคำถาม "ปริมาณและความยาก?" + Amount Selector + Effort Selector. เพิ่มช่องข้อความ (textarea) สำหรับบันทึกเพิ่มเติม (optional note). พร้อมปุ่ม "✓ บันทึก" สี Coral
- [x] **`[P3-11]` Auto Timestamp** — บันทึก `recordedAt` เป็น ISO 8601 string พร้อม offset +07:00 (เช่น `"2026-07-05T14:32:00+07:00"`). **ใช้การ format เอง** (ไม่ใช้ `toISOString()` เพราะคืนค่าเป็น UTC "Z"). แสดงเวลาใน UI แบบ "วันนี้ 14:32 น." ใน header ของ Quick Log
- [x] **`[P3-12]` Success Feedback** — หลังกดบันทึก: animation เช็คมาร์ค + Toast "บันทึกเรียบร้อย ✓" → นำทางกลับ Dashboard อัตโนมัติใน 1.5 วินาที
- [x] **`[P3-13]` Edit Mode** — รองรับการแก้ไขบันทึกที่มีอยู่แล้ว: pre-fill ค่าเดิมในแต่ละ step, เปลี่ยนปุ่มเป็น "อัปเดต", แสดง Toast เมื่ออัปเดตสำเร็จ
- [x] **`[P3-14]` Delete Log Entry** — ปุ่มลบบันทึกใน Edit Mode (Ghost/Danger style) → Confirm Dialog → ลบ record → Toast "ลบบันทึกเรียบร้อย" → กลับ Dashboard

### Screen 3: Analytics (ผลวิเคราะห์)

- [x] **`[P3-15]` Period Tabs** — Tab selector: [วันนี้] [สัปดาห์นี้●] [เดือนนี้] → กรองข้อมูลตามช่วงเวลา (1d, 7d, 30d)
- [x] **`[P3-16]` Frequency Chart** — ChartCard + BarChart แสดงจำนวนครั้ง/วัน ตาม period ที่เลือก
- [x] **`[P3-17]` Bristol Type Distribution** — ChartCard + HorizontalBar: แสดง % การกระจายของแต่ละ Bristol Type (Type 1–7). แถบสีตาม Bristol color system. เรียงลำดับจาก % มากไปน้อย
- [x] **`[P3-18]` Color Distribution** — ChartCard แสดงสัดส่วนสีที่บันทึก (น้ำตาล เขียว ดำ แดงปน เหลือง ขาว)
- [x] **`[P3-19]` Warning System (Triggers)** — AlertCard แสดงเมื่อ:
  - ไม่มีการบันทึกติดต่อกันเกิน 3 วัน → Danger (แดง)
  - พบ Type 5–6 เพิ่มขึ้นติดต่อ 2 วัน → Warning (เหลือง)
  - พบสีดำหรือสีแดงปน (เลือด) → Critical Danger (แดง) + แนะนำให้พบแพทย์
  - พบ Type 1 ซ้ำเกิน 5 ครั้งในสัปดาห์ → Warning (เหลือง)
- [x] **`[P3-20]` Health Score Detail** — แสดง breakdown คะแนน: Type Score (50%), Frequency Score (30%), Color Score (20%) พร้อมคำแนะนำเฉพาะบุคคลตามผลคะแนน
- [x] **`[P3-21]` No Data State** — ถ้ายังไม่มีข้อมูลเพียงพอ: แสดงข้อความ "ยังมีข้อมูลไม่เพียงพอสำหรับการวิเคราะห์ — ลองบันทึกอย่างน้อย 5 วัน"

### Screen 4: Import & Export (นำเข้า/ส่งออก)

- [x] **`[P3-22]` Navy Theme Header** — สลับจาก Coral เป็น Navy (#1C3B5A) สำหรับบริบท Formal/Medical. Header แสดง "นำเข้า/ส่งออกข้อมูล" + subtitle "สำรองและย้ายข้อมูล"
- [x] **`[P3-23]` Import Card** — ReportCard: ปุ่ม "📂 เลือกไฟล์ JSON" → file input accept=".json" → อ่านไฟล์ → parse JSON → validate schema → deduplication logic → แสดงผลลัพธ์ด้วย Toast (นำเข้าใหม่ X รายการ / ซ้ำ Y รายการ / ทั้งหมด Z รายการ). แสดง privacy notice "🔒 ข้อมูลเก็บในเครื่อง"
- [x] **`[P3-24]` Export Card** — ReportCard: ปุ่ม "📥 ส่งออก JSON" → serialize localStorage records → `JSON.stringify` → `Blob` → download via `<a download="poad-ee-export-{date}.json">`
- [x] **`[P3-25]` Medical Report Card** — ReportCard แสดง:
  - ช่วงวันที่ (จากบันทึกแรกสุดถึงล่าสุด)
  - จำนวนครั้งทั้งหมด
  - ค่าเฉลี่ยต่อวัน
  - Bristol Type ที่พบบ่อยที่สุด
  - % ท้องผูก (Type 1–2)
  - % ท้องเสีย (Type 6–7)
  - % สีผิดปกติ (ดำ, แดงปน, ขาว)
  - สถานะ: ✓ (ปกติ) / ⚠ (ควรระวัง)
- [x] **`[P3-26]` PDF Generation** — ปุ่ม "📄 ส่งออก PDF" → สร้างรายงาน PDF จาก Medical Report Card (ใช้ jsPDF หรือ html2pdf library) → download
- [x] **`[P3-27]` Share via App** — ปุ่ม "↑ แชร์ผ่านแอป" → ใช้ Web Share API (`navigator.share`) ถ้ามี; fallback เป็น copy-to-clipboard หรือ download ถ้าไม่รองรับ

### Screen 5: Settings (ตั้งค่า)

- [x] **`[P3-28]` Settings Screen** — ตั้งค่าภาษา (ไทย/อังกฤษ placeholder), ธีม (Light เท่านั้น v1), เกี่ยวกับแอป (version, credits), ปุ่มล้างข้อมูลทั้งหมด (พร้อม Confirm Dialog)

---

## Phase 4: Data Layer & Business Logic

### Data Model
- [x] **`[P4-01]` Record Schema** — กำหนด TypeScript interface:
  ```typescript
  interface LogRecord {
    id: string;              // crypto.randomUUID()
    recordedAt: string;      // ISO 8601 "2026-07-03T14:32:00+07:00"
    bristolType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    color: 'brown' | 'green' | 'black' | 'reddish' | 'yellow' | 'white';
    amount: 'low' | 'normal' | 'high';
    effort: 'easy' | 'moderate' | 'hard';
    note?: string;           // optional note / comment
    createdAt: string;       // timestamp when record was created
    updatedAt: string;
  }
  ```
- [x] **`[P4-02]` localStorage Service** — สร้าง `services/storageService.ts`: `getRecords()`, `getRecordById(id)`, `addRecord(record)`, `updateRecord(id, partial)`, `deleteRecord(id)`, `clearAll()`. Key: `"poad-ee-records"`
- [x] **`[P4-03]` Settings Schema & Service** — เก็บค่าตั้งค่าใน localStorage key `"poad-ee-settings"` (ภาษา, iOS prompt dismissed flag, iOS prompt last shown date). `services/settingsService.ts`: `getSettings()`, `updateSettings(partial)`

### Health Score Algorithm
- [x] **`[P4-04]` Type Score (50%)** — คำนวณ `[จำนวน Type 3+4] / [จำนวนทั้งหมด]` ในช่วงเวลาที่กำหนด (7 หรือ 30 วัน). ให้น้ำหนัก Type 4 (×1.0) มากกว่า Type 3 (×0.8) เพื่อสะท้อนว่า Type 4 คือค่าในอุดมคติ
- [x] **`[P4-05]` Frequency Score (30%)** — ให้คะแนนเต็มเมื่อความถี่เฉลี่ย 1 ครั้ง/วัน (±1 ครั้ง). ลดคะแนนเมื่อถี่เกิน (>3 ครั้ง/วัน) หรือห่างเกินไป (<0.5 ครั้ง/วัน). Scale แบบ linear/stepped
- [x] **`[P4-06]` Color Score (20%)** — คำนวณ `[จำนวนสีปกติ (น้ำตาล)] / [จำนวนทั้งหมด]`. ลดคะแนนตามจำนวนสีผิดปกติ (สีดำ/แดงปน ลดมากที่สุด)
- [x] **`[P4-07]` Health Score Calculator** — รวมคะแนน: `health_score = (type_score × 0.50 + frequency_score × 0.30 + color_score × 0.20) × 100`. แสดงผลเป็น 0–100 (ปัดเป็นจำนวนเต็ม)
- [x] **`[P4-08]` Previous Period Score Comparison** — `getPreviousPeriodScore(records, currentPeriodDays)` → คำนวณคะแนนของช่วงก่อนหน้า (จำนวนวันเท่ากัน) เพื่อแสดง % การเปลี่ยนแปลง (+5%, -3%) บน Dashboard
- [x] **`[P4-09]` Score Classification** — 80–100: 🟢 ดีมาก, 60–79: ✓ ดี, 40–59: ⚠️ ควรระวัง, <40: 🔴 ควรพบแพทย์

### Analytics Engine
- [x] **`[P4-10]` Period Filtering** — `filterRecords(days)` → filter ตามจำนวนวันย้อนหลังจากวันนี้. รองรับ 1d, 7d, 30d, custom range (รับ start/end date)
- [x] **`[P4-11]` Bristol Distribution** — `getBristolDistribution(records)` → `{ type: number, count: number, percentage: number }[]` เรียงตาม % มากไปน้อย
- [x] **`[P4-12]` Color Distribution** — `getColorDistribution(records)` → `{ color: string, count: number, percentage: number }[]`
- [x] **`[P4-13]` Daily Frequency** — `getDailyFrequency(records, days)` → `{ date: string, count: number }[]` สำหรับ BarChart (เติมวันที่ไม่มีบันทึกด้วย count: 0)
- [x] **`[P4-14]` Streak Calculator** — `getCurrentStreak(records)` → จำนวนวันติดต่อกันที่มีการบันทึกอย่างน้อย 1 ครั้ง (นับจากวันนี้ย้อนหลัง); `getLongestStreak(records)` → จำนวนวันที่ติดต่อกันนานที่สุดตลอดช่วงเวลา

### Import / Export Logic
- [x] **`[P4-15]` Export JSON** — `exportRecords()` → serialize ทั้งหมดเป็น JSON blob + trigger download ด้วยชื่อไฟล์ `poad-ee-export-YYYY-MM-DD.json`
- [x] **`[P4-16]` Import JSON with Deduplication** — `importRecords(jsonData)` → ตรวจจับ duplicate โดยเปรียบเทียบ `recordedAt + bristolType` หากตรงกัน → ข้าม. ส่งคืน `{ imported: number, skipped: number, total: number }`
- [x] **`[P4-17]` Data Validation** — `validateImportData(jsonData)` → ตรวจสอบ JSON ที่ import ว่า schema ถูกต้อง (มี required fields, type ถูกต้อง, timestamp parse ได้, field values อยู่ใน enum). แสดง error message หากไฟล์เสียหาย

### Warning / Alert Engine
- [x] **`[P4-18]` Constipation Warning** — ไม่มีบันทึก ≥ 3 วัน → `{ level: 'danger', message: 'คุณไม่มีการบันทึกมา 3 วันแล้ว' }`
- [x] **`[P4-19]` Diarrhea Trend Warning** — Type 5–6 เพิ่มขึ้น ≥ 2 วันติด → `{ level: 'warning', message: 'พบท้องเสียต่อเนื่อง' }`
- [x] **`[P4-20]` Blood/Black Color Warning** — พบบันทึกสีดำหรือแดงปน → `{ level: 'critical', message: 'พบสีผิดปกติ — ควรปรึกษาแพทย์' }`
- [x] **`[P4-21]` Chronic Constipation Warning** — Type 1 ซ้ำ > 5 ครั้งใน 7 วัน → `{ level: 'warning', message: 'พบท้องผูกรุนแรงต่อเนื่อง' }`

---

## Phase 5: PWA & iOS A2HS Implementation

- [x] **`[P5-01]` Service Worker: File & Registration** — สร้าง `public/sw.js` (หรือใช้ vite-plugin-pwa). ลงทะเบียน service worker ใน `main.tsx`. Cache-first สำหรับ static assets (JS/CSS/fonts/icons). Pre-cache ไฟล์สำคัญตอน install event
- [x] **`[P5-02]` Service Worker: Offline Fallback** — เมื่อ offline: แสดง app shell + localStorage data ได้ปกติ. แสดง indicator/banner "คุณกำลังใช้งานแบบออฟไลน์" ด้านบนของหน้า
- [x] **`[P5-03]` Service Worker: Update Flow** — ตรวจจับ SW update → แสดง Toast "มีเวอร์ชันใหม่ — แตะเพื่ออัปเดต" → `skipWaiting()` + reload
- [x] **`[P5-04]` iOS Detection Utility** — `isIOS()`: detect iOS จาก `navigator.userAgent`. `isStandalone()`: detect `window.navigator.standalone` หรือ `display-mode: standalone` ใน media query
- [x] **`[P5-05]` iOS A2HS Overlay Prompt** — Custom overlay component:
  - Trigger: `isIOS() && !isStandalone() && !dismissedBefore()`
  - UI: Bottom sheet animation เลื่อนขึ้นจากด้านล่าง
  - เนื้อหา: "📱 เพิ่มแอปไปที่หน้าจอโฮม" + animation ลูกศรชี้ขึ้นไปที่ Share button ของ Safari
  - คำแนะนำ: `แตะ  [↑ แชร์]  → "เพิ่มไปยังหน้าจอโฮม"`
  - ปุ่ม "เข้าใจแล้ว" → dismiss → บันทึก `poad-ee-ios-prompt-dismissed` และ `poad-ee-ios-prompt-last-shown` ใน localStorage
  - ไม่แสดงซ้ำอีก (หรือแสดงใหม่หลังจาก 30 วัน)
- [x] **`[P5-06]` Android A2HS Prompt** — ใช้ `beforeinstallprompt` event (ถ้ามี) → แสดงปุ่ม "ติดตั้งแอป" บนหน้า Dashboard → `prompt.prompt()` → จัดการ `userChoice`

---

## Phase 6: Polish, Testing & Accessibility

### Accessibility
- [x] **`[P6-01]` WCAG AA Contrast** — ตรวจสอบ contrast ratio ของทุก text element ≥ 4.5:1 (normal) และ ≥ 3:1 (large text). โดยเฉพาะ `--muted` (#8A6F6A) บน `--bg` (#FFFBF8) และ `--coral` (#E8634B) บน white
- [x] **`[P6-02]` Touch Targets** — ทุกปุ่ม, link, และ interactive element ต้องมีขนาดอย่างน้อย 44×44px
- [x] **`[P6-03]` Semantic HTML** — ใช้ `<main>`, `<nav>`, `<section>`, `<article>`, `<button>` อย่างถูกต้อง. เพิ่ม `aria-label` บน icon-only elements. Form elements มี `<label>` กำกับ
- [x] **`[P6-04]` Focus Management** — จัดการ focus trap ใน modal/dialog. Tab order สมเหตุสมผล. `:focus-visible` styles (coral outline)
- [x] **`[P6-05]` Reduced Motion** — `@media (prefers-reduced-motion: reduce)` → ปิด animation (Health Score ring transition, FAB bounce, toast slide, A2HS prompt animation)
- [x] **`[P6-06]` Bottom Nav Labels** — แสดง label กำกับทุก navigation item (ไม่ icon-only) เพื่อความชัดเจน
- [x] **`[P6-07]` Bristol Card Accessibility** — ไม่ใช้สีเป็นตัวสื่อสารเพียงอย่างเดียว (มี label + description ภาษาไทยประกอบ). Color selector มีชื่อสี + circular color swatch

### iOS-Specific CSS
- [x] **`[P6-08]` iOS Safe Area & Touch Optimization** — CSS สำหรับ iOS standalone mode:
  - `padding-top: env(safe-area-inset-top)`, `padding-bottom: env(safe-area-inset-bottom)`
  - `-webkit-overflow-scrolling: touch` สำหรับ scroll containers
  - `-webkit-touch-callout: none` บน elements ที่ไม่ต้องการ iOS long-press menu
  - `user-select: none` บน UI elements ที่ไม่ใช่เนื้อหา
  - `overscroll-behavior: none` ป้องกัน pull-to-refresh ใน standalone mode

### Responsive & Visual QA
- [x] **`[P6-09]` Mobile-First Responsive** — ทดสอบที่ 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone 14 Pro Max), 360px (Android small)
- [x] **`[P6-10]` Tablet Layout** — ที่ความกว้าง ≥ 768px: เพิ่ม `max-w-2xl`, ปรับ grid เป็น 2–3 columns สำหรับ Bristol cards, แสดง ChartCard คู่กัน
- [x] **`[P6-11]` Safe Area Insets** — ทดสอบการแสดงผลบน iPhone ที่มี notch / Dynamic Island และ Android edge-to-edge → เนื้อหาต้องไม่ถูกบังโดย notch หรือ navigation bar
- [x] **`[P6-12]` Dark Mode Preparation** — (Optional v1) เพิ่ม CSS variables แยกสำหรับ dark theme ถ้ามีเวลา

### Testing
- [ ] **`[P6-13]` iOS Safari Testing** — ทดสอบบน iPhone จริง (Safari): A2HS install flow, standalone mode display (ไม่มี URL bar), status bar สี Coral, swipe-to-navigate, เปิดจากหน้าจอโฮม
- [ ] **`[P6-14]` iOS Standalone QA** — ตรวจสอบ: PWA manifest ทำงาน, theme_color แสดงผล (#E8634B), apple-touch-icon คมชัด, apple-mobile-web-app-status-bar-style ถูกต้อง (black-translucent)
- [ ] **`[P6-15]` Cross-Browser Testing** — Chrome Android, Safari iOS, Chrome Desktop (responsive mode), Firefox
- [ ] **`[P6-16]` Offline Testing** — เปิดโหมด Airplane → ทดสอบ: app เปิดได้, บันทึกข้อมูลได้ (localStorage), แสดงข้อมูลเก่าได้, service worker cache ทำงาน, offline indicator แสดง
- [ ] **`[P6-17]` Edge Cases** — ทดสอบ: ข้อมูล 0 records, 10,000+ records (perf), import ไฟล์เสียหาย/รูปแบบผิด, import ข้อมูลซ้ำ 100%, export บน iOS Safari (download behavior), เปลี่ยน timezone, localStorage เต็ม (quota exceeded), เปิด 2 แท็บพร้อมกัน
- [ ] **`[P6-18]` Performance Audit** — Lighthouse PWA score ≥ 90, Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90

---

## Phase 7: Deployment

- [x] **`[P7-01]` GitHub Pages Setup** — ติดตั้ง `gh-pages` package, เพิ่ม `homepage` field ใน `package.json`, เพิ่ม deploy script: `vite build && gh-pages -d dist`
- [x] **`[P7-02]` GitHub Actions CI/CD** — สร้าง workflow `.github/workflows/deploy.yml`: build on push to `main` → deploy to `gh-pages` branch. รวมขั้นตอน lint + typecheck ก่อน build
- [ ] **`[P7-03]` Custom Domain (Optional)** — ถ้ามีโดเมน: ตั้งค่า CNAME, เพิ่ม `public/CNAME`, อัปเดต DNS
- [ ] **`[P7-04]` Production Verification** — ทดสอบบน production URL: PWA installable, A2HS flow, manifest ถูกต้อง, service worker registered, HTTPS (GitHub Pages รองรับ), apple-touch-icon เข้าถึงได้, 404 fallback สำหรับ SPA routing
- [x] **`[P7-05]` README & Docs** — เขียน `README.md`: ชื่อแอป, วิธีติดตั้ง PWA (Android + iOS A2HS steps), tech stack, วิธีรัน dev server, วิธี build, วิธี deploy, project structure
- [ ] **`[P7-06]` Version Tagging** — git tag `v1.0.0` + release notes สรุปฟีเจอร์ทั้งหมด

---

## Summary

| Phase | Tasks | Estimated Weeks |
|-------|------:|:---------------:|
| Phase 1: Setup | 8 | Week 1–2 |
| Phase 2: Components | 21 | Week 3–5 |
| Phase 3: Screens | 28 | Week 5–8 |
| Phase 4: Data Layer | 21 | Week 6–9 |
| Phase 5: PWA/iOS | 6 | Week 9–10 |
| Phase 6: Polish & Test | 18 | Week 10–12 |
| Phase 7: Deploy | 6 | Week 12 |
| **Total** | **108** | **12 weeks** |

---

## Quick Start Commands

```bash
# Create project
npm create vite@latest poad-ee -- --template react-ts
cd poad-ee

# Install dependencies
npm install
npm install -D tailwindcss @tailwindcss/vite

# Dev server
npm run dev

# Build
npm run build

# Lint & Typecheck
npm run lint
npm run typecheck

# Deploy to GitHub Pages
npm run deploy
```
