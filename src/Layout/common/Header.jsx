import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../Utils/Functions/localStorage";
import { Logout } from "../../Utils/Functions/common";

// Define menu items as arrays
const mainMenuItems = [
  {
    title: "Home",
    url: "admin/dashboard",
    svg: (
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
    ),
  },
  {
    title: "User Management",
    url: "/admin/users",
    svg: (
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
        <circle cx="9" cy="7" r="4" />
        <path d="M17 11v-1a4 4 0 0 0 -3 -3.85" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </svg>
    ),
  },
  {
    title: "Route Management",
    url: "/admin/routes",
    svg: (
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
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <path d="M6 8v8a2 2 0 0 0 2 2h8" />
        <polyline points="14 14 18 10 18 8" />
      </svg>
    ),
  },
  {
    title: "Vehicle Management",
    url: "/admin/vehicles",
    svg: (
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
        <rect x="3" y="11" width="18" height="6" rx="2" />
        <path d="M5 11l1.5 -4.5h11l1.5 4.5" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    title: "Seat Management",
    url: "/admin/seat",
    svg: (
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
        <rect x="6" y="5" width="12" height="8" rx="2" />
        <path d="M6 13v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2v-3" />
        <path d="M6 19h12" />
      </svg>
    ),
  },
  {
    title: "Trip Management",
    url: "/admin/trips",
    svg: (
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
        <circle cx="12" cy="12" r="9" />
        <path d="M12 21v-2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2" />
        <path d="M12 3a12 12 0 0 1 12 12a12 12 0 0 1 -12 12a12 12 0 0 1 -12 -12a12 12 0 0 1 12 -12" />
      </svg>
    ),
  },
  {
    title: "Package Management",
    url: "/admin/packages",
    svg: (
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
        <polyline points="12 3 20 7 20 17 12 21 4 17 4 7 12 3" />
        <line x1="12" y1="12" x2="20" y2="7" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <line x1="12" y1="12" x2="4" y2="7" />
      </svg>
    ),
  },
];

const Header = () => {
  const userInformation = getLocalStorage("user") ?? "";
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

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
            {/* User Info */}
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
                  <div>{userInformation?.name ?? "Name not set"}</div>
                  <div className="mt-1 small text-muted">
                    {userInformation?.role ?? "Role not set"}
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="./profile.html" className="dropdown-item">
                  Profile
                </a>
                <a href="./settings.html" className="dropdown-item">
                  Settings
                </a>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <ul className="navbar-nav">
                {mainMenuItems.map((item, index) => (
                  <li key={index} className="nav-item">
                    <Link className="nav-link" to={item.url}>
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {item.svg}
                      </span>
                      <span className="nav-link-title">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
