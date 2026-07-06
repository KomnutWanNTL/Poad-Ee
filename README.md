# ปวดอึ (Poad-Ee)

ลำไส้ดี ชีวิตดี — บันทึกการขับถ่ายง่ายๆ ใน 3 คลิก

โปรเจกต์นี้ช่วยบันทึกสุขภาพระบบขับถ่ายผ่านการบันทึก Bristol Stool Chart แบบง่าย พร้อมวิเคราะห์แนวโน้มและคะแนนสุขภาพ

## คุณสมบัติ

- **บันทึกด่วน 3 ขั้นตอน** — เลือกประเภท (Bristol Type 1–7), สี, และปริมาณ/อาการ
- **แดชบอร์ดสุขภาพ** — คะแนนสุขภาพ, สถิติรายสัปดาห์, กราฟความถี่ 7 วัน
- **ผลวิเคราะห์** — การกระจาย Bristol Type, การกระจายสี, ระบบแจ้งเตือนอัตโนมัติ
- **นำเข้า/ส่งออก** — ส่งออก JSON/PDF, นำเข้าไฟล์สำรอง, รายงานการแพทย์
- **PWA** — ติดตั้งบนหน้าจอโฮม (iOS + Android), ใช้งานออฟไลน์ได้

## การติดตั้ง PWA

### Android
1. เปิดเว็บไซต์ใน Chrome
2. แตะเมนู ⁝ → "เพิ่มในหน้าจอโฮม" หรือตอบรับแบนเนอร์ติดตั้ง

### iOS (iPhone/iPad)
1. เปิดเว็บไซต์ใน Safari
2. แตะปุ่มแชร์ ↑ ที่แถบด้านล่าง
3. เลือก "เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)
4. แตะ "เพิ่ม" — แอปจะปรากฏบนหน้าจอโฮม

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- vite-plugin-pwa (Service Worker + offline support)
- jsPDF (PDF export)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# TypeScript type check
npm run typecheck

# Lint
npm run lint

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── buttons/      # Button variants
│   ├── cards/        # Cards (Stat, Log, Bristol, Chart, Alert, Report)
│   ├── charts/       # BarChart, HorizontalBar, HealthScoreRing
│   ├── feedback/     # Toast, ConfirmDialog, IosInstallPrompt
│   ├── navigation/   # BottomNav, FAB
│   └── selectors/    # Bristol, Color, Amount, Effort selectors
├── hooks/            # useRecords, useSettings, useToast, usePwa
├── screens/          # Dashboard, QuickLog, Analytics, ImportExport, Settings
├── services/         # localStorage service, settings service
├── utils/            # scoring, analytics, warnings, dateUtils, importExport
└── types.ts          # TypeScript interfaces
```

## License

© 2026 Poad-Ee App
