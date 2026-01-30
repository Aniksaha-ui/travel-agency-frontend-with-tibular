import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../Utils/Functions/localStorage";
import { Logout } from "../../Utils/Functions/common";
import {
  BookingManagementIcon,
  ComplaintIcon,
  DashboardIcon,
  GuideManagementIcon,
  HotelCheckInIcon,
  HotelManagementIcon,
  MoneyIcon,
  PackageManagementIcon,
  RefundManagementIcon,
  ReportManagementIcon,
  RouteManagementIcon,
  SeatManagementIcon,
  SqlMonitorIcon,
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
  ONLINE_PAYMENT_CONFIG,
  PACKAGE_MANAGEMENT,
  REFUND_MANAGEMENT,
  REPORTS_MANAGEMENT,
  ROUTE_MANAGEMENT,
  SEAT_MANAGEMENT,
  TICKET_MANAGEMENT,
  TRANSACTION_MANAGEMENT,
  TRIP_MANAGEMENT,
  USER_MANAGEMENT,
  VEHICLE_MANAGEMENT,
} from "../../Utils/Constants/text.js";
import Notification from "./Notification.jsx";
import { ROLES } from "../../Utils/Constants/common.js";

const Header = () => {
  const userInformation = getLocalStorage("user") ?? "";
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
      title: TRANSACTION_MANAGEMENT,
      path: "/admin/transactions",
      icon: <MoneyIcon />,
    },
    {
      title: TICKET_MANAGEMENT,
      path: "/admin/tickets",
      icon: <ComplaintIcon />,
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
      title: HOTEL_MANAGEMENT,
      icon: <HotelManagementIcon />,
      children: [
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
      ],
    },
    {
      title: "Settings",
      icon: <HotelManagementIcon />,
      children: [
        {
          title: ONLINE_PAYMENT_CONFIG,
          path: "/admin/online-payment-configure",
          icon: <PackageManagementIcon />,
        },

      ],
    },
    {
      title: REPORTS_MANAGEMENT,
      icon: <ReportManagementIcon />,
      children: [
        {
          title: "Vehicle - Total Seat Report",
          path: "/admin/vehiclewiseseatreport",
          icon: <VehicleManagementIcon />,
        },
        {
          title: "Account - Balance Report",
          path: "/admin/account/balance",
          icon: <MoneyIcon />,
        },
        {
          title: "Monthly Running Balance",
          path: "/admin/monthRunningBalance",
          icon: <MoneyIcon />,
        },
        {
          title: "Vehicle Tracking Report",
          path: "/admin/vehicletrackingreport",
          icon: <VehicleManagementIcon />,
        },
        {
          title: "Trip Performance Report",
          path: "/admin/tripPerformance",
          icon: <TripManagementIcon />,
        },
        {
          title: "Package Performance Report",
          path: "/admin/packagePerformance",
          icon: <PackageManagementIcon />,
        },
        {
          title: "Customer Value Report",
          path: "/admin/customerValueReport",
          icon: <MoneyIcon />,
        },
        {
          title: "Financial Report",
          path: "/admin/financialReport",
          icon: <MoneyIcon />,
        },
        {
          title: "Monitoring Query Report",
          path: "/admin/monitoring",
          icon: <SqlMonitorIcon />,
        },
        {
          title: "Package Booking Summary",
          path: "/admin/package-summary",
          icon: <PackageManagementIcon />,
        },
      ],
    },
  ]);

  const [guideMenuItems, setGuideMenuItems] = useState([
    {
      title: DASHBOARD,
      path: "/guide/myAssignPackages",
      icon: <DashboardIcon />,
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
              <Link
                className="nav-link dropdown-toggle"
                to="#navbar-extra"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                role="button"
                aria-expanded="false"
              >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  {item.icon}
                </span>
                <span className="nav-link-title">{item.title}</span>
              </Link>
              <div
                className={`dropdown-menu${index > bottomMenuItems.length - 3 ? " dropdown-menu-end" : ""
                  }`}
              >
                <div className="dropdown-menu-columns" style={{ userSelect: "none" }}>
                  <div className="dropdown-menu-column">
                    {item.children
                      .slice(0, Math.ceil(item.children.length / 2))
                      .map((child, cIndex) => (
                        <Link
                          className="dropdown-item"
                          to={child.path}
                          key={cIndex}
                        >
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                            {child.icon}
                          </span>
                          <span className="nav-link-title">{child.title}</span>
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
                          <span className="nav-link-icon d-md-none d-lg-inline-block">
                            {child.icon}
                          </span>
                          <span className="nav-link-title">{child.title}</span>
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

  const GuideSideBarMenu = () => (
    <ul className="navbar-nav">
      {guideMenuItems.map((item, index) => (
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
              {userInformation &&
                userInformation.role === ROLES[0] &&
                SidebarMenu()}
              {userInformation &&
                userInformation.role === ROLES[0] &&
                SidebarBottomMenu()}
              {userInformation &&
                userInformation.role === ROLES[1] &&
                GuideSideBarMenu()}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
