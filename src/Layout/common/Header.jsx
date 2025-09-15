import { Fragment, useState } from "react";
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
  LOGOUT,
  PACKAGE_MANAGEMENT,
  PROFILE,
  REFUND_MANAGEMENT,
  REPORTS_MANAGEMENT,
  ROUTE_MANAGEMENT,
  SEAT_MANAGEMENT,
  SETTINGS,
  SOURCE_CODE,
  TRIP_MANAGEMENT,
  USER_MANAGEMENT,
  VEHICLE_MANAGEMENT,
} from "../../Utils/Constants/text.js";
import Notification from "./Notification.jsx";

const Header = () => {
  const userInformation = getLocalStorage("user") ?? "";
  // console.log(userInformation);
  const navigate = useNavigate();
  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  const [menuItems, setMenuItems] = useState([
    {
      title: DASHBOARD,
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: USER_MANAGEMENT,
      path: "/admin/users",
      icon: <UserManagementIcon />,
    },
    {
      title: ROUTE_MANAGEMENT,
      path: "/admin/routes",
      icon: <RouteManagementIcon />,
    },
    {
      title: VEHICLE_MANAGEMENT,
      path: "/admin/vehicles",
      icon: <VehicleManagementIcon />,
    },
    {
      title: SEAT_MANAGEMENT,
      path: "/admin/seat",
      icon: <SeatManagementIcon />,
    },
    {
      title: TRIP_MANAGEMENT,
      path: "/admin/trips",
      icon: <TripManagementIcon />,
    },
    {
      title: PACKAGE_MANAGEMENT,
      path: "/admin/packages",
      icon: <PackageManagementIcon />,
    },
  ]);

  const [bottomMenuItems, setBottomMenuItems] = useState([
    {
      title: HOTEL_MANAGEMENT,
      path: "/admin/hotel",
      icon: <HotelManagementIcon />,
    },
    {
      title: HOTEL_CHECKIN,
      path: "/admin/hotel/checkin",
      icon: <HotelCheckInIcon />,
    },
    {
      title: GUIDE_MANAGEMENT,
      path: "/admin/guide",
      icon: <GuideManagementIcon />,
    },
    {
      title: BOOKING_MANAGEMENT,
      path: "/admin/bookings",
      icon: <BookingManagementIcon />,
    },
    {
      title: REFUND_MANAGEMENT,
      path: "/admin/refunds",
      icon: <RefundManagementIcon />,
    },
    {
      title: REPORTS_MANAGEMENT,
      icon: <ReportManagementIcon />,
      children: [
        {
          title: "Vehicle - Total Seat Report",
          path: "/admin/vehiclewiseseatreport",
        },
        { title: "Account - Balance Report", path: "/admin/account/balance" },
        {
          title: "Monthly Running Balance",
          path: "/admin/monthRunningBalance",
        },
        {
          title: "Vehicle Tracking Report",
          path: "/admin/vehicletrackingreport",
        },
        { title: "Trip Performance Report", path: "/admin/tripPerformance" },
        {
          title: "Package Performance Report",
          path: "/admin/packagePerformance",
        },
        { title: "Customer Value Report", path: "/admin/customerValueReport" },
      ],
    },
  ]);

  const SidebarMenu = () => (
    <ul className="navbar-nav">
      {menuItems.map((item, index) => (
        <li className="nav-item" key={index}>
          <Link className="nav-link" to={item.path}>
            <span className="nav-link-icon d-md-none d-lg-inline-block">
              {item.icon}
            </span>
            <span className="nav-link-title">{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const SidebarBottomMenu = () => (
    <ul className="navbar-nav">
      {bottomMenuItems.map((item, index) => (
        <li
          className={`nav-item${item.children ? " dropdown" : ""}`}
          key={index}
        >
          {item.children ? (
            <>
              <a
                className="nav-link dropdown-toggle"
                href="#navbar-extra"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  {item.icon}
                </span>
                <span className="nav-link-title">{item.title}</span>
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-menu-columns">
                  <div className="dropdown-menu-column">
                    {item.children
                      .slice(0, Math.ceil(item.children.length / 2))
                      .map((child, cIndex) => (
                        <Link
                          className="dropdown-item"
                          to={child.path}
                          key={cIndex}
                        >
                          {child.title}
                        </Link>
                      ))}
                  </div>
                  <div className="dropdown-menu-column">
                    {item.children
                      .slice(Math.ceil(item.children.length / 2))
                      .map((child, cIndex) => (
                        <Link
                          className="dropdown-item"
                          to={child.path}
                          key={cIndex}
                        >
                          {child.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link className="nav-link" to={item.path}>
              <span className="nav-link-icon d-md-none d-lg-inline-block">
                {item.icon}
              </span>
              <span className="nav-link-title">{item.title}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <Fragment>
      <header className="navbar navbar-expand-md d-print-none">
        <Notification
          userInformation={userInformation}
          handleLogout={handleLogout}
        />
      </header>
      <header className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar">
            <div className="container-xl">
              {SidebarMenu()}
              {SidebarBottomMenu()}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
