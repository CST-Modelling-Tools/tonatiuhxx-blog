// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tonatiuh++ Development Blog',
  tagline: 'Advancing solar ray tracing for concentrating solar systems',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://CST-Modelling-Tools.github.io',
  baseUrl: '/tonatiuhxx-blog/',
  trailingSlash: false,
  organizationName: 'CST-Modelling-Tools',
  projectName: 'tonatiuhxx-blog',
  deploymentBranch: 'gh-pages',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CST-Modelling-Tools', // Usually your GitHub org/user name.
  projectName: 'tonatiuhxx-blog', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Plugins configuration
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-XXXXXXXXXX', // Replace with your actual Measurement ID
        anonymizeIP: true, // Optional: anonymize IP addresses for privacy
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          routeBasePath: '/', // Make blog the homepage
          showReadingTime: true,
          blogTitle: 'Tonatiuh++ Development Blog - Solar Ray Tracing Research',
          blogDescription: 'Latest developments in Tonatiuh++, an advanced solar ray tracing software for analyzing concentrating solar power systems. Research updates, algorithms, and CST modeling insights.',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: 'all',
            title: 'Tonatiuh++ Development Blog',
            description: 'Latest developments in solar ray tracing and CST optimization research',
            copyright: `Copyright © ${new Date().getFullYear()} TonatiuhXX Development`,
            language: 'en',
          },
        },
        docs: false, // Disable docs section for now,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'], // This excludes tag pages, which is fine
          filename: 'sitemap.xml',
          // Add custom priority for different page types
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.map((item) => {
              // Give blog posts higher priority
              if (item.url.includes('/welcome') || (!item.url.includes('/tags') && !item.url.includes('/archive') && item.url !== rest.siteConfig.url + rest.siteConfig.baseUrl)) {
                return {...item, priority: 0.7, changefreq: 'daily'};
              }
              // Homepage gets highest priority
              if (item.url === rest.siteConfig.url + rest.siteConfig.baseUrl) {
                return {...item, priority: 1.0, changefreq: 'daily'};
              }
              return item;
            });
          },
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // SEO metadata
      metadata: [
        {name: 'keywords', content: 'solar energy, ray tracing, CST, concentrating solar power, Tonatiuh, optical simulation, renewable energy, solar research'},
        {name: 'author', content: 'Manuel Blanco'},
        {name: 'description', content: 'Development blog for Tonatiuh++, advanced solar ray tracing software for concentrating solar power systems'},
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'Tonatiuh++ Development Blog'},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Tonatiuh++ Development Blog',
        logo: {
          alt: 'Tonatiuh++ Solar Ray Tracing Software Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/CST-Modelling-Tools/tonatiuhxx-blog',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Development',
            items: [
              {
                label: 'Blog',
                to: '/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'TonatiuhXX Repository',
                href: 'https://github.com/CST-Modelling-Tools/TonatiuhXX',
              },
              {
                label: 'Original Tonatiuh',
                href: 'https://github.com/iat-cener/tonatiuh',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/CST-Modelling-Tools/tonatiuhxx-blog',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TonatiuhXX Development. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;