export const COLORS = [
  { value: 'brown', label: 'น้ำตาล', hex: '#8B6914' },
  { value: 'green', label: 'เขียว', hex: '#4A7A50' },
  { value: 'black', label: 'ดำ', hex: '#2D2D2D' },
  { value: 'reddish', label: 'แดงปน', hex: '#B22222' },
  { value: 'yellow', label: 'เหลือง', hex: '#D4A81A' },
  { value: 'white', label: 'ขาว', hex: '#E8E0D8' },
] as const

export type ColorValue = (typeof COLORS)[number]['value']

export const AMOUNT_OPTIONS = [
  { value: 'low', label: 'น้อย' },
  { value: 'normal', label: 'ปกติ' },
  { value: 'high', label: 'มาก' },
] as const

export type AmountValue = (typeof AMOUNT_OPTIONS)[number]['value']

export const EFFORT_OPTIONS = [
  { value: 'easy', label: 'เบ่งสบาย' },
  { value: 'moderate', label: 'ต้องออกแรง' },
  { value: 'hard', label: 'ท้องผูก/เจ็บ' },
] as const

export type EffortValue = (typeof EFFORT_OPTIONS)[number]['value']
