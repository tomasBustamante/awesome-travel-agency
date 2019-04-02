const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/:entity/:promo_id/:seo_text', (req, res) => {
      const actualPage = '/post'
      const queryParams = { promo_id: req.params.promo_id,
                            seo_text: req.params.seo_text,
                            entity: req.params.entity,
                            title: req.params.title }
      console.log(queryParams)
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
