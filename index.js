const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

app.keys = ['key1', 'key2']

app.use(async ctx => {
  const { url, path } = ctx
  console.log('router is: ', ctx.req)
  if (url === '/') {
    ctx.cookies.set('key', new Date().toLocaleString(), { signed: true })
    // ctx.cookies.set('key', new Date().toLocaleString(), {
    //   httpOnly: false,
    // })
    ctx.header = {
      'Content-Type': 'text/plain',
    }
    ctx.body = 'hello world'
  } else if (url === '/login') {
    /** cookie */
    const signedKey = ctx.cookies.get('key', { signed: true })
    const key = ctx.cookies.get('key')
    console.log('signedKey unsigned', signedKey)
    console.log('key', key)
    /** request */
    ctx.header = {
      'Content-Type': 'text/plain',
    }
    ctx.body = 'passed!'
  } else if (path === '/request') {
    ctx.header = {
      'Content-Type': 'application/json',
    }
    ctx.body = {
      method: ctx.method,
      originalUrl: ctx.originalUrl,
      href: ctx.href,
      path: ctx.path,
      querystring: ctx.querystring,
      search: ctx.search,
      host: ctx.host,
      hostname: ctx.hostname,
      type: ctx.request.type,
      charset: ctx.charset,
      query: ctx.query,
      protocol: ctx.protocol,
      accepts: ctx.accepts(),
      jsonAccepts: ctx.accepts('application/json'),
      acceptsEncodings: ctx.acceptsEncodings(),
      appointEncodings: ctx.acceptsEncodings(['gzip', 'deflate', 'identity']),
    }
  } else if (url === '/error') {
    ctx.throw(404, 'not found resource', {
      user: 'tester',
    })
  }
})
app.listen(12306, () => {
  console.log('lister 12306')
})
app.on('error', e => {
  console.log(e)
})
