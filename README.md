Server Side Routing for Clean URLs with Next.js
===

1. [Scenario](#scenario)
2. [Work Plan](#work-plan)
3. [Activity Log](#activity-log)
4. [General Requirements](#general-requirements)
5. [Solution](#solution)

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

### 2. Create layout and header

In order to have a unique layout with its own header for each page of the project, the file `MyLayout.js` should be created inside directory `components` (it could be any other name) and then imported in each page:

```javascript
import Head from 'next/head'

const linkStyle = {
  marginRight: 15
}

const Layout = props => (
  <div>
    <Head>
      <title>Awesome Travel Agency</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
    </div>
    <div className="container">
      {props.children}
    </div>
  </div>
)

export default Layout
```

Additional stylings could be added with [Reactstrap](https://reactstrap.github.io/).

### 3. Create a custom server

We need to add [Express](https://expressjs.com/) to the app:

```console
$ npm install --save express
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

The scripts in the `package.json` file should be updated in order to consider this new server file:

```javascript
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### 4. Create content pages

Inside subdirectory `pages` we'll need to create two files: one for the main page and another one for the posts contents. Any additional page (e.g. the about page) should be added as a separate file in that same directory.

#### Index page

In this first example we're going to simulate the data that we would acquire from the database. Therefore we'll create a function `getPosts()` that will return objects in a JSON format containing the `title`, the `promo_id`, the `entity` and the `seo_text`:

```javascript
// pages/index.js

import Layout from '../components/MyLayout.js'
import Link from 'next/link'

function getPosts() {
  return [
    {
      promo_id: '1',
      title: 'Best hotel in Chicago for a night!',
      entity: 'hotels',
      seo_text: 'cheap-hotel-in-chicago-for-a-night'
    },
    {
      promo_id: '2',
      title: 'Enjoy a night of luxury in Gotham City',
      entity: 'hotels',
      seo_text: 'luxury-hotel-gotham-city'
    },
    {
      promo_id: '3',
      title: 'Best hotel in Gotham for a family',
      entity: 'hotels',
      seo_text: 'family-hotel-gotham'
    },
    {
      promo_id: '4',
      title: 'Spend a weekend with your family in Metropolis',
      entity: 'flights',
      seo_text: 'weekend-family-metropolis'
    },
    {
      promo_id: '5',
      title: 'Looking for a romantic escape with your partner in NYC?',
      entity: 'flights',
      seo_text: 'romantic-couple-nyc'
    },
    {
      promo_id: '6',
      title: 'Holidays in Miami are just around the corner',
      entity: 'flights',
      seo_text: 'holidays-in-miami'
    }
  ]
}

export default function Blog() {
  return (
    <Layout>
      <h1>Awesome Travel Agency</h1>
      <ul>
        {getPosts().map(post => (
          <li key={post.promo_id}>
            <Link as={`/${post.entity}/${post.promo_id}/${post.seo_text}`} href={`/post?title=${post.title}&entity=${post.entity}&promo_id=${post.promo_id}&seo_text=${post.seo_text}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
```

Inside the `Blog` function we call the function `getPosts()` and use `next/link` for each object passing the appropriate parameters. The link itself works with the param `href` which routs to the post page and sending the parameters in a non-desired manner. In order to show this differently, we need to use another prop of the `<Link>` element called `as` which lets us format the URL as it was required by the customer. This format has to match the one specified earlier in the `server.js` file so that it will also take effect when accessing the URL directly.


#### Post page

The post page example will simply show each parameter from the URL so that they can be use to hit the backend to retrieve the needed information:

```javascript
// pages/post.js

import { withRouter } from 'next/router'
import Layout from '../components/MyLayout.js'

const Page = withRouter(props => (
  <Layout>
    <h1>{props.router.query.title}</h1>
    <p><strong>Entity: </strong>{props.router.query.entity}</p>
    <p><strong>Promo ID: </strong>{props.router.query.promo_id}</p>
    <p><strong>SEO Text: </strong>{props.router.query.seo_text}</p>
    <p>This is the blog post content.</p>
  </Layout>
))

export default Page
```

### 5. Fetch data

With the previous steps we can already render a sample page with hardcoded data for our posts using the requested URL format. If we wanted to fetch the data from a JSON API we would need to install [isomorphic-unfetch](https://github.com/developit/unfetch) as follows:

```console
$ npm install --save isomorphic-unfetch
```

After doing that we would need to modify the `index.js` page so that we don't use the hardcoded `getPosts()` function anymore and instead fetch the data from the API and parse it as a JSON file (in the example below, <API URL> should be replaced by the actual URL of the API).

```javascript
const Blog = (props) => (
  <Layout>
    <h1>Awesome Travel Agency</h1>
    <ul>
      {props.posts.map(post => (
        <li key={post.promo_id}>
          <Link as={`/${post.entity}/${post.promo_id}/${post.seo_text}`} href={`/post?title=${post.title}&entity=${post.entity}&promo_id=${post.promo_id}&seo_text=${post.seo_text}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Blog.getInitialProps = async function() {
  const res = await fetch('https://<API URL>/search/posts')
  const data = await res.json()

  return {
    shows: data.map(entry => entry.post)
  }
}

export default Blog
```

In a similar way, the `post.js` file should also be modified. In this example we're using the same URL for the API but using the `promo_id` to fetch the desired post and then access its attributes:

```javascript
import Layout from '../components/MyLayout.js'
import fetch from 'isomorphic-unfetch'

const Post = props => (
  <Layout>
    <h1>{props.post.title}</h1>
    <p><strong>Entity: </strong>{props.post.entity}</p>
    <p><strong>Promo ID: </strong>{props.post.promo_id}</p>
    <p><strong>SEO Text: </strong>{props.post.seo_text}</p>
    <p>{props.post.content}</p>
    <img src={props.post.image} />
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { entity, promo_id, seo_text } = context.query
  const res = await fetch(`https://<API URL>/posts/${promo_id}`)
  const post = await res.json()

  return { post }
}

export default Post
```

Note that in order for this to work we're using the first argument of `getInitialProps`, which is `context`, which has a query field that is simply the query string section of the URL parsed as an object. In that example we're just using `promo_id` but we could also use `entity` and `seo_text` if needed.

General Requirements
---

Before doing anything we have to make sure that [Node.js](https://nodejs.org) is installed. We can check that by executing `$ node -v`. If it's not installed, we can download and install it on Ubuntu as follows:

```console
$ sudo apt-get install curl python-software-properties
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install nodejs
```

Once we have Node installed we can use `npm` to install the rest of the required packages. We'll need to use the `--save` modifier to make the changes impact on the current project:

```console
$ npm install --save react react-dom next express isomorphic-unfetch
```

Optional packages like `reactstrap` can be installed the same way.

Solution
---

In order to run the example you can clone this repository to run it in your local environment:

```console
$ git clone https://github.com/tomasBustamante/awesome-travel-agency.git
$ cd awesome-travel-agency
```

Then follow the instructions mentioned before in order to install Node and the necessary packages from the project's root directory:

```console
awesome-travel-agency$ npm install --save react react-dom next express isomorphic-unfetch
```

Finally run the app in your local environment with the following command:

```console
awesome-travel-agency$ npm run dev
```

This will let you access the blog in the URL: https://localhost:3000.
