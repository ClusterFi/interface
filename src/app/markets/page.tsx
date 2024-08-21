import type { Metadata } from 'next'
import { MarketsPage } from '@/layouts'

export const metadata: Metadata = {
  title: 'Markets',
  description: 'Page description',
}

export default function Page() {
  return <MarketsPage />
}