import { useEffect, useState } from "react";
import Loading from "../../Utils/Components/Loading";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Search from "../../Utils/Components/Search";
import moment from "moment";

function Refunds() {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchRefundInformation = async () => {
    await fetchData(
      api.fetchRefunds,
      page,
      setLastPage,
      setRefunds,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchRefundInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  const disbrused = async (refundId) =>{
    const response = await api.refundDisbursed(refundId);
      setRefunds((prevCheckIn) =>
        prevCheckIn.map((refunds) =>
          parseInt(refunds.id) == refundId
            ? { ...refunds, status: "disbrused" }
            : refunds
        )
      );
      toast("Customer Checked In Successfully");
  }


  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col"></div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Booking Date</th>
                          <th>Trip Name</th>
                          <th>Seats</th>
                          <th>Reason For Refund</th>
                          <th>Disbursement Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {refunds.map((refund, index) => (
                          <tr key={index}>
                            <td>{refund.id}</td>
                            <td>{moment(refund.booking_date).format("DD MMMM YYYY")}</td>
                            <td>{refund.trip_name}</td>
                            <td>{refund.seat_ids}</td>
                            <td>{refund.reason}</td>
                            <td>{refund.status}</td>
                            <td>
                              <button
                                onClick={() =>
                                  disbrused(
                                    refund.id,
                                  )
                                }
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Checked In"
                                className="btn btn-sm btn-success ms-2"
                              >
                                <i className="fas fa-check"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
    </AdminLayout>
  );
}

export default Refunds;
