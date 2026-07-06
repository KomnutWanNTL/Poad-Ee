import { jsPDF } from 'jspdf'

const base = import.meta.env.BASE_URL

const FONTS = {
  Sarabun: {
    normal: `${base}fonts/Sarabun-Regular.ttf`,
    bold: `${base}fonts/Sarabun-Bold.ttf`,
    italic: `${base}fonts/Sarabun-Italic.ttf`,
  },
} as const

function toBase64(buffer: ArrayBuffer): string {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export async function registerSarabunFont(pdf: jsPDF): Promise<void> {
  const entries = Object.entries(FONTS.Sarabun) as [string, string][]
  for (const [style, url] of entries) {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    const base64 = toBase64(buffer)
    const filename = `Sarabun-${style}.ttf`
    pdf.addFileToVFS(filename, base64)
    pdf.addFont(filename, 'Sarabun', style)
  }
}
