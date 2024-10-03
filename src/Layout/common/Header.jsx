import { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img
                src="./static/logo.svg"
                width={110}
                height={32}
                alt="Tabler"
                className="navbar-brand-image"
              />
            </a>
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item d-none d-md-flex me-3">
              <div className="btn-list">
                <a
                  href="https://github.com/tabler/tabler"
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Download SVG icon from http://tabler-icons.io/i/brand-github */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                  </svg>
                  Source code
                </a>
                <a
                  href="https://github.com/sponsors/codecalm"
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Download SVG icon from http://tabler-icons.io/i/heart */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon text-pink"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                  Sponsor
                </a>
              </div>
            </div>
            <div className="d-none d-md-flex">
              <a
                href="?theme=dark"
                className="nav-link px-0 hide-theme-dark"
                title="Enable dark mode"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/moon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                </svg>
              </a>
              <a
                href="?theme=light"
                className="nav-link px-0 hide-theme-light"
                title="Enable light mode"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/sun */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                </svg>
              </a>
              <div className="nav-item dropdown d-none d-md-flex me-3">
                <a
                  href="#"
                  className="nav-link px-0"
                  data-bs-toggle="dropdown"
                  tabIndex={-1}
                  aria-label="Show notifications"
                >
                  {/* Download SVG icon from http://tabler-icons.io/i/bell */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                  </svg>
                  <span className="badge bg-red" />
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Last updates</h3>
                    </div>
                    <div className="list-group list-group-flush list-group-hoverable">
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot status-dot-animated bg-red d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 1
                            </a>
                            <div className="d-block text-muted text-truncate mt-n1">
                              Change deprecated html tags to text decoration
                              classes (#29604)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-muted"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 2
                            </a>
                            <div className="d-block text-muted text-truncate mt-n1">
                              justify-content:between ⇒
                              justify-content:space-between (#29734)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a
                              href="#"
                              className="list-group-item-actions show"
                            >
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-yellow"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 3
                            </a>
                            <div className="d-block text-muted text-truncate mt-n1">
                              Update change-version.js (#29736)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-muted"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot status-dot-animated bg-green d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 4
                            </a>
                            <div className="d-block text-muted text-truncate mt-n1">
                              Regenerate package-lock.json (#29730)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-muted"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{ backgroundImage: "url(./static/avatars/000m.jpg)" }}
                />
                <div className="d-none d-xl-block ps-2">
                  <div>Paweł Kuna</div>
                  <div className="mt-1 small text-muted">UI Designer</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="#" className="dropdown-item">
                  Status
                </a>
                <a href="./profile.html" className="dropdown-item">
                  Profile
                </a>
                <a href="#" className="dropdown-item">
                  Feedback
                </a>
                <div className="dropdown-divider" />
                <a href="./settings.html" className="dropdown-item">
                  Settings
                </a>
                <a href="./sign-in.html" className="dropdown-item">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="./">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Home</span>
                  </a>
                </li>
                <li className="nav-item active dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#navbar-base"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/package */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                        <path d="M12 12l8 -4.5" />
                        <path d="M12 12l0 9" />
                        <path d="M12 12l-8 -4.5" />
                        <path d="M16 5.25l-8 4.5" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Management</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <Link className="dropdown-item" to="/admin/users">
                          User Management
                        </Link>
                        <Link className="dropdown-item" to="/admin/routes">
                          Routes Management
                        </Link>
                    
                        <Link className="dropdown-item" to="/admin/vehicles">
                          Vehicle Management
                        </Link>
                        <Link className="dropdown-item" to="/admin/seat">
                          Seat Management
                        </Link>
             
                      </div>
                      <div className="dropdown-menu-column">
                        <a className="dropdown-item" href="./placeholder.html">
                          Placeholder
                        </a>
                        <a className="dropdown-item" href="./steps.html">
                          Steps
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./stars-rating.html">
                          Stars rating
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./tabs.html">
                          Tabs
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./form-elements.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/checkbox */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11l3 3l8 -8" />
                        <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Form elements</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#navbar-extra"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/star */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Reports</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <Link className="dropdown-item" to="/admin/vehiclewiseseatreport">
                         Vehicle - Total Seat Report
                        </Link>
                        <a
                          className="dropdown-item"
                          href="./cookie-banner.html"
                        >
                          Cookie banner
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./activity.html">
                          Activity
                        </a>
                        <a className="dropdown-item" href="./gallery.html">
                          Gallery
                        </a>
                        <a className="dropdown-item" href="./invoice.html">
                          Invoice
                        </a>
                        <a
                          className="dropdown-item"
                          href="./search-results.html"
                        >
                          Search results
                        </a>
                        <a className="dropdown-item" href="./pricing.html">
                          Pricing cards
                        </a>
                        <a
                          className="dropdown-item"
                          href="./pricing-table.html"
                        >
                          Pricing table
                        </a>
                        <a className="dropdown-item" href="./faq.html">
                          FAQ
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./users.html">
                          Users
                        </a>
                        <a className="dropdown-item" href="./license.html">
                          License
                        </a>
                      </div>
                      <div className="dropdown-menu-column">
                        <a className="dropdown-item" href="./logs.html">
                          Logs
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./music.html">
                          Music
                        </a>
                        <a className="dropdown-item" href="./photogrid.html">
                          Photogrid
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./tasks.html">
                          Tasks
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./uptime.html">
                          Uptime monitor
                        </a>
                        <a className="dropdown-item" href="./widgets.html">
                          Widgets
                        </a>
                        <a className="dropdown-item" href="./wizard.html">
                          Wizard
                        </a>
                        <a className="dropdown-item" href="./settings.html">
                          Settings
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./trial-ended.html">
                          Trial ended
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./job-listing.html">
                          Job listing
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a className="dropdown-item" href="./page-loader.html">
                          Page loader
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#navbar-layout"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/layout-2 */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                        <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Layout</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <a
                          className="dropdown-item"
                          href="./layout-horizontal.html"
                        >
                          Horizontal
                        </a>
                        <a className="dropdown-item" href="./layout-boxed.html">
                          Boxed
                          <span className="badge badge-sm bg-green-lt text-uppercase ms-auto">
                            New
                          </span>
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-vertical.html"
                        >
                          Vertical
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-vertical-transparent.html"
                        >
                          Vertical transparent
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-vertical-right.html"
                        >
                          Right vertical
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-condensed.html"
                        >
                          Condensed
                        </a>
                        <a className="dropdown-item" href="./layout-combo.html">
                          Combined
                        </a>
                      </div>
                      <div className="dropdown-menu-column">
                        <a
                          className="dropdown-item"
                          href="./layout-navbar-dark.html"
                        >
                          Navbar dark
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-navbar-sticky.html"
                        >
                          Navbar sticky
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-navbar-overlap.html"
                        >
                          Navbar overlap
                        </a>
                        <a className="dropdown-item" href="./layout-rtl.html">
                          RTL mode
                        </a>
                        <a className="dropdown-item" href="./layout-fluid.html">
                          Fluid
                        </a>
                        <a
                          className="dropdown-item"
                          href="./layout-fluid-vertical.html"
                        >
                          Fluid vertical
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./icons.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/ghost */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
                        <path d="M10 10l.01 0" />
                        <path d="M14 10l.01 0" />
                        <path d="M10 14a3.5 3.5 0 0 0 4 0" />
                      </svg>
                    </span>
                    <span className="nav-link-title">4158 icons</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#navbar-help"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/lifebuoy */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M15 15l3.35 3.35" />
                        <path d="M9 15l-3.35 3.35" />
                        <path d="M5.65 5.65l3.35 3.35" />
                        <path d="M18.35 5.65l-3.35 3.35" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Help</span>
                  </a>
                  <div className="dropdown-menu">
                    <a
                      className="dropdown-item"
                      href="https://tabler.io/docs"
                      target="_blank"
                      rel="noopener"
                    >
                      Documentation
                    </a>
                    <a className="dropdown-item" href="./changelog.html">
                      Changelog
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://github.com/tabler/tabler"
                      target="_blank"
                      rel="noopener"
                    >
                      Source code
                    </a>
                    <a
                      className="dropdown-item text-pink"
                      href="https://github.com/sponsors/codecalm"
                      target="_blank"
                      rel="noopener"
                    >
                      {/* Download SVG icon from http://tabler-icons.io/i/heart */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-inline me-1"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                      </svg>
                      Sponsor project!
                    </a>
                  </div>
                </li>
              </ul>
              <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                <form action="./" method="get" autoComplete="off" noValidate>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      {/* Download SVG icon from http://tabler-icons.io/i/search */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      defaultValue
                      className="form-control"
                      placeholder="Search…"
                      aria-label="Search in website"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
