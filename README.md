Server Side Routing for Clean URLs with Next.js
===
Scenario
---
A travel agency is trying to build a blog where they will be presenting their promotions and services. They've decided to use [Next.js](https://nextjs.org) framework to support server side rendering which is required to improve Google SEO.

The URL format they want to support should be like these examples:

* https://awesome-travel-agency.com/fligths/1/holidays-in-miami
* https://awesome-travel-agency.com/hotels/23/cheap-hotel-in-chicago-for-a-night

So, the format should be `/$ENTITY/$PROMO_ID/$SEO_TEXT` where

- `$ENTITY` = [flights, hotels]

- `$PROMO_ID` = DB id in their backend which can be used to retrieve the page content

- `$SEO_TEXT` = Human readable text defined by marketing department

Work Plan
---

1. Explore the official [Next.js website](https://nextjs.org/) in order to look for simple examples.
2. Follow the official tutorial in order to create a simple Blog with server side support for clean URLs with route masking. The results can be found in [this reopository](https://github.com/tomasBustamante/hello-next) and its deployment to Heroku can be accessed [here](https://hello-next-test.herokuapp.com/).
3. Proceed to build the example for the customer with the URL format they desire.
4. Use the [official documentation](https://nextjs.org/docs) in order to check for more details.
5. Upload the solution to a Git repository and provide detailed documentation for the steps required in order to reach the desired solution.

Activity Log
---
### 1. Initial setup

First we create the local directory and initialize the project with the following commands:

```console
$ mkdir awesome-travel-agency
$ cd awesome-travel-agency
$ npm init -y
$ npm install --save react react-dom next
$ mkdir pages
```

Then we modify the `package.json` file adding the following scripts:

```javascript
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start -p $PORT",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### 2. Create a custom server

We need to add [Express](https://expressjs.com/) to the app:

```console
npm install --save express
```

Then the file `server.js` needs to be added to the project's root directory.

In order to have the desired URL format, we need to create a custom route for the three query params (entity, promo ID and SEO text) in order to direct it to the post page:

```javascript
server.get('/:entity/:promo_id/:seo_text', (req, res) => {
  const actualPage = '/post'
  const queryParams = { entity: req.params.entity,
                        promo_id: req.params.promo_id,
                        seo_text: req.params.seo_text }
  app.render(req, res, actualPage, queryParams)
})
```

### 3. Fetch data

```console
npm install --save isomorphic-unfetch
```

Solution
---
