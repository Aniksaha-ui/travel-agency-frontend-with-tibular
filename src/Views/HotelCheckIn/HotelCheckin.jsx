import { useEffect, useState } from "react";
import useGoBack from "../../Hooks/useGoBack";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loading from "../../Utils/Components/Loading";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import { HOTEL_CHECKIN, TRIP_PERFORMANCE } from "../../Utils/Constants/text";
import fetchData from "../../Utils/Functions/fetchInformation";
import moment from "moment";


function HotelCheckIn() {
  const goBack = useGoBack();

  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [checkin, setCheckIn] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchPackagePerformance = async () => {
    await fetchData(
      api.fetchHotelCheckIn,
      page,
      setLastPage,
      setCheckIn,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchPackagePerformance();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }


  const handleCheckin = async(id,status)=>{
    const response = await api.markAsCheckInOrOut(id,status);
        if (response) {
          setCheckIn((prevCheckIn) =>
            prevCheckIn.map((checkIn) =>
              checkIn.hotel_booking_id === id ? { ...checkIn, status: status } : checkIn
            )
          );
          toast("Customer Checked In Successfully");
          
        }
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
                    <h3 className="card-title">{HOTEL_CHECKIN}</h3>
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
                          <th>Hotel Name</th>
                          <th>Booking Id</th>
                          <th>CheckIn Date</th>
                          <th>Checkout Date</th>
                          <th>status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkin.map((check, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{check.name}</td>
                            <td>{check.hotel_booking_id}</td>
                            <td>{moment(check.check_in_time).format("ll")}</td>
                            <td>{moment(check.check_out_time).format("ll")}</td>
                            <td>{check.status}</td>
                            <td><button
                                  onClick={() => handleCheckin(check.hotel_booking_id,"checked_in")}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Checked In"
                                  className="btn btn-sm btn-success ms-2"
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                                
                                <button
                                  onClick={() => handleCheckin(check.hotel_booking_id,"checked_out")}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Checked Out"
                                  className="btn btn-sm btn-success ms-2"
                                >
                                  <i className="fas fa-times"></i>
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

export default HotelCheckIn;
