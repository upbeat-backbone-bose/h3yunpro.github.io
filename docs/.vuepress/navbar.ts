import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  {
    text: '首页', link: '/'
  },
  {
    text: '文档', link: '/docs/language/'
  },
  {
    text: '工具箱', link: '/blog/tags/?tag=工具箱'
  },
  {
    text: '更新说明', link: '/blog/tags/?tag=更新说明'
  },
  {
    text: '博客', link: '/blog/'
  }
])
