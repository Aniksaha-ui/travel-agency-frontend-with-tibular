import React from "react";
import { GithubIcon, NotificationIcon } from "../../Utils/Constants/svg.jsx";
import {
  LOGOUT,
  PROFILE,
  SETTINGS,
  SOURCE_CODE,
} from "../../Utils/Constants/text.js";
export default function Notification({ userInformation, handleLogout }) {
  return (
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
              <GithubIcon />
              {SOURCE_CODE}
            </a>
          </div>
        </div>
        <div className="d-none d-md-flex">
          <div className="nav-item dropdown d-none d-md-flex me-3">
            <a
              href="#"
              className="nav-link px-0"
              data-bs-toggle="dropdown"
              tabIndex={-1}
              aria-label="Show notifications"
            >
              {/* Download SVG icon from http://tabler-icons.io/i/bell */}
              <NotificationIcon />
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
                          Change deprecated html tags to text decoration classes
                          (#29604)
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                        <a href="#" className="list-group-item-actions show">
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
              <div>
                {userInformation != "" ? userInformation.name : "Name not set"}
              </div>
              {/* <div>TBA</div> */}
              <div className="mt-1 small text-muted">
                {userInformation != "" ? userInformation.role : "Role not set"}
              </div>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <a href="./profile.html" className="dropdown-item">
              {PROFILE}
            </a>
            <a href="./settings.html" className="dropdown-item">
              {SETTINGS}
            </a>
            <button onClick={handleLogout} className="dropdown-item">
              {LOGOUT}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
