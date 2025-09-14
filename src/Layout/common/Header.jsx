import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../Utils/Functions/localStorage";
import { Logout } from "../../Utils/Functions/common";
import {
  BookingManagementIcon,
  DashboardIcon,
  GithubIcon,
  GuideManagementIcon,
  HotelCheckInIcon,
  HotelManagementIcon,
  LoveIcon,
  NotificationIcon,
  PackageManagementIcon,
  RefundManagementIcon,
  ReportManagementIcon,
  RouteManagementIcon,
  SeatManagementIcon,
  SponsorIcon,
  TripManagementIcon,
  UserManagementIcon,
  VehicleManagementIcon,
} from "../../Utils/Constants/svg.jsx";
import {
  BOOKING_MANAGEMENT,
  DASHBOARD,
  GUIDE_MANAGEMENT,
  HOTEL_CHECKIN,
  HOTEL_MANAGEMENT,
  PACKAGE_MANAGEMENT,
  REFUND_MANAGEMENT,
  REPORTS_MANAGEMENT,
  ROUTE_MANAGEMENT,
  SEAT_MANAGEMENT,
  SOURCE_CODE,
  TRIP_MANAGEMENT,
  USER_MANAGEMENT,
  VEHICLE_MANAGEMENT,
} from "../../Utils/Constants/text.js";

const Header = () => {
  const userInformation = getLocalStorage("user") ?? "";
  // console.log(userInformation);
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
                  <div>
                    {userInformation != ""
                      ? userInformation.name
                      : "Name not set"}
                  </div>
                  {/* <div>TBA</div> */}
                  <div className="mt-1 small text-muted">
                    {userInformation != ""
                      ? userInformation.role
                      : "Role not set"}
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
      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <DashboardIcon />
                    </span>
                    <span className="nav-link-title">{DASHBOARD}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <UserManagementIcon />
                    </span>
                    <span className="nav-link-title">{USER_MANAGEMENT}</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/routes">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <RouteManagementIcon />
                    </span>
                    <span className="nav-link-title">{ROUTE_MANAGEMENT}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/vehicles">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <VehicleManagementIcon />
                    </span>
                    <span className="nav-link-title">{VEHICLE_MANAGEMENT}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/seat">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <SeatManagementIcon />
                    </span>
                    <span className="nav-link-title">{SEAT_MANAGEMENT}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/trips">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <TripManagementIcon />
                    </span>
                    <span className="nav-link-title">{TRIP_MANAGEMENT}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/packages">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <PackageManagementIcon />
                    </span>
                    <span className="nav-link-title">{PACKAGE_MANAGEMENT}</span>
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/hotel">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <HotelManagementIcon />
                    </span>
                    <span className="nav-link-title">{HOTEL_MANAGEMENT}</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/hotel/checkin">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <HotelCheckInIcon />
                    </span>
                    <span className="nav-link-title">{HOTEL_CHECKIN}</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/guide">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <GuideManagementIcon />
                    </span>
                    <span className="nav-link-title">{GUIDE_MANAGEMENT}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/bookings">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <BookingManagementIcon />
                    </span>
                    <span className="nav-link-title">{BOOKING_MANAGEMENT}</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/refunds">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/home */}
                      <RefundManagementIcon />
                    </span>
                    <span className="nav-link-title">{REFUND_MANAGEMENT}</span>
                  </Link>
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
                      <ReportManagementIcon />
                    </span>
                    <span className="nav-link-title">{REPORTS_MANAGEMENT}</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <Link
                          className="dropdown-item"
                          to="/admin/vehiclewiseseatreport"
                        >
                          Vehicle - Total Seat Report
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/admin/account/balance"
                        >
                          Account - Balance Report
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/admin/monthRunningBalance"
                        >
                          Monthly Running Balance
                        </Link>
                        <Link
                          className="dropdown-item"
                          to="/admin/vehicletrackingreport"
                        >
                          Vehicle Tracking Report
                        </Link>
                      </div>
                      <div className="dropdown-menu-column">
                        <Link
                          className="dropdown-item"
                          to="/admin/tripPerformance"
                        >
                          Trip Performance Report
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/admin/packagePerformance"
                        >
                          Package Performance Report
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="/admin/customerValueReport"
                        >
                          Customer Value Report
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
