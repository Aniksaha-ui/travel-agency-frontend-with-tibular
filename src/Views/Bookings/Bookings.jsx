import { useEffect, useState } from "react";
import Loading from "../../Utils/Components/Loading";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import Search from "../../Utils/Components/Search";
import fetchData from "../../Utils/Functions/fetchInformation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Bookings() {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigate = useNavigate();
  const fetchBookingInformation = async () => {
    await fetchData(
      api.fetchBookings,
      page,
      setLastPage,
      setBookings,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchBookingInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
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
                    <table className="table table-bordered mobile-card-table">
                      <thead>
                        <tr>
                          <th>Booking Id</th>
                          <th>Trip Name</th>
                          <th>Booking Type</th>
                          <th>Package Name</th>
                          <th>User Name</th>
                          <th>Payment Status</th>
                          <th>Seats</th>
                          <th>Booking Date</th>
                          <th>Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((bookings, index) => (
                          <tr key={index}>
                            <td data-label="Booking Id">{bookings.id}</td>
                            <td className="mobile-title" data-label="Trip Name">
                              {bookings.trip_name}
                            </td>
                            <td data-label="Booking Type">
                              {bookings.booking_type}
                            </td>
                            <td data-label="Package Name">
                              {bookings.package_name}
                            </td>
                            <td data-label="User Name">{bookings.username}</td>
                            <td data-label="Payment Status">{bookings.status}</td>
                            <td data-label="Seats">{bookings.seat_ids}</td>
                            <td data-label="Booking Date">
                              {bookings.created_at}
                            </td>
                            <td data-label="Invoice">
                              <Link
                                to={`/admin/bookinginvoice/${bookings.id}`}
                                className="btn btn-sm btn-success me-2"
                              >
                                Invoice
                              </Link>
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

export default Bookings;
