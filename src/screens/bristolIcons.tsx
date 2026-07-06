import type { BristolType } from '../components/selectors/BristolTypeSelector'

export const BRISTOL_ICONS: BristolType[] = [
  {
    type: 1,
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32">
        <ellipse cx="16" cy="14" rx="7" ry="8" fill="#6B3A1F" />
        <ellipse cx="13" cy="11" rx="2.5" ry="2" fill="#8B5A30" />
        <ellipse cx="18" cy="11" rx="2.5" ry="2" fill="#8B5A30" />
        <ellipse cx="16" cy="14" rx="2" ry="1.5" fill="#8B5A30" />
      </svg>
    ),
    label: 'Type 1',
    description: 'อุจจาระแข็ง เป็นก้อนเล็กๆ แยกจากกัน',
  },
  {
    type: 2,
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32">
        <ellipse cx="16" cy="13" rx="8" ry="7" fill="#8B5230" />
        <ellipse cx="13" cy="10" rx="3" ry="2.5" fill="#A56840" />
        <ellipse cx="19" cy="10" rx="3" ry="2.5" fill="#A56840" />
        <ellipse cx="16" cy="13" rx="2" ry="1.5" fill="#A56840" />
      </svg>
    ),
    label: 'Type 2',
    description: 'อุจจาระแข็ง เป็นก้อนขรุขระคล้ายไส้กรอก',
  },
  {
    type: 3,
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32">
        <rect x="6" y="6" width="20" height="20" rx="8" fill="#4A7A50" />
        <ellipse cx="14" cy="11" rx="2" ry="1.5" fill="#5A8A60" />
        <ellipse cx="18" cy="11" rx="2" ry="1.5" fill="#5A8A60" />
        <rect x="12" y="15" width="8" height="4" rx="2" fill="#5A8A60" />
      </svg>
    ),
    label: 'Type 3',
    description: 'อุจจาระแข็ง มีรอยแตกบนผิว',
  },
  {
    type: 4,
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32">
        <rect x="6" y="5" width="20" height="22" rx="10" fill="#2E8B52" />
        <ellipse cx="17" cy="10" rx="2.5" ry="2" fill="#3E9B62" />
        <ellipse cx="22" cy="10" rx="2.5" ry="2" fill="#3E9B62" />
        <ellipse cx="14" cy="20" rx="2.5" ry="2" fill="#3E9B62" />
        <ellipse cx="20" cy="20" rx="2.5" ry="2" fill="#3E9B62" />
      </svg>
    ),
    label: 'Type 4',
    description: 'อุจจาระนิ่ม ผิวเรียบคล้ายไส้กรอกหรืองู',
  },
  {
    type: 5,
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32">
        <ellipse cx="16" cy="13" rx="9" ry="9" fill="#3A6FA8" />
        <ellipse cx="13" cy="10" rx="2.5" ry="2" fill="#4A7FB8" />
        <ellipse cx="19" cy="10" rx="2.5" ry="2" fill="#4A7FB8" />
        <ellipse cx="16" cy="14" rx="2" ry="1.5" fill="#4A7FB8" />
      </svg>
    ),
    label: 'Type 5',
    description: 'อุจจาระเป็นก้อนนิ่มๆ มีขอบชัดเจน',
  },
  {
    type: 6,
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32">
        <ellipse cx="16" cy="15" rx="10" ry="8" fill="#5A6ABF" />
        <ellipse cx="13" cy="12" rx="3" ry="2" fill="#6A7ACF" />
        <ellipse cx="19" cy="12" rx="3" ry="2" fill="#6A7ACF" />
        <ellipse cx="16" cy="16" rx="2.5" ry="1.5" fill="#6A7ACF" />
      </svg>
    ),
    label: 'Type 6',
    description: 'อุจจาระเละเป็นปุย มีขอบไม่ชัดเจน',
  },
  {
    type: 7,
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32">
        <ellipse cx="16" cy="16" rx="11" ry="5" fill="#7A55A8" />
        <ellipse cx="13" cy="14" rx="3" ry="1.5" fill="#8A65B8" />
        <ellipse cx="19" cy="14" rx="3" ry="1.5" fill="#8A65B8" />
        <circle cx="16" cy="16" r="2" fill="#8A65B8" />
      </svg>
    ),
    label: 'Type 7',
    description: 'อุจจาระเป็นน้ำเหลว ไม่มีก้อนแข็งเลย',
  },
]

export const BRISTOL_COLORS: Record<number, string> = {
  1: '#6B3A1F',
  2: '#8B5230',
  3: '#4A7A50',
  4: '#2E8B52',
  5: '#3A6FA8',
  6: '#5A6ABF',
  7: '#7A55A8',
}

export const BRISTOL_LABELS_SHORT: Record<number, string> = {
  1: 'Type 1',
  2: 'Type 2',
  3: 'Type 3',
  4: 'Type 4',
  5: 'Type 5',
  6: 'Type 6',
  7: 'Type 7',
}

export const BRISTOL_LABELS_THAI: Record<number, string> = {
  1: 'ประเภท 1',
  2: 'ประเภท 2',
  3: 'ประเภท 3',
  4: 'ประเภท 4',
  5: 'ประเภท 5',
  6: 'ประเภท 6',
  7: 'ประเภท 7',
}

export const COLOR_LABELS_THAI: Record<string, string> = {
  brown: 'น้ำตาล',
  green: 'เขียว',
  black: 'ดำ',
  reddish: 'แดงปน',
  yellow: 'เหลือง',
  white: 'ขาว',
}

export const AMOUNT_LABELS_THAI: Record<string, string> = {
  low: 'น้อย',
  normal: 'ปกติ',
  high: 'มาก',
}

export const EFFORT_LABELS_THAI: Record<string, string> = {
  easy: 'เบ่งสบาย',
  moderate: 'ต้องออกแรง',
  hard: 'ท้องผูก/เจ็บ',
}

export const BRISTOL_DESCRIPTIONS: Record<number, string> = {
  1: 'อุจจาระแข็ง เป็นก้อนเล็กๆ แยกจากกัน',
  2: 'อุจจาระแข็ง เป็นก้อนขรุขระคล้ายไส้กรอก',
  3: 'อุจจาระแข็ง มีรอยแตกบนผิว',
  4: 'อุจจาระนิ่ม ผิวเรียบคล้ายไส้กรอกหรืองู',
  5: 'อุจจาระเป็นก้อนนิ่มๆ มีขอบชัดเจน',
  6: 'อุจจาระเละเป็นปุย มีขอบไม่ชัดเจน',
  7: 'อุจจาระเป็นน้ำเหลว ไม่มีก้อนแข็งเลย',
}
