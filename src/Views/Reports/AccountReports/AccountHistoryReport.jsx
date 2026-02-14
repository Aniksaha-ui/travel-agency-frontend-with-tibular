import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../../../Layout/AdminLayout";
import useApi from "../../../Hooks/useApi";
import Loading from "../../../Utils/Components/Loading";

const AccountHistoryReport = () => {
    const api = useApi();
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(1); // First day of current month
        return date.toISOString().split("T")[0];
    });
    const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);

    // React Query to fetch account history
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["accountHistory", page, startDate, endDate],
        queryFn: () =>
            api.accountHistorySearch({
                page,
                start_date: startDate,
                end_date: endDate,
            }),
        keepPreviousData: true,
    });

    const accountHistoryList = data?.data?.accountHistoryList?.data || [];
    const totalAmount = data?.data?.accountHistorySummary || 0;
    const pagination = data?.data?.accountHistoryList || {};

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        refetch();
    };

    if (isLoading && page === 1 && !accountHistoryList.length) {
        return (
            <AdminLayout>
                <Loading />
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
                                <h2 className="page-title">Account History Report</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">
                        {/* Filter Section */}
                        <div className="card mb-3">
                            <div className="card-body">
                                <form onSubmit={handleSearch}>
                                    <div className="row g-2 align-items-end">
                                        <div className="col-md-3">
                                            <label className="form-label">Start Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">End Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <button type="submit" className="btn btn-primary w-100">
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="row row-cards mb-3">
                            <div className="col-sm-6 col-lg-4">
                                <div className="card card-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-primary text-white avatar">
                                                    {/* Currency Icon */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="font-weight-medium">
                                                    Total Credited Amount
                                                </div>
                                                <div className="text-muted">
                                                    {Number(totalAmount).toLocaleString()} BDT
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table table-vcenter card-table mobile-card-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Purpose</th>
                                            <th>Gateway</th>
                                            <th>Account No</th>
                                            <th>Transaction Ref</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="text-center p-3">
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : isError ? (
                                            <tr>
                                                <td colSpan="6" className="text-center text-danger p-3">
                                                    Error loading data
                                                </td>
                                            </tr>
                                        ) : accountHistoryList.length > 0 ? (
                                            accountHistoryList.map((item, index) => (
                                                <tr key={index}>
                                                    <td data-label="Date">
                                                        {item.tran_date}
                                                    </td>
                                                    <td data-label="Purpose">
                                                        <div className="font-weight-medium">{item.purpose}</div>
                                                        <div className="text-muted text-truncate">{item.transaction_type === 'c' ? 'Credit' : 'Debit'}</div>
                                                    </td>
                                                    <td data-label="Gateway">
                                                        <span className="badge bg-secondary-lt">
                                                            {item.getaway}
                                                        </span>
                                                    </td>
                                                    <td data-label="Account No">
                                                        <div>User: {item.user_account_no}</div>
                                                        <div className="text-muted">Com: {item.com_account_no}</div>
                                                    </td>
                                                    <td data-label="Transaction Ref">
                                                        {item.transaction_reference}
                                                    </td>
                                                    <td data-label="Amount" className="text-end font-weight-bold">
                                                        {Number(item.amount).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center p-3">
                                                    No records found for selected date range.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pagination.last_page > 1 && (
                                <div className="card-footer d-flex align-items-center">
                                    <p className="m-0 text-muted">
                                        Showing <span>{pagination.from || 0}</span> to <span>{pagination.to || 0}</span> of <span>{pagination.total || 0}</span> entries
                                    </p>
                                    <ul className="pagination m-0 ms-auto">
                                        <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                disabled={pagination.current_page === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {[...Array(pagination.last_page).keys()].map(num => (
                                            <li key={num + 1} className={`page-item ${pagination.current_page === num + 1 ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => setPage(num + 1)}
                                                >
                                                    {num + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
                                                disabled={pagination.current_page === pagination.last_page}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AccountHistoryReport;
