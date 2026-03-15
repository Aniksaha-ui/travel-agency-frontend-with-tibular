import { useEffect, useState } from "react";
import Loading from "../../Utils/Components/Loading";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import Search from "../../Utils/Components/Search";
import fetchData from "../../Utils/Functions/fetchInformation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { status, TRIP_ACTIVE } from "../../Utils/Constants/common";
import moment from "moment";

function Trips() {
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
      api.fetchTrips,
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

  const handleAddNewTour = () => {
    navigation("/admin/trips/add");
  };

  const handleEdit = (id) => {
    navigation(`/admin/trips/update/${id}`);
  };

  const handleDelete = async (id) => {
    const response = await api.deleteRoute(id);
    if (response) {
      toast("Route Delete Successfully");
      fetchRouteInformation(
        api.fetchGuide,
        page,
        setLastPage,
        setTrips,
        search,
        setPaginationInformation,
        setLoading
      );
    }
  };

  const handleDetails = (id) => {
    navigation(`/admin/trips/${id}`);
  };

  const handleCompleted = async (id) => {
    const response = await api.markAsCompleted(id);
    if (response) {
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === id ? { ...trip, is_active: 0 } : trip
        )
      );
      toast("Trip Marked as Completed Successfully");
    }
  };


  const handleUsers = (id) => {
    navigation(`/admin/trips/users/${id}`);
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
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3 className="card-title">Trip List</h3>
                    <div
                      onClick={() => handleAddNewTour()}
                      className="btn btn-primary"
                    >
                      Add New
                    </div>
                  </div>
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Trip Name</th>
                          <th>Route Name</th>
                          <th>Vehicle Name</th>
                          <th>Departure Date</th>
                          <th>Arrival Date</th>
                          <th>Price</th>
                          <th>status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trips.map((trip, index) => (
                          <tr key={index}>
                            <td>{trip.id}</td>
                            <td>{trip.trip_name}</td>
                            <td>{trip.route_name}</td>
                            <td>{trip.vehicle_name}</td>
                            <td>
                              <span className="badge bg-success me-1" />
                              {moment(trip.departure_time).format(
                                "DD MMMM YYYY"
                              )}
                            </td>
                            <td>
                              {moment(trip.arrival_time).format("DD MMMM YYYY")}{" "}
                            </td>
                            <td>{trip.price}</td>
                            <td>{status[trip.is_active]}</td>
                            <td>
                              {parseInt(trip.is_active) == TRIP_ACTIVE && (

                                <>
                                  <button
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Edit"
                                    className="btn btn-sm btn-success me-2"
                                    onClick={() => handleEdit(trip.id)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(trip.id)}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Delete"
                                    className="btn btn-sm btn-danger"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                  <button
                                    onClick={() => handleDetails(trip.id)}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Delete"
                                    className="btn btn-sm btn-danger ms-2"
                                  >
                                    <i className="fas fa-info"></i>
                                  </button>

                                  <button
                                    onClick={() => handleCompleted(trip.id)}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Mark as Completed"
                                    className="btn btn-sm btn-success ms-2"
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>

                                </>
                              )}
                              &nbsp;
                              &nbsp;
                              <button
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleUsers(trip.id)}
                              >
                                <i className="fas fa-user"></i>
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

export default Trips;
