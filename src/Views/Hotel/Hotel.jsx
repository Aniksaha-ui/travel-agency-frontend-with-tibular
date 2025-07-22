import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";

const HotelInformation = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchHotelInformation = async () => {
    await fetchData(
      api.fetchHotelInformation,
      page,
      setLastPage,
      setHotels,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchHotelInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  const handleAddNewHotel = () => {
    navigation("/admin/hotel/add");
  };

  const handleDelete = async (id) => {
    const response = await api.deleteRoute(id);
    console.log(response);
    if (response) {
      console.log(response, "response");
      toast("Route Delete Successfully");
      fetchHotelInformation(
        api.fetchGuide,
        page,
        setLastPage,
        setHotels,
        search,
        setPaginationInformation,
        setLoading
      );
    }
  };

  const handleEdit = (id) => {
    navigation(`/admin/hotel/update/${id}`);
  };

  console.log(hotels, "hotels");

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
                    <h3 className="card-title">Hotel Information</h3>
                    <div
                      onClick={() => handleAddNewHotel()}
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Website </th>
                          <th>location</th>
                          <th>city</th>
                          <th>country</th>
                          <th>facilities</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotels.map((guide, index) => (
                          <tr key={index}>
                            <td>{guide.id}</td>
                            <td>{guide.name}</td>
                            <td>{guide.email}</td>
                            <td>{guide.Website}</td>
                            <td>{guide.location}</td>
                            <td>{guide.city}</td>
                            <td>{guide.country}</td>
                            <td>{guide.facilities}</td>
                            <td>
                              <button
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                updateTrip
                                title="Edit"
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleEdit(guide.id)}
                              >
                                <i className="fas fa-edit"></i>
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
};

export default HotelInformation;
