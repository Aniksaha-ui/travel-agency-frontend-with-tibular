import { useQuery } from "@tanstack/react-query";
import useApi from "../../../Hooks/useApi";
import Loading from "../../../Utils/Components/Loading";
import AdminLayout from "../../../Layout/AdminLayout";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LowOccupancyChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.trip_name),
        datasets: [
            {
                label: 'Occupancy Rate (%)',
                data: data.map(item => item.occupancy_rate),
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: 'rgb(239, 68, 68)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `Occupancy: ${context.parsed.x}%`
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                ticks: { callback: (value) => value + '%' }
            }
        }
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-header border-bottom-0">
                <h3 className="card-title text-muted fw-bold">Occupancy Rate Analysis</h3>
            </div>
            <div className="card-body">
                <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                    <Bar data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

const LowOccupancyTripReport = () => {
    const api = useApi();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["lowOccupancyTripReport"],
        queryFn: api.fetchLowOccupancyTripReport,
    });

    const reportData = data?.data || [];

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="p-4 d-flex justify-content-center">
                    <Loading />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title text-danger">Low Occupancy Trips Analysis</h2>
                                <div className="text-muted mt-1">Identified trips with critical attendance rates (Below 20%)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">
                        {/* Summary Stats */}
                        <div className="row row-cards mb-4">
                            <div className="col-sm-6 col-lg-3">
                                <div className="card card-sm shadow-sm border-0 bg-red-lt">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-red text-white avatar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="fw-bold text-uppercase text-muted small">Target Trips</div>
                                                <div className="h2 mb-0 text-red">{reportData.length}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-lg-12">
                                <div className="card shadow-sm">
                                    <div className="card-header">
                                        <h3 className="card-title fw-bold">Detailed Trip Status</h3>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-vcenter table-striped table-hover card-table">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>Trip Name</th>
                                                        <th>Departure Date</th>
                                                        <th className="text-center">Capacity</th>
                                                        <th className="text-center">Booked</th>
                                                        <th className="text-end">Occupancy Rate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {isError ? (
                                                        <tr><td colSpan="5" className="text-center text-danger p-3">Error loading data</td></tr>
                                                    ) : reportData.length > 0 ? (
                                                        reportData.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="fw-medium text-dark">{item.trip_name}</td>
                                                                <td className="text-muted">
                                                                    {new Date(item.departure_time).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })}
                                                                </td>
                                                                <td className="text-center fs-3">{item.total_seats}</td>
                                                                <td className="text-center">
                                                                    <span className="badge bg-red-lt text-red px-2 py-1">
                                                                        {item.booked_seats}
                                                                    </span>
                                                                </td>
                                                                <td className="text-end">
                                                                    <div className="d-flex align-items-center justify-content-end gap-2">
                                                                        <div className="progress progress-xs w-50">
                                                                            <div
                                                                                className="progress-bar bg-red"
                                                                                style={{ width: `${item.occupancy_rate}%` }}
                                                                            ></div>
                                                                        </div>
                                                                        <span className="fw-bold text-red">{item.occupancy_rate}%</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr><td colSpan="5" className="text-center p-3 text-muted">No low occupancy trips identified.</td></tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <LowOccupancyChart data={reportData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LowOccupancyTripReport;
