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
