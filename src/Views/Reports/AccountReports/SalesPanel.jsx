import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminLayout from "../../../Layout/AdminLayout";
import OverallSales from "./OverallSales/OverallSales";
import RouteWiseSales from "./RouteWiseSales/RouteWiseSales";

const SalesPanel = () => {
    const location = useLocation();

    // Determine active tab based on current URL path
    // We default to 'overall' if no specific match, but in reality the router handles this.
    // However, if we want to use ONE component 'SalesPanel' for both routes, we need to know which to show.
    // If the path includes 'route-wise-sales', show route wise. Else overall.

    const isRouteWise = location.pathname.includes('route-wise-sales');
    const [activeTab, setActiveTab] = useState(isRouteWise ? 'route' : 'overall');

    useEffect(() => {
        setActiveTab(location.pathname.includes('route-wise-sales') ? 'route' : 'overall');
    }, [location.pathname]);

    return (
        <AdminLayout>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">Sales Analytics Panel</h2>
                                <div className="text-muted mt-1">Comprehensive view of your sales performance</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">
                        <div className="card shadow-sm mb-3">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/account/overall-sales"
                                            className={`nav-link fw-bold ${activeTab === 'overall' ? 'active' : ''}`}
                                            style={{ minWidth: '140px', justifyContent: 'center' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-pie me-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8" /><path d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a9 9 0 0 0 -1 -1v-4.5" /></svg>
                                            Overall Sales
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/account/route-wise-sales"
                                            className={`nav-link fw-bold ${activeTab === 'route' ? 'active' : ''}`}
                                            style={{ minWidth: '160px', justifyContent: 'center' }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-2 me-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" /><path d="M9 4v13" /><path d="M15 7v5.5" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" /><path d="M19 18v.01" /></svg>
                                            Route Wise Sales
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body p-0 py-3 bg-light-lt">
                                {activeTab === 'overall' && (
                                    <div className="animate__animated animate__fadeIn">
                                        <OverallSales />
                                    </div>
                                )}
                                {activeTab === 'route' && (
                                    <div className="animate__animated animate__fadeIn">
                                        <RouteWiseSales />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SalesPanel;
