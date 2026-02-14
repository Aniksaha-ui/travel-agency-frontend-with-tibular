import React from 'react';
import { PaginationFooter } from "../../../../../Utils/Components/PaginationFooter";

const AccountHistoryList = ({ isLoading, isError, accountHistoryList, pagination, page, setPage }) => {
    console.log("accountHistoryList", accountHistoryList);

    return (
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
                                        <div className="text-muted">Transfered to: {item.com_account_no}</div>
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
    );
};

export default AccountHistoryList;
