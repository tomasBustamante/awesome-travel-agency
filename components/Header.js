import Link from 'next/link'

const linkStyle = {
  padding: 15
}

const Header = () => (
  <div>
  <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <a class="navbar-brand" href="/">ATA</a>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link href="/">
            <a style={linkStyle}>Home</a>
          </Link>
        </li>
        <li class="nav-item">
          <Link href="/about">
            <a style={linkStyle}>About</a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  </div>
)

export default Header
