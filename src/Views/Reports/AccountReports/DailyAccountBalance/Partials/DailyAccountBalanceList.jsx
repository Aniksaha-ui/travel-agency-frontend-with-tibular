import React from 'react';
import { PaginationFooter } from "../../../../../Utils/Components/PaginationFooter";

const DailyAccountBalanceList = ({ isLoading, isError, balanceList, pagination, page, setPage, totals }) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 2
    });

    const formatDate = (dateString, dateObj) => {
        if (dateObj) return dateObj.toLocaleDateString();
        return dateString;
    };

    return (
        <div className="card shadow-sm border-0 bg-transparent bg-md-white">
            <div className="card-header border-bottom-0 d-none d-md-block">
                <h3 className="card-title text-muted fw-bold">Detailed Transaction History</h3>
            </div>

            {/* Desktop Table View */}
            <div className="table-responsive d-none d-md-block">
                <table className="table table-vcenter table-striped table-hover card-table">
                    <thead className="bg-light">
                        <tr>
                            <th className="fw-bold text-muted small text-uppercase">Date</th>
                            <th className="text-center fw-bold text-muted small text-uppercase">Transactions</th>
                            <th className="text-end fw-bold text-muted small text-uppercase text-success">Credit (In)</th>
                            <th className="text-end fw-bold text-muted small text-uppercase text-danger">Debit (Out)</th>
                            <th className="text-end fw-bold text-muted small text-uppercase">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center p-3 text-muted">
                                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                                    Loading...
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan="5" className="text-center text-danger p-3">
                                    Error loading data
                                </td>
                            </tr>
                        ) : balanceList.length > 0 ? (
                            balanceList.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-muted fw-medium font-monospace small">
                                        {formatDate(item.date, item.dateObj)}
                                    </td>
                                    <td className="text-center text-muted">
                                        {item.tx_count > 0 ?
                                            <span className="badge bg-muted-lt">{item.tx_count}</span> :
                                            <span className="text-muted opacity-50">-</span>
                                        }
                                    </td>
                                    <td className="text-end text-success font-monospace">
                                        {item.total_credit > 0 ? formatter.format(item.total_credit) : '-'}
                                    </td>
                                    <td className="text-end text-danger font-monospace">
                                        {item.total_debit > 0 ? formatter.format(item.total_debit) : '-'}
                                    </td>
                                    <td className="text-end fw-bold text-dark font-monospace">
                                        {formatter.format(item.balance)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-3 text-muted">
                                    No records found for this period.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {balanceList.length > 0 && totals && (
                        <tfoot className="bg-light">
                            <tr className="font-weight-bold">
                                <td colSpan="1" className="text-end text-uppercase small text-muted">Total Summary</td>
                                <td className="text-center">{totals.tx_count}</td>
                                <td className="text-end text-success">{formatter.format(totals.total_credit)}</td>
                                <td className="text-end text-danger">{formatter.format(totals.total_debit)}</td>
                                <td className="text-end text-primary fs-3">
                                    {formatter.format(balanceList[balanceList.length - 1].balance)}
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="d-md-none">
                {isLoading ? (
                    <div className="text-center p-3 text-muted bg-white rounded">
                        <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                        Loading...
                    </div>
                ) : isError ? (
                    <div className="alert alert-danger">Error loading data</div>
                ) : balanceList.length > 0 ? (
                    <div className="d-flex flex-column gap-2">
                        {balanceList.map((item, index) => (
                            <div className="card card-sm shadow-sm border-0" key={index}>
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar text-muted" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg>
                                            <span className="fw-bold text-dark">{formatDate(item.date, item.dateObj)}</span>
                                        </div>
                                        {item.tx_count > 0 && <span className="badge bg-muted-lt">{item.tx_count} Txns</span>}
                                    </div>
                                    <div className="row g-2 mb-2 pb-2 border-bottom border-light">
                                        <div className="col-6">
                                            <div className="text-uppercase text-muted" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>Credit (In)</div>
                                            <div className={`fw-bold ${item.total_credit > 0 ? 'text-success' : 'text-muted opacity-50'}`}>
                                                {item.total_credit > 0 ? '+' + formatter.format(item.total_credit) : '-'}
                                            </div>
                                        </div>
                                        <div className="col-6 text-end">
                                            <div className="text-uppercase text-muted" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>Debit (Out)</div>
                                            <div className={`fw-bold ${item.total_debit > 0 ? 'text-danger' : 'text-muted opacity-50'}`}>
                                                {item.total_debit > 0 ? '-' + formatter.format(item.total_debit) : '-'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted small text-uppercase fw-semibold">Balance</span>
                                        <span className="h3 mb-0 text-primary font-monospace bg-primary-lt px-2 py-1 rounded">
                                            {formatter.format(item.balance)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-4 text-muted bg-white rounded">No records found.</div>
                )}
            </div>

            {/* Pagination - Shared */}
            {pagination && pagination.total > pagination.per_page && (
                <div className="card-footer d-flex align-items-center bg-white border-top-0 rounded-bottom mt-2 mt-md-0">
                    <p className="m-0 text-muted small d-none d-md-block">Showing <span>{pagination.from}</span> to <span>{pagination.to}</span> of <span>{pagination.total}</span> entries</p>
                    <div className="ms-auto w-100 w-md-auto d-flex justify-content-center justify-content-md-end">
                        <PaginationFooter
                            paginationInformation={{
                                from: pagination.from,
                                to: pagination.to,
                                total: pagination.total,
                            }}
                            lastPage={pagination.last_page}
                            page={page}
                            setPage={setPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyAccountBalanceList;
