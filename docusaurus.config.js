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
        trackingID: 'G-XQN1D2KQXJ', // Replace with your actual Measurement ID
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
          blogTitle: 'Research Development Blog',
          blogDescription: 'Development updates on CST optimization research',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
        },
        docs: false, // Disable docs section for now,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Tonatiuh++ Development Blog',
        logo: {
          alt: 'CST Research Logo',
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