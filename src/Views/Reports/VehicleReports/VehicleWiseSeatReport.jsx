import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../Utils/Functions/fetchInformation";
import Loading from "../../../Utils/Components/Loading";
import AdminLayout from "../../../Layout/AdminLayout";
import Search from "../../../Utils/Components/Search";
import { PaginationFooter } from "../../../Utils/Components/PaginationFooter";

function VehicleWiseSeatReport() {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigate = useNavigate();
  const fetchRouteInformation = async () => {
    await fetchData(
      api.vehicleWiseSeatReport,
      page,
      setLastPage,
      setRoutes,
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

  const handleNavigation = (vehicleId) => {
    navigate(`/admin/vehicleSeatLayout/${vehicleId}`);
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
                          <th>Vehicle Name</th>
                          <th>Vehicle Type</th>
                          <th>Available Seat</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routes.map((route, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{route.vehicle_name}</td>
                            <td>
                              <span className="badge bg-success me-1" />
                              {route.vehicle_type}
                            </td>
                            <td>{route.available_seats}</td>
                            <td>
                              <button
                                data-bs-toggle="tooltip"
                                onClick={() =>
                                  handleNavigation(route.vehicle_id)
                                }
                                data-bs-placement="top"
                                title="Edit"
                                className="p-2 btn btn-sm btn-success me-2"
                              >
                                <i className="fas fa-info"></i>
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

export default VehicleWiseSeatReport;
