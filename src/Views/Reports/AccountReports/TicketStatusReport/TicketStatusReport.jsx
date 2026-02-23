import { useQuery } from "@tanstack/react-query";
import useApi from "../../../../Hooks/useApi";
import Loading from "../../../../Utils/Components/Loading";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Doughnut, Bar } from "react-chartjs-2";
import { backgroundColors, borderColors } from "../../../../Utils/Functions/chart";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const TicketStatusChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.status_label),
        datasets: [
            {
                label: 'Total Tickets',
                data: data.map(item => item.total_tickets),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 13 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                padding: 12,
                cornerRadius: 8,
            }
        },
    };

    const mobileOptions = {
        ...options,
        plugins: {
            ...options.plugins,
            legend: {
                ...options.plugins.legend,
                position: 'bottom'
            }
        }
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-header border-bottom-0">
                <h3 className="card-title text-muted fw-bold">Ticket Status Distribution</h3>
            </div>
            <div className="card-body">
                <div className="d-none d-md-block" style={{ position: 'relative', height: '350px', width: '100%' }}>
                    <Doughnut data={chartData} options={options} />
                </div>
                <div className="d-md-none" style={{ position: 'relative', height: '300px', width: '100%' }}>
                    <Doughnut data={chartData} options={mobileOptions} />
                </div>
            </div>
        </div>
    );
};

const TicketStatusReport = () => {
    const api = useApi();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["ticketStatusReport"],
        queryFn: api.fetchTicketStatusReport,
    });

    const reportData = data?.data || [];
    const totalTickets = reportData.reduce((acc, item) => acc + Number(item.total_tickets), 0);

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
                <div className="col-sm-6 col-lg-3">
                    <div className="card card-sm shadow-sm border-0 bg-primary-lt">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <span className="bg-primary text-white avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-ticket" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 5l0 2" /><path d="M15 11l0 2" /><path d="M15 17l0 2" /><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" /></svg>
                                    </span>
                                </div>
                                <div className="col">
                                    <div className="fw-bold text-uppercase text-muted small">Total Tickets</div>
                                    <div className="h2 mb-0 text-primary">{totalTickets}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {reportData.map((item, index) => (
                    <div className="col-sm-6 col-lg-3" key={index}>
                        <div className={`card card-sm shadow-sm border-0 bg-${item.status_label === 'Resolved' ? 'success' : item.status_label === 'Declined' ? 'danger' : 'warning'}-lt`}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span className={`bg-${item.status_label === 'Resolved' ? 'success' : item.status_label === 'Declined' ? 'danger' : 'warning'} text-white avatar`}>
                                            {item.status_label === 'Resolved' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                                            ) : item.status_label === 'Declined' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1l1 3h1" /></svg>
                                            )}
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="fw-bold text-uppercase text-muted small">{item.status_label}</div>
                                        <div className={`h2 mb-0 text-${item.status_label === 'Resolved' ? 'success' : item.status_label === 'Declined' ? 'danger' : 'warning'}`}>{item.total_tickets}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4 mb-4">
                <div className="col-lg-6">
                    <TicketStatusChart data={reportData} />
                </div>
                <div className="col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header border-bottom-0">
                            <h3 className="card-title text-muted fw-bold">Status Breakdown</h3>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-vcenter table-striped table-hover card-table">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="fw-bold">Status</th>
                                            <th className="text-center fw-bold">Count</th>
                                            <th className="text-end fw-bold">Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isError ? (
                                            <tr>
                                                <td colSpan="3" className="text-center text-danger p-3">Error loading data</td>
                                            </tr>
                                        ) : reportData.length > 0 ? (
                                            reportData.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-3">
                                                        <span className={`badge bg-${item.status_label === 'Resolved' ? 'success' : item.status_label === 'Declined' ? 'danger' : 'warning'}-lt p-2`}>
                                                            {item.status_label}
                                                        </span>
                                                    </td>
                                                    <td className="text-center fw-bold fs-3">{item.total_tickets}</td>
                                                    <td className="text-end text-muted">
                                                        {((Number(item.total_tickets) / totalTickets) * 100).toFixed(1)}%
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center p-3 text-muted">No records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketStatusReport;
