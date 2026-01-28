import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import fetchData from "../../Utils/Functions/fetchInformation";
import AdminLayout from "../../Layout/AdminLayout";
import { TRANSACTION_MANAGEMENT } from "../../Utils/Constants/text";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import TransactionList from "./partials/TransactionList";
import TransactionViewModal from "./partials/TransactionViewModal";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const api = useApi();

  const fetchTransactionInformation = async () => {
    await fetchData(
      api.fetchTransactions,
      page,
      setLastPage,
      setTransactions,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search !== "") setPage(1);
    fetchTransactionInformation();
  }, [page, search]);

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  if (loading) {
    return <Loading />;
  }

  const totalTransactions = paginationInformation.total;
  var total = 0;
  transactions.map((transaction) => {
    return (total += Number(transaction.amount));
  });

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none py-3">
          <div className="container-xl">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">{TRANSACTION_MANAGEMENT}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header d-flex align-items-center justify-content-between bg-light">
                    <h3 className="card-title mb-0">Transaction Information</h3>
                  </div>

                  {/* Search */}
                  <div className="p-3 border-bottom">
                    <Search search={search} setSearch={setSearch} />
                  </div>

                  {/* Table */}
                  <div className="table-responsive p-3">
                    <table className="table table-hover table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th className="text-center">Transaction Date</th>
                          <th className="text-center">#Transaction Id</th>
                          <th className="text-center">#Payment Id</th>
                          <th className="text-center">#Booking Id</th>
                          <th>Transaction Ref</th>
                          <th>Purpose</th>
                          <th>Payment Methsod</th>
                          <th>Amount</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.length > 0 ? (
                          transactions.map((transaction, index) => (
                            <TransactionList
                              key={index}
                              transaction={transaction}
                              handleView={handleView}
                            />
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={6}
                              className="text-center text-muted py-3"
                            >
                              No tickets found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        {/* <tr>
                          <td className="text-center">Total (in page)</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-center">{total}</td>
                        </tr> */}
                      </tfoot>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="p-3 border-top">
                    <PaginationFooter
                      paginationInformation={paginationInformation}
                      lastPage={lastPage}
                      page={page}
                      setPage={setPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TransactionViewModal
          selectedTransaction={selectedTransaction}
          setShowModal={setShowModal}
        />
      )}
    </AdminLayout>
  );
};

export default Transactions;
