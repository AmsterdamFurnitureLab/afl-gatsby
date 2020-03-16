import React from "react"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import LanguageSwitcher from "./LanguageSwitcher"

const Layout = props => {
  const { title, children } = props;
  const [toggleNav, setToggleNav] = React.useState(false);
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            // href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <nav id="swup" className="site-head-main">
            <ul className="nav nav1" role="menu">
              <li className="nav-home" role="menuitem">
                <Link
                  to={`/`}
                  className="nav-elements"
                  activeClassName="nav-current"
                >
                  <FormattedMessage id="menu.home" />
                </Link>
              </li>
              <li className="nav-concept" role="menuitem">
                <Link
                  to={`/concept`}
                  className="nav-elements"
                  activeClassName="nav-current"
                >
                  <FormattedMessage id="menu.concept" />
                </Link>
              </li>
              <li className="nav-materialen" role="menuitem">
                <Link
                  to={`/materials`}
                  className="nav-elements"
                  activeClassName="nav-current"
                >
                  <FormattedMessage id="menu.materials" />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              {title}
            </Link>
          </div>
          <div className="site-head-main">
            <ul className="nav nav2" role="menu">
              <li className="nav-green" role="menuitem">
                <Link
                  to={`/green`}
                  className="nav-elements"
                  activeClassName="nav-current"
                >
                  <FormattedMessage id="menu.green" />
                </Link>
              </li>
              <li className="nav-contact" role="menuitem">
                <Link
                  to={`/contact`}
                  className="nav-elements"
                  activeClassName="nav-current"
                >
                  <FormattedMessage id="menu.contact" />
                </Link>
              </li>
              <li className="social-links site-head-extra" role="menuitem">
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link> &mdash;
        Built by{" "}
        <a
          href="https://parqbanq.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Parqbanq
        </a>
      </footer>
    </div>
  )
};

export default Layout
