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
import { refundDisbrusedStatus } from "../../Utils/Constants/status";
import RefundList from "./_partial/RefundList";

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

  const disbrused = async (refundId) => {
    const response = await api.refundDisbursed(refundId);
    if (response && response.status === true) {
      setRefunds((prevCheckIn) =>
        prevCheckIn.map((refunds) =>
          parseInt(refunds.id) == refundId
            ? { ...refunds, status: "disbrused" }
            : refunds
        )
      );
      toast("Customer Checked In Successfully");
    } else {
      toast(response.message);
    }
  };

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
                          <RefundList
                            key={index}
                            refund={refund}
                            disbrused={disbrused}
                          />
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
