export function getScoreColor(score: number): string {
  if (score >= 80) return '#3A6F4A'
  if (score >= 60) return '#3A6F4A'
  if (score >= 40) return '#C47A00'
  return '#B91C1C'
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'ดีมาก'
  if (score >= 60) return 'ดี'
  if (score >= 40) return 'ควรระวัง'
  return 'ควรพบแพทย์'
}
