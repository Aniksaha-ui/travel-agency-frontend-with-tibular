import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    BookingManagementIcon,
    DashboardIcon,
    PackageManagementIcon,
    MoneyIcon,
} from "../../Utils/Constants/svg";
import "./MobileBottomNav.css";

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

const MobileBottomNav = () => {
    const location = useLocation();
    const path = location.pathname;

    // Helper to check active state
    // Exact match for dashboard to avoid highlighting on sub-routes if desired, 
    // but usually partial match is better for sections.
    const isActive = (route) => path === route || path.startsWith(route + "/");

    return (
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

            {/* Trigger the existing header menu */}
            <button
                className="nav-item-mobile border-0 bg-transparent"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-menu"
                aria-expanded="false"
                aria-controls="navbar-menu"
            >
                <MenuIcon />
                <span>More</span>
            </button>
        </div>
    );
};

export default MobileBottomNav;
