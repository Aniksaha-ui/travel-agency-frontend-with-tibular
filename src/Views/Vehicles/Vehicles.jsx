import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import fetchData from "../../Utils/Functions/fetchInformation";
import Loading from "../../Utils/Components/Loading";
import { toast } from "react-toastify";
import AdminLayout from "../../Layout/AdminLayout";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";




function VehicleInformation() {
  const [page, setPage] = useState(1);
  const [paginationInformation,setPaginationInformation] = useState({to:0,from:0,total: 0});
  const [lastPage, setLastPage] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchRouteInformation = async () => {
    await fetchData( api.fetchVehicle, page,setLastPage,setRoutes, search, setPaginationInformation,setLoading);
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchRouteInformation();
  }, [page, search]);

  if(loading){
    return <Loading />
  }

  const handleAddNewVehicle = () =>{
    navigation("/admin/vehicles/add");
  }

  const handleDelete = async (id) => {
    const response = await api.deleteVehicle(id);
    if (response) {
      console.log(response,"response")
      toast("Vehicles Delete Successfully")
      fetchRouteInformation(api.fetchRoutes, page,setLastPage,setRoutes, search, setPaginationInformation,setLoading)
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
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3 className="card-title">Vehicle List</h3>
                    <div onClick={()=>handleAddNewVehicle()} className="btn btn-primary">Add New</div>
                  </div>                   
                  <Search search={search} setSearch={setSearch} />   {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Vehicle Name</th>
                          <th>Vehicle Type</th>
                          <th>Route</th>
                          <th>Total Seat</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routes.map((route, index) => (
                          <tr key={index}>
                            <td>{index +1 }</td>
                            <td>{route.vehicle_name}</td>
                            <td>
                              <span className="badge bg-success me-1" />
                              {route.vehicle_type}
                            </td>
                            <td>{route.route_name}</td>
                            <td>{route.total_seats}</td>
                           <td>
                           <button data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit" className="btn btn-sm btn-success me-2">
                                <i className="fas fa-edit"></i>
                           </button>
                            <button onClick={()=>handleDelete(route.id)} data-bs-toggle="tooltip"
                               data-bs-placement="top"
                                title="Delete" className="btn btn-sm btn-danger">
                                 <i className="fas fa-trash"></i>
                            </button>
                           </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationFooter paginationInformation={paginationInformation} lastPage={lastPage} page={page} setPage={setPage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default VehicleInformation;
