import type { Metadata } from 'next'
import { DashboardPage } from '@/layouts'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Page description',
}

export default function Page() {
  return <DashboardPage />
}