import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const docsNote = defineNoteConfig({
  dir: 'docs',
  link: '/',
  sidebar: [{
    text: '基础',
    prefix: '/',
    icon: 'ep:guide',
    items: [
      '/docs/language/',
      '/docs/dev-tools/',
      '/docs/noun/',
      '/docs/check-code/',
      '/docs/form-events/',
      '/docs/list-events/'
    ]
  }, {
    text: '前端API',
    prefix: '/',
    icon: 'ep:guide',
    items: [
      '/docs/form-js-api/',
      '/docs/form-js-set-get/',
      '/docs/list-js-api/',
      '/docs/js-instance/'
    ]
  }, {
    text: '后端API',
    prefix: '/',
    icon: 'ep:guide',
    items: [
      '/docs/biz-object/',
      '/docs/bo-set-get/',
      '/docs/organization/',
      '/docs/workflow/',
      '/docs/notification/',
      '/docs/timer/',
      '/docs/exec-sql/',
      '/docs/cs-json/',
      '/docs/cs-instance/'
    ]
  }, {
    text: '数据库',
    prefix: '/',
    icon: 'ep:guide',
    items: [
      '/docs/sql-report/',
      '/docs/sql-dashboard/',
      '/docs/database/'
    ]
  }, {
    text: '代码示例',
    prefix: '/',
    icon: 'ep:guide',
    items: [
      '/docs/js-example/',
      '/docs/cs-example/',
      '/docs/interactive-example/',
      '/docs/sql-example/',
      '/docs/pure-example/',
      '/docs/tool-function/'
    ]
  }, {
    text: '第三方系统集成',
    prefix: '/',
    icon: 'ep:guide',
    items: [
      '/docs/req-ws/',
      '/docs/req-api/',
      {
        text: '第三方调用氚云OpenApi',
        link: 'https://h3yun-pro-doc-openapi.apifox.cn/'
      }
    ]
  }, {
    text: '其他',
    prefix: '/',
    icon: 'ep:guide',
    items: [
      '/docs/automation/',
      '/docs/standard/',
      '/docs/faq/'
    ]
  }]
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [docsNote],
})
