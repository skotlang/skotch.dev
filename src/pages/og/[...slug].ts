import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'

const docs = await getCollection('docs')

const pages = Object.fromEntries(
  docs.map((page) => [page.id, { data: page.data }])
)

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'slug',
  pages,
  getImageOptions: (_path, page: (typeof pages)[string]) => ({
    title: page.data.title,
    description: page.data.description,
    bgGradient: [[17, 28, 13], [26, 46, 0]],
    logo: {
      path: './src/assets/skotch-icon.png',
      size: [60],
    },
    border: {
      color: [90, 158, 30],
      width: 20,
      side: 'inline-start',
    },
    padding: 60,
    font: {
      title: {
        size: 64,
        color: [255, 255, 255],
        weight: 'Bold',
        families: ['Inter'],
      },
      description: {
        size: 32,
        color: [188, 196, 176],
        families: ['Inter'],
      },
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf',
    ],
  }),
})
