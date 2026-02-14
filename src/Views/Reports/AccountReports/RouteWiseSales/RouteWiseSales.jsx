import { useQuery } from "@tanstack/react-query";
import useApi from "../../../../Hooks/useApi";
import Loading from "../../../../Utils/Components/Loading";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { backgroundColors, borderColors } from "../../../../Utils/Functions/chart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RouteWiseSalesChart = ({ data }) => {
    // Helper to wrap long labels
    const formatLabels = (label) => {
        const words = label.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            if (currentLine.length + words[i].length < 15) {
                currentLine += ' ' + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const chartData = {
        labels: data.map(item => formatLabels(item.route_name)),
        datasets: [
            {
                label: 'Total Revenue',
                data: data.map(item => item.total_revenue),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                right: 10
            }
        },
        elements: {
            bar: {
                borderWidth: 1,
                borderRadius: 4,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                padding: 12,
                cornerRadius: 8,
                titleFont: { size: 13 },
                bodyFont: { size: 12 },
                callbacks: {
                    title: (context) => {
                        // Join wrapped lines back for tooltip
                        return Array.isArray(context[0].label) ? context[0].label.join(' ') : context[0].label;
                    },
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.x !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(context.parsed.x);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: '#f1f5f9',
                    borderDash: [4, 4],
                },
                ticks: {
                    font: { size: 10 },
                    maxRotation: 0,
                    callback: function (value) {
                        if (value >= 1000) return value / 1000 + 'k';
                        return value;
                    }
                }
            },
            y: {
                grid: { display: false },
                ticks: {
                    font: { size: 11, weight: '500' },
                    autoSkip: false,
                }
            }
        },
        barThickness: 'flex',
        maxBarThickness: 35,
    };

    // Dynamic height: Ensure enough space per bar, especially on mobile
    const containerHeight = Math.max(400, data.length * 60);

    return (
        <div className="card shadow-sm h-100">
            <div className="card-header border-bottom-0">
                <h3 className="card-title text-muted fw-bold">Revenue by Route</h3>
            </div>
            <div className="card-body pt-0 px-2 pb-2">
                <div style={{ position: 'relative', height: `${containerHeight}px`, width: '100%' }}>
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

const RouteWiseSales = () => {
    const api = useApi();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["routeWiseSalesSummary"],
        queryFn: api.fetchRouteWiseSalesSummary,
    });

    const salesList = data?.data || [];
    const totalBookings = salesList.reduce((acc, item) => acc + Number(item.total_bookings), 0);
    const totalRevenue = salesList.reduce((acc, item) => acc + Number(item.total_revenue), 0);

    // Find top performing route
    const topRoute = salesList.length > 0
        ? salesList.reduce((prev, current) => (Number(prev.total_revenue) > Number(current.total_revenue)) ? prev : current)
        : null;

    if (isLoading) {
        return (
            <div className="p-4 d-flex justify-content-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="container-xl">
            {/* Summary Cards */}
            <div className="row row-cards mb-4">
                <div className="col-sm-6 col-md-4">
                    <div className="card card-sm shadow-sm border-0 bg-blue-lt">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <span className="bg-blue text-white avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ticket" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>
                                    </span>
                                </div>
                                <div className="col">
                                    <div className="fw-bold text-uppercase text-muted small">Total Bookings</div>
                                    <div className="h2 mb-0 text-blue">{totalBookings}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="card card-sm shadow-sm border-0 bg-green-lt">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <span className="bg-green text-white avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-currency-dollar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path><path d="M12 3v3m0 12v3"></path></svg>
                                    </span>
                                </div>
                                <div className="col">
                                    <div className="fw-bold text-uppercase text-muted small">Total Revenue</div>
                                    <div className="h2 mb-0 text-green">{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {topRoute && (
                    <div className="col-sm-6 col-md-4 d-none d-md-block">
                        <div className="card card-sm shadow-sm border-0 bg-orange-lt">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span className="bg-orange text-white avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="fw-bold text-uppercase text-muted small">Top Route</div>
                                        <div className="h3 mb-0 text-orange text-truncate" title={topRoute.route_name}>{topRoute.route_name}</div>
                                        <div className="text-muted small">
                                            {((Number(topRoute.total_revenue) / totalRevenue) * 100).toFixed(0)}% of revenue
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="row justify-content-center mb-4">
                <div className="col-12">
                    <RouteWiseSalesChart data={salesList} />
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="card shadow-sm d-none d-md-block">
                <div className="card-header border-bottom-0">
                    <h3 className="card-title text-muted fw-bold">Detailed Breakdown by Route</h3>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-vcenter table-striped table-hover card-table">
                            <thead className="bg-light">
                                <tr>
                                    <th className="fw-bold">Route Name</th>
                                    <th className="text-center fw-bold">Total Bookings</th>
                                    <th className="text-end fw-bold">Total Revenue</th>
                                    <th className="text-end fw-bold">Avg. Revenue/Booking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isError ? (
                                    <tr>
                                        <td colSpan="4" className="text-center text-danger p-3">Error loading data</td>
                                    </tr>
                                ) : salesList.length > 0 ? (
                                    salesList.map((item, index) => (
                                        <tr key={index}>
                                            <td className="text-muted fw-medium py-3">{item.route_name}</td>
                                            <td className="text-center text-muted fs-3">{item.total_bookings}</td>
                                            <td className="text-end fw-bold text-dark fs-3">
                                                {Number(item.total_revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="text-end text-muted">
                                                {Number(item.total_bookings) > 0
                                                    ? (Number(item.total_revenue) / Number(item.total_bookings)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                                                    : '0'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-3 text-muted">No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                            {salesList.length > 0 && (
                                <tfoot className="bg-light">
                                    <tr className="font-weight-bold">
                                        <td className="text-end text-uppercase text-secondary small">Total</td>
                                        <td className="text-center text-dark fs-3">{totalBookings}</td>
                                        <td className="text-end text-primary fs-3">{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            </div>

            {/* Mobile Card List View */}
            <div className="d-md-none">
                {isError ? (
                    <div className="alert alert-danger">Error loading data</div>
                ) : salesList.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                        {salesList.map((item, index) => (
                            <div className="card card-sm shadow-sm border-0" key={index}>
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h4 className="fw-bold text-dark mb-0 flex-fill pe-2" style={{ fontSize: '0.95rem' }}>
                                            {item.route_name}
                                        </h4>
                                        <span className="badge bg-azure-lt text-azure small px-2 py-1">
                                            {item.total_bookings} Bkgs
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                                        <span className="text-muted small text-uppercase">Revenue</span>
                                        <span className="h3 mb-0 text-success font-monospace">
                                            {Number(item.total_revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted p-4">No records found.</div>
                )}
            </div>
        </div>
    );
};

export default RouteWiseSales;
