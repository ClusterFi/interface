import localFont from 'next/font/local'

const involve = localFont({
  src: [
    {
      path: './involve-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './involve-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './involve-mediumoblique.woff2',
      weight: '500',
      style: 'oblique',
    },
    {
      path: './involve-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-primary',
})

export const fonts = [involve]
