import { defineConfig } from 'dumi';
import pkg from './package.json';

export default defineConfig({
  outputPath: 'docs-dist',
  resolve: {
    docDirs: ['docs', 'src'],
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },
  styles: [
    '.dumi-default-navbar{margin-right:48px;} .dumi-default-header-right {justify-content: flex-end;}',
  ],
  themeConfig: {
    // logo: '',
    socialLinks: { github: 'https://github.com/hec9527' },
    name: pkg.name,
    hd: {
      rules: [],
      deviceWidth: 375,
    },
    nav: [
      { title: '指南', link: '/guide/quick-start' },
      { title: '组件', link: '/components/button' },
    ],
    sidebar: {
      '/guide': [
        {
          title: '指南',
          children: [
            { title: '快速上手', link: '/guide/quick-start' },
            { title: '按需引入', link: '/guide/demand-import' },
            { title: 'rem适配', link: '/guide/rem' },
          ],
        },
      ],
      '/components': [
        {
          title: '基础组件',
          children: [
            { title: 'Button 按钮', link: '/components/button', order: -1 },
            { title: 'Input 输入框', link: '/components/input' },
          ],
        },
      ],
    },
    footer: 'Open-source MIT Licensed | Copyright © 2023-present<br />Powered by hec9527',
  },
});
