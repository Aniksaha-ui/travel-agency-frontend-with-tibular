import { useEffect, useState } from "react";
import Loading from "../../Utils/Components/Loading";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import Search from "../../Utils/Components/Search";
import fetchData from "../../Utils/Functions/fetchInformation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function SeatsInformation() {
  const [page, setPage] = useState(1);
  const [paginationInformation,setPaginationInformation] = useState({to:0,from:0,total: 0});
  const [lastPage, setLastPage] = useState([]);
  const [seats, setSeats] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchRouteInformation = async () => {
    await fetchData( api.fetchSeats, page,setLastPage,setSeats, search, setPaginationInformation,setLoading);
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

  const handleAddNewRoute = () =>{
    navigation("/admin/seat/add");
  }

  const handleDelete = async (id) => {
    const response = await api.deleteSeat(id);
    console.log(response);
    if (response) {
      toast("Route Delete Successfully")
      fetchRouteInformation(api.fetchRoutes, page,setLastPage,setSeats, search, setPaginationInformation,setLoading)
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
                    <h3 className="card-title">Route List</h3>
                    <div onClick={()=>handleAddNewRoute()} className="btn btn-primary">Add New</div>
                  </div>                   
                  <Search search={search} setSearch={setSearch} />   {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Vehicle Name</th>
                          <th>Seat Number</th>
                          <th>Class</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seats.map((seat, index) => (
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{seat.vehicle_name}</td>
                            <td>
                              {seat.seat_number}
                            </td>
                            <td>{seat.seat_class}</td>
                            <td>{seat.seat_type}</td>
                           <td>
                           <button data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit" className="btn btn-sm btn-success me-2">
                                <i className="fas fa-edit"></i>
                           </button>
                            <button onClick={()=>handleDelete(seat.id)} data-bs-toggle="tooltip"
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

export default SeatsInformation;
