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

export const MAIN_MENU_ITEMS = [
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
];

export const BOTTOM_MENU_ITEMS = [
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
];
