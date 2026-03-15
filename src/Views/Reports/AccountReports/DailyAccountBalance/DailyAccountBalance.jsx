import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../../../../Layout/AdminLayout";
import useApi from "../../../../Hooks/useApi";
import Loading from "../../../../Utils/Components/Loading";
import DailyAccountBalanceList from "./Partials/DailyAccountBalanceList";
import DailyAccountBalanceChart from "./Partials/DailyAccountBalanceChart";

const DailyAccountBalance = () => {
    const api = useApi();
    const [page, setPage] = useState(1);
    const [selectedReport, setSelectedReport] = useState(null);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["monthlyDailyBalanceReport", page],
        queryFn: () => api.fetchMonthlyDailyBalanceReport(page),
        keepPreviousData: true,
    });

    const balanceList = data?.data?.data || [];
    const pagination = data?.data || {};

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Formatting helper
    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    const titleDateRange = `${formatDate(firstDay)} - ${formatDate(currentDate)}`;

    // Process Data: Fill missing dates
    const processData = () => {
        if (!balanceList.length && !isLoading) return [];

        const filledList = [];
        const dataMap = new Map(balanceList.map(item => [item.date, item]));
        let lastBalance = 0;

        // Helper to format date as YYYY-MM-DD in local time
        const toLocalISOString = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        for (let d = new Date(firstDay); d <= currentDate; d.setDate(d.getDate() + 1)) {
            const dateStr = toLocalISOString(d);

            if (dataMap.has(dateStr)) {
                const item = dataMap.get(dateStr);
                lastBalance = Number(item.balance);
                filledList.push({
                    ...item,
                    dateObj: new Date(d),
                    tx_count: Number(item.tx_count),
                    total_credit: Number(item.total_credit),
                    total_debit: Number(item.total_debit),
                    balance: Number(item.balance)
                });
            } else {
                filledList.push({
                    date: dateStr,
                    dateObj: new Date(d),
                    tx_count: 0,
                    total_credit: 0,
                    total_debit: 0,
                    balance: lastBalance
                });
            }
        }
        return filledList;
    };

    const processedList = processData();

    // Calculate Totals for Summary Cards
    const totals = processedList.reduce((acc, item) => {
        acc.tx_count += item.tx_count;
        acc.total_credit += item.total_credit;
        acc.total_debit += item.total_debit;
        return acc;
    }, { tx_count: 0, total_credit: 0, total_debit: 0 });

    // Current Balance (Ending Balance)
    const currentBalance = processedList.length > 0 ? processedList[processedList.length - 1].balance : 0;

    if (isLoading && page === 1 && !balanceList.length) {
        return (
            <AdminLayout>
                <div className="page-wrapper">
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
                                <div className="page-pretitle">Financial Overview</div>
                                <h2 className="page-title">Monthly Daily Balance</h2>
                            </div>
                            <div className="col-auto ms-auto d-print-none">
                                <div className="btn-list">
                                    <span className="d-none d-sm-inline">
                                        <div className="text-muted">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar me-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg>
                                            {titleDateRange}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">

                        {/* Summary Cards */}
                        <div className="row row-cards mb-4">
                            <div className="col-sm-6 col-lg-3">
                                <div className="card card-sm border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-primary text-white avatar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" /><path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="fw-bold text-muted small text-uppercase">Current Balance</div>
                                                <div className="h3 mb-0 text-primary">
                                                    {currentBalance.toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card card-sm border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-green text-white avatar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-up-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-10 10" /><path d="M8 7l9 0l0 9" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="fw-bold text-muted small text-uppercase">Total Credit</div>
                                                <div className="h3 mb-0 text-green">
                                                    {totals.total_credit.toLocaleString('en-US', { style: 'currency', currency: 'BDT' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card card-sm border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-red text-white avatar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-down-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7l10 10" /><path d="M17 8l0 9l-9 0" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="fw-bold text-muted small text-uppercase">Total Debit</div>
                                                <div className="h3 mb-0 text-red">
                                                    {totals.total_debit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card card-sm border-0 shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-yellow text-white avatar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-activity" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h4l3 8l4 -16l3 8h4" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="fw-bold text-muted small text-uppercase">Transactions</div>
                                                <div className="h3 mb-0 text-yellow">
                                                    {totals.tx_count}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header border-bottom-0">
                                <h3 className="card-title text-muted fw-bold">Performance Trends</h3>
                            </div>
                            <div className="card-body pt-0">
                                <DailyAccountBalanceChart data={processedList} />
                            </div>
                        </div>

                        {/* Table Section */}
                        <DailyAccountBalanceList
                            isLoading={isLoading}
                            isError={isError}
                            balanceList={processedList}
                            pagination={pagination}
                            page={page}
                            setPage={setPage}
                            totals={totals}
                        />

                        {/* History Section */}
                        <div className="card shadow-sm mt-4">
                            <div className="card-header border-bottom-0">
                                <h3 className="card-title text-muted fw-bold">History of previous month</h3>
                            </div>
                            <div className="card-body">
                                <DailyAccountBalanceReports 
                                    api={api} 
                                    setSelectedReport={setSelectedReport} 
                                />
                            </div>
                        </div>

                        {/* Modal for Report Viewing */}
                        {selectedReport && (
                            <ReportViewModal 
                                report={selectedReport} 
                                onClose={() => setSelectedReport(null)} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

// Modal Component for Viewing Report
const ReportViewModal = ({ report, onClose }) => {
    const reportUrl = `${import.meta.env.VITE_IMAGE_URL}${report.file_path}`;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content shadow-lg border-0">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title fw-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-analytics me-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 17l0 -5" /><path d="M12 17l0 -1" /><path d="M15 17l0 -3" /></svg>
                            Viewing Report: {report.report_name}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-0" style={{ height: "80vh", minHeight: "600px" }}>
                        <iframe
                            src={reportUrl}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            title={report.report_name}
                        />
                    </div>
                    <div className="modal-footer bg-light d-flex justify-content-between">
                        <a href={reportUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download me-1" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                            Open / Download
                        </a>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" style={{ zIndex: -1 }}></div>
        </div>
    );
};

// Component for Reports List
const DailyAccountBalanceReports = ({ api, setSelectedReport }) => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["monthlyDailyBalanceReports", page],
        queryFn: () => api.fetchMonthlyDailyBalanceReports(page),
    });

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-danger">Failed to load history reports.</div>;

    // Unified data extraction to handle various possible response formats
    const reports = Array.isArray(data?.data) ? data.data : (data?.data?.data || []);
    const pagination = data?.current_page ? data : (data?.data || {});

    return (
        <div className="table-responsive">
            <table className="table table-vcenter card-table table-hover">
                <thead>
                    <tr>
                        <th>Report Name</th>
                        <th>Month</th>
                        <th>Created At</th>
                        <th className="w-1">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.report_name}</td>
                                <td>{new Date(report.report_month).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</td>
                                <td>{new Date(report.created_at).toLocaleString()}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                                        onClick={() => {
                                            setSelectedReport(report);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-muted py-4">No reports found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {/* Simple Pagination for Reports */}
            {pagination.last_page > 1 && (
                <div className="d-flex justify-content-center mt-3">
                    <ul className="pagination mb-0">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                        </li>
                        {[...Array(pagination.last_page).keys()].map(n => (
                            <li key={n+1} className={`page-item ${page === n + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setPage(n + 1)}>{n + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${page === pagination.last_page ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}>Next</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DailyAccountBalance;
