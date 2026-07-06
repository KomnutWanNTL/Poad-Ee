interface OfflineBannerProps {
  isOnline: boolean
}

export default function OfflineBanner({ isOnline }: OfflineBannerProps) {
  if (isOnline) return null

  return (
    <div
      role="alert"
      className="bg-navy text-white text-caption text-center py-1.5 font-medium animate-pulse"
    >
      คุณกำลังใช้งานแบบออฟไลน์
    </div>
  )
}
