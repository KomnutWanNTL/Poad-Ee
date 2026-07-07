import sharp from 'sharp'
import { readFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '..', 'public')

// The 192px SVG as master source (higher resolution)
const SVG_PATH = resolve(PUBLIC, 'icon-192.svg')
const svgBuffer = readFileSync(SVG_PATH)

// Required sizes for iOS A2HS + Android/manifest
const SIZES = [
  { size: 180, label: 'icon-180', ios: '180x180' },  // iPhone 6.7"/6.5"/5.5" @3x
  { size: 167, label: 'icon-167', ios: '167x167' },  // iPad Pro 10.5" @2x
  { size: 152, label: 'icon-152', ios: '152x152' },  // iPad Retina @2x
  { size: 144, label: 'icon-144', ios: '144x144' },  // iPad mini @2x
  { size: 120, label: 'icon-120', ios: '120x120' },  // iPhone 4.7"/4" @2x
  { size: 76,  label: 'icon-76',  ios: '76x76'    }, // iPad standard
  { size: 192, label: 'icon-192', ios: '192x192'  }, // Manifest / Android
  { size: 512, label: 'icon-512', ios: '512x512'  }, // PWA manifest large
]

async function main() {
  mkdirSync(PUBLIC, { recursive: true })

  for (const { size, label } of SIZES) {
    const outPath = resolve(PUBLIC, `${label}.png`)

    // The SVG uses viewBox 0 0 192 192, so sharp will render at that coordinate space
    // We need to set the output dimensions to the target size
    await sharp(svgBuffer, { density: Math.max(size, 192) })
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 251, b: 248, alpha: 0 } })
      .png()
      .toFile(outPath)

    console.log(`✅ ${label}.png  ${size}×${size}  → ${outPath}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
