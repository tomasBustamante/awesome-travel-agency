import Link from 'next/link'

const linkStyle = {
  padding: 15
}

const Header = () => (
  <div>
  <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <a className="navbar-brand" href="/">ATA</a>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href="/">
            <a style={linkStyle}>Home</a>
          </Link>
        </li>
        <li className="nav-item">
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
