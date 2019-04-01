import Layout from '../components/MyLayout.js'
import Link from 'next/link'

const PostLink = props => (
  <li>
    <Link as={`/${props.entity}/${props.promo_id}/${props.seo_text}`} href={`/post?title=${props.title}&entity=${props.entity}&promo_id=${props.promo_id}&seo_text=${props.seo_text}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

function getPosts() {
  return [
    { promo_id: '1', title: 'Best hotel in Chicago for a night!', entity: 'hotels', seo_text: 'cheap-hotel-in-chicago-for-a-night' },
    { promo_id: '2', title: 'Enjoy a night of luxury in Gotham City', entity: 'hotels', seo_text: 'luxury-hotel-gotham-city' },
    { promo_id: '3', title: 'Best hotel in Gotham for a family', entity: 'hotels', seo_text: 'family-hotel-gotham' },
    { promo_id: '4', title: 'Spend a weekend with your family in Metropolis', entity: 'flights', seo_text: 'weekend-family-metropolis' },
    { promo_id: '5', title: 'Looking for a romantic escape with your partner in NYC?', entity: 'flights', seo_text: 'romantic-couple-nyc' },
    { promo_id: '6', title: 'Holidays in Miami are just around the corner', entity: 'flights', seo_text: 'holidays-in-miami' }
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
