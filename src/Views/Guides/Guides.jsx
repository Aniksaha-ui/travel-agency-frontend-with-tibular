import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";

const GuideInformation = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchRouteInformation = async () => {
    await fetchData(
      api.fetchGuideInformation,
      page,
      setLastPage,
      setGuides,
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

  const handleAddNewRoute = () => {
    navigation("/admin/guide/add");
  };

  const handleDelete = async (id) => {
    const response = await api.deleteRoute(id);
    if (response) {
      toast("Route Delete Successfully");
      fetchRouteInformation(
        api.fetchGuide,
        page,
        setLastPage,
        setGuides,
        search,
        setPaginationInformation,
        setLoading
      );
    }
  };

  const handleEdit = (id) => {
    navigation(`/admin/guide/update/${id}`);
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
                    <h3 className="card-title">Guide Information</h3>
                    <div
                      onClick={() => handleAddNewRoute()}
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
                          <th>Phone </th>
                          <th>bio </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guides.map((guide, index) => (
                          <tr key={index}>
                            <td>{guide.id}</td>
                            <td>{guide.name}</td>
                            <td>{guide.email}</td>
                            <td>{guide.phone}</td>
                            <td>{guide.bio}</td>
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

export default GuideInformation;
