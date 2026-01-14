import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Utils/Components/Loading";
import AdminLayout from "../../../Layout/AdminLayout";
import Search from "../../../Utils/Components/Search";
import { PaginationFooter } from "../../../Utils/Components/PaginationFooter";
import fetchData from "../../../Utils/Functions/fetchInformation";
import moment from "moment";
import { TRIP_PERFORMANCE } from "../../../Utils/Constants/text";
import useGoBack from "../../../Hooks/useGoBack";

function TripPerformance() {
  const goBack = useGoBack();

  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchRouteInformation = async () => {
    await fetchData(
      api.tripPerformanceReport,
      page,
      setLastPage,
      setTrips,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchRouteInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title fw-bold">{TRIP_PERFORMANCE}</h2>
              </div>
              <div className="col-auto">
                <button onClick={goBack} className="btn btn-primary">
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Body */}
        <div className="page-body">
          <div className="container-xl">
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Search */}
                <div className="mb-3">
                  <Search search={search} setSearch={setSearch} />
                </div>

                {/* Table */}
                <div className="table-responsive">
                  <table className="table table-bordered table-striped align-middle">
                    <thead className="table-light">
                      <tr className="text-center">
                        <th>#</th>
                        <th>Trip Info</th>
                        <th>Seat Summary</th>
                        <th>Trip Income</th>
                        <th>Package Income</th>
                        <th>Total Cost</th>
                        <th>Trip Profit</th>
                        <th>Package Profit</th>
                      </tr>
                    </thead>

                    <tbody>
                      {trips.map((trip, index) => {
                        const totalSeats =
                          parseInt(trip.total_seats_booked_trip) +
                          parseInt(trip.total_seats_booked_package);

                        return (
                          <tr key={index}>
                            <td className="text-center fw-bold">{index + 1}</td>

                            {/* Trip Info */}
                            <td>
                              <div className="fw-semibold">
                                {trip.trip_name}
                              </div>
                              <small className="text-muted">
                                {moment(trip.departure_time).format(
                                  "DD MMM YYYY"
                                )}
                                {" → "}
                                {moment(trip.arrival_time).format(
                                  "DD MMM YYYY"
                                )}
                              </small>
                            </td>

                            {/* Seat Summary */}
                            <td>
                              <div className="mb-1">
                                <span className="badge bg-primary me-1">
                                  Total: {totalSeats}
                                </span>
                                <span className="badge bg-success me-1">
                                  Trip: {trip.total_seats_booked_trip}
                                </span>
                                <span className="badge bg-info">
                                  Package: {trip.total_seats_booked_package}
                                </span>
                                <span className="badge bg-info">
                                  Available: {trip.total_seats_available}
                                </span>
                              </div>
                            </td>

                            {/* Income & Cost */}
                            <td className="text-success fw-semibold">
                              ৳ {trip.total_income_trip}
                            </td>
                            <td className="text-success fw-semibold">
                              ৳ {trip.total_income_package}
                            </td>
                            <td className="text-danger fw-semibold">
                              ৳ {trip.total_cost}
                            </td>

                            {/* Profit */}
                            <td
                              className={
                                trip.profit_trip >= 0
                                  ? "text-success fw-bold"
                                  : "text-danger fw-bold"
                              }
                            >
                              ৳ {trip.profit_trip}
                            </td>

                            <td
                              className={
                                trip.profit_package >= 0
                                  ? "text-success fw-bold"
                                  : "text-danger fw-bold"
                              }
                            >
                              ৳ {trip.profit_package}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
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
    </AdminLayout>
  );
}

export default TripPerformance;
