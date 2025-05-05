import { useEffect, useState } from "react";
import Loading from "../../Utils/Components/Loading";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import Search from "../../Utils/Components/Search";
import fetchData from "../../Utils/Functions/fetchInformation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function Bookings() {
  const [page, setPage] = useState(1);
  const [paginationInformation,setPaginationInformation] = useState({to:0,from:0,total: 0});
  const [lastPage, setLastPage] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchBookingInformation = async () => {
    await fetchData( api.fetchBookings, page,setLastPage,setBookings, search, setPaginationInformation,setLoading);
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchBookingInformation();
  }, [page, search]);

  if(loading){
    return <Loading />
  }

  console.log(bookings,"bookings");
  

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
                  <Search search={search} setSearch={setSearch} />   {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Booking Id</th>
                          <th>Trip Name</th>
                          <th>Package Name</th>
                          <th>User Information</th>
                          <th>Seats</th>
                          <th>Booking type</th>
                          <th>Status</th>
                          <th>Booking Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((bookings, index) => (
                          <tr key={index}>
                            <td>{bookings.id}</td>
                            <td>{bookings.trip_name}</td>
                            <td>
                              {bookings.booking_type}
                            </td>
                            <td>{bookings.package_name}</td>
                            <td>{bookings.username}</td>
                            <td>{bookings.user}</td>
                            <td>{bookings.seat_ids}</td>
                            <td>{bookings.status}</td>
                            <td>{bookings.created_at}</td>
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

export default Bookings;
