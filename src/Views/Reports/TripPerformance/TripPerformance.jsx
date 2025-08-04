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
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3 className="card-title">{TRIP_PERFORMANCE}</h3>
                    <div onClick={goBack} className="btn btn-primary">
                      Back
                    </div>
                  </div>
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#SL</th>
                          <th>Trip Name</th>
                          <th>Total Seats</th>
                          <th>Total Booked Seats</th>
                          <th>Total Available Seat</th>
                          <th>Total Income</th>
                          <th>Total Cost</th>
                          <th>Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trips.map((trip, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {trip.trip_name}(
                              {moment(trip.departure_time).format(
                                "DD MMMM, YYYY"
                              )}{" "}
                              -{" "}
                              {moment(trip.arrival_time).format(
                                "DD MMMM, YYYY"
                              )}
                              )
                            </td>
                            <td>
                              {parseInt(trip.total_seats_booked) +
                                parseInt(trip.total_seats_available)}
                            </td>
                            <td>{trip.total_seats_booked}</td>
                            <td>{trip.total_seats_available}</td>
                            <td>{trip.total_income}</td>
                            <td>{trip.total_cost}</td>
                            <td>{trip.profit}</td>
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

export default TripPerformance;
