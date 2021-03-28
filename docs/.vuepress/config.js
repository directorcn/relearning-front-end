// const ecma = require('./sidebar/ecma')
// const browser = require('./sidebar/browser')
// const programming = require('./sidebar/programming')
const map = require('./sidebar/map')
// const tools = require('./sidebar/tools')
// const vuejs = require('./sidebar/vue')
const css = require('./sidebar/css')

module.exports = {
  title: 'RelearningFrontEnd',
  description: 'You are the owner of your career.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: ['@vuepress/back-to-top'],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'JS', link: '/js/' },
      // { text: 'Browser', link: '/web-browser/' },
      { text: 'CSS', link: '/css/' },
      // { text: 'Tools', link: '/tools/' },
      // { text: 'Programming', link: '/programming/' },
      // { text: 'Vue', link: '/vue/' },
      { text: 'github', link: 'https://github.com/directorcn/' }
    ],
    sidebarDepth: 3,
    lastUpdated: 'Last Updated', // string | boolean
    sidebar: {
      // '/js/': ecma,
      // '/web-browser/': browser,
      '/css/': css,
      // '/programming/': programming,
      // '/vue/': vuejs,
      // '/tools': tools,
      '/map/': map
    }
  },
  configureWebpack: {
  }
}
