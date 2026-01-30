import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    BookingManagementIcon,
    DashboardIcon,
    PackageManagementIcon,
    MoneyIcon,
} from "../../Utils/Constants/svg";
import { MAIN_MENU_ITEMS, BOTTOM_MENU_ITEMS } from "./MenuConfig";
import "./MobileBottomNav.css";
import "./MoreMenu.css";

// Simple Menu Icon Component
const MenuIcon = () => (
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
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);

const MobileBottomNav = () => {
    const location = useLocation();
    const path = location.pathname;
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    // Helper to check active state
    // Exact match for dashboard to avoid highlighting on sub-routes if desired, 
    // but usually partial match is better for sections.
    const isActive = (route) => path === route || path.startsWith(route + "/");

    // Helper to flatten menu items including children
    const getAllItems = () => {
        const items = [];

        const processItem = (item) => {
            if (item.children) {
                item.children.forEach(processItem);
            } else {
                items.push(item);
            }
        };

        MAIN_MENU_ITEMS.forEach(processItem);
        BOTTOM_MENU_ITEMS.forEach(processItem);

        return items;
    };

    const allMenuItems = getAllItems();

    return (
        <>
            <div className="mobile-bottom-nav d-md-none">
                <Link
                    to="/admin/dashboard"
                    className={`nav-item-mobile ${isActive("/admin/dashboard") ? "active" : ""}`}
                >
                    <DashboardIcon />
                    <span>Home</span>
                </Link>

                <Link
                    to="/admin/packages"
                    className={`nav-item-mobile ${isActive("/admin/packages") ? "active" : ""}`}
                >
                    <PackageManagementIcon />
                    <span>Packages</span>
                </Link>

                <div className="nav-item-central">
                    <Link to="/admin/bookings" className="central-button" aria-label="Bookings">
                        <BookingManagementIcon />
                    </Link>
                </div>

                <Link
                    to="/admin/transactions"
                    className={`nav-item-mobile ${isActive("/admin/transactions") ? "active" : ""}`}
                >
                    <MoneyIcon />
                    <span>Money</span>
                </Link>

                {/* Trigger Custom Modal */}
                <button
                    className={`nav-item-mobile border-0 bg-transparent ${showMoreMenu ? "active" : ""}`}
                    type="button"
                    onClick={() => setShowMoreMenu(true)}
                >
                    <MenuIcon />
                    <span>More</span>
                </button>
            </div>

            {/* More Menu Popup Modal */}
            <div className={`more-menu-overlay ${showMoreMenu ? "visible" : ""}`} onClick={() => setShowMoreMenu(false)}>
                <div className="more-menu-container" onClick={(e) => e.stopPropagation()}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0 fw-bold">All Menu</h5>
                        <button className="more-menu-close" onClick={() => setShowMoreMenu(false)}>
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="more-menu-grid">
                        {allMenuItems.map((item, index) => (
                            <Link
                                to={item.path}
                                key={index}
                                className={`more-menu-item ${isActive(item.path) ? "active" : ""}`}
                                onClick={() => setShowMoreMenu(false)}
                            >
                                <div className="more-menu-icon">
                                    {item.icon}
                                </div>
                                <span className="more-menu-title">{item.title.replace(' Management', '')}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileBottomNav;
