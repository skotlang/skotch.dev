// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'
import starlightBlog from 'starlight-blog'
import rehypeExternalLinks from "rehype-external-links";
import { remarkHeadingId } from "remark-custom-heading-id";

// https://astro.build/config
export default defineConfig({
  site: 'https://skotch.dev',
  markdown: {
    remarkPlugins: [remarkHeadingId],
    rehypePlugins: [[rehypeExternalLinks, {
        target: "_blank",
        content: {
          type: "text",
          value: " ↗"
        }
      }]
    ],
  },
  integrations: [
    starlight({
      title: 'skotch',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/skotch-icon.svg',
      },
      defaultLocale: 'root',
      locales: {
        'root': {
          label: 'English',
          lang: 'en',
        },
      },
      components: {
        Header: './src/components/CustomHeader.astro',
      },
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
        starlightBlog({
          prefix: 'blog',
          navigation: 'header-start',
          recentPostCount: 200,
          metrics: {
            readingTime: true,
            words: 'total',
          },
        }),
      ],
      routeMiddleware: './src/routeData.ts',
      head: [
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Skotch' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/skotlang/skotch' },
      ],
      editLink: {
        baseUrl: 'https://github.com/skotlang/skotch.dev/edit/main/'
      },
      sidebar: [
        {
          label: 'Documentation',
          items: [
            'docs',
            'docs/getting-started',
            'docs/language-overview',
            'docs/syntax',
            'docs/types',
            'docs/functions',
            'docs/control-flow',
            'docs/classes-and-objects',
            'docs/interop',
            'docs/compiler',
            'docs/cli',
            'docs/configuration',
            'docs/architecture',
            'docs/faq',
          ],
        },
        {
          label: 'Guides',
          collapsed: false,
          items: [
            'docs/guides/hello-world',
            'docs/guides/building-a-library',
            'docs/guides/android-integration',
            'docs/guides/jvm-targets',
            'docs/guides/testing',
            'docs/guides/debugging',
          ],
        },
        {
          label: 'Reference',
          collapsed: false,
          items: [
            'docs/reference/grammar',
            'docs/reference/standard-library',
            'docs/reference/annotations',
            'docs/reference/error-messages',
          ],
        },
      ],
    }),
  ],
});
