import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const docsNote = defineNoteConfig({
  dir: 'docs',
  link: '/docs',
  sidebar: [
    {
      text: '基础',
      prefix: '/docs/',
      icon: 'ep:guide', // iconify icon name //
      items: [{
        text: '技术栈',
        link: '/docs/language/'
      }, {
        text: '开发工具',
        link: '/docs/dev-tools/'
      }, {
        text: '常见名词',
        link: '/docs/noun/'
      }, {
        text: '应用、表单、控件编码查看',
        link: '/docs/check-code/'
      }, {
        text: '表单事件',
        link: '/docs/form-events/'
      }, {
        text: '列表事件',
        link: '/docs/list-events/'
      }]
    },
  ]
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [docsNote],
})
