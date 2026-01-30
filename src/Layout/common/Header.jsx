import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../Utils/Functions/localStorage";
import { Logout } from "../../Utils/Functions/common";
import { MAIN_MENU_ITEMS, BOTTOM_MENU_ITEMS } from "./MenuConfig";
import { DashboardIcon } from "../../Utils/Constants/svg.jsx";
import { DASHBOARD } from "../../Utils/Constants/text.js";
import Notification from "./Notification.jsx";
import { ROLES } from "../../Utils/Constants/common.js";

const Header = () => {
  const userInformation = getLocalStorage("user") ?? "";
  const navigate = useNavigate();
  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  const [menuItems] = useState(MAIN_MENU_ITEMS);
  const [bottomMenuItems] = useState(BOTTOM_MENU_ITEMS);

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
