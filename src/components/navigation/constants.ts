export const NAV_ITEMS = [
  { key: 'home', icon: '🏠', label: 'หน้าหลัก' },
  { key: 'log', icon: '✏️', label: 'บันทึก' },
  { key: 'analytics', icon: '📊', label: 'วิเคราะห์' },
  { key: 'import-export', icon: '📄', label: 'นำเข้า/ส่งออก' },
  { key: 'settings', icon: '⚙️', label: 'ตั้งค่า' },
] as const

export type NavItemKey = (typeof NAV_ITEMS)[number]['key']
