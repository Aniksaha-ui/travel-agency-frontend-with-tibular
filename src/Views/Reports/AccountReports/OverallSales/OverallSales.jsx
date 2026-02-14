import { useQuery } from "@tanstack/react-query";
import useApi from "../../../../Hooks/useApi";
import Loading from "../../../../Utils/Components/Loading";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { backgroundColors, borderColors } from "../../../../Utils/Functions/chart";

ChartJS.register(ArcElement, Tooltip, Legend);

const OverallSalesChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.source),
        datasets: [
            {
                label: 'Total Amount',
                data: data.map(item => item.total_amount),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 20
        },
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 13
                    }
                }
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
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(context.parsed);
                        }
                        return label;
                    }
                }
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
                <h3 className="card-title text-muted fw-bold">Sales Distribution</h3>
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

const OverallSales = () => {
    const api = useApi();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["overallSalesSummary"],
        queryFn: api.fetchOverallSalesSummary,
    });

    const salesList = data?.data || [];
    const totalSales = salesList.reduce((acc, item) => acc + Number(item.total_amount), 0);

    // Find top performing source
    const topSource = salesList.length > 0
        ? salesList.reduce((prev, current) => (Number(prev.total_amount) > Number(current.total_amount)) ? prev : current)
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
                <div className="col-sm-6 col-lg-4">
                    <div className="card card-sm shadow-sm border-0 bg-primary-lt">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <span className="bg-primary text-white avatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-currency-dollar" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path><path d="M12 3v3m0 12v3"></path></svg>
                                    </span>
                                </div>
                                <div className="col">
                                    <div className="fw-bold text-uppercase text-muted small">Total Sales</div>
                                    <div className="h2 mb-0 text-primary">
                                        {totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {topSource && (
                    <div className="col-sm-6 col-lg-4">
                        <div className="card card-sm shadow-sm border-0 bg-success-lt">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span className="bg-success text-white avatar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trophy" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 21l8 0" /><path d="M12 17l0 4" /><path d="M7 4l10 0" /><path d="M17 4v8a5 5 0 0 1 -10 0v-8" /><path d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="fw-bold text-uppercase text-muted small">Top Source</div>
                                        <div className="h2 mb-0 text-success">
                                            {topSource.source}
                                        </div>
                                        <div className="text-muted small">
                                            {((Number(topSource.total_amount) / totalSales) * 100).toFixed(1)}% of total
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="row g-4 mb-4">
                {/* Chart Section */}
                <div className="col-lg-6">
                    <OverallSalesChart data={salesList} />
                </div>

                {/* List Section */}
                <div className="col-lg-6">
                    {/* Desktop Table View */}
                    <div className="card shadow-sm d-none d-md-block h-100">
                        <div className="card-header border-bottom-0">
                            <h3 className="card-title text-muted fw-bold">Detailed Breakdown</h3>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-vcenter table-striped table-hover card-table">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="fw-bold">Source</th>
                                            <th className="text-end fw-bold">Total Amount</th>
                                            <th className="text-end fw-bold" style={{ width: '100px' }}>Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isError ? (
                                            <tr>
                                                <td colSpan="3" className="text-center text-danger p-3">
                                                    Error loading data
                                                </td>
                                            </tr>
                                        ) : salesList.length > 0 ? (
                                            salesList.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="text-muted fw-medium py-3">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="badge rounded-circle" style={{ backgroundColor: backgroundColors[index % backgroundColors.length], width: '8px', height: '8px' }}></span>
                                                            {item.source}
                                                        </div>
                                                    </td>
                                                    <td className="text-end fw-bold text-dark fs-3">
                                                        {Number(item.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="text-end text-muted">
                                                        {((Number(item.total_amount) / totalSales) * 100).toFixed(1)}%
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center p-3 text-muted">
                                                    No records found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    {salesList.length > 0 && (
                                        <tfoot className="bg-light">
                                            <tr className="font-weight-bold">
                                                <td className="text-end text-uppercase text-secondary small">Total</td>
                                                <td className="text-end text-primary fs-3">
                                                    {totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="text-end text-muted">100%</td>
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
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span
                                                        className="badge p-1 rounded-circle"
                                                        style={{
                                                            backgroundColor: backgroundColors[index % backgroundColors.length],
                                                            width: '12px',
                                                            height: '12px'
                                                        }}
                                                    ></span>
                                                    <h4 className="fw-bold text-dark mb-0">{item.source}</h4>
                                                </div>
                                                <span className="badge bg-muted-lt text-muted small">
                                                    {((Number(item.total_amount) / totalSales) * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-2">
                                                <span className="text-muted small text-uppercase">Sales Amount</span>
                                                <span className="h3 mb-0 text-success font-monospace">
                                                    {Number(item.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            </div>
        </div>
    );
};

export default OverallSales;
