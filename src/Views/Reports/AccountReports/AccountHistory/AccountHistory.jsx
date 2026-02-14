import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "../../../../Layout/AdminLayout";
import useApi from "../../../../Hooks/useApi";
import Loading from "../../../../Utils/Components/Loading";
import AccountHistoryList from "./Partials/AccountHistoryList";

const AccountHistory = () => {
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
                        <AccountHistoryList
                            isLoading={isLoading}
                            isError={isError}
                            accountHistoryList={accountHistoryList}
                            pagination={pagination}
                            page={page}
                            setPage={setPage}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AccountHistory;
