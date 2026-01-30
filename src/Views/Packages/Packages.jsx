import { useEffect, useState } from "react";
import fetchData from "../../Utils/Functions/fetchInformation";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import AdminLayout from "../../Layout/AdminLayout";
import Search from "../../Utils/Components/Search";
import useApi from "../../Hooks/useApi";
import Loading from "../../Utils/Components/Loading";
import { Includestatus } from "../../Utils/Constants/common";
import { useNavigate } from "react-router-dom";

function Packages() {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const Navigate = useNavigate();
  const fetchPackageInformation = async () => {
    await fetchData(
      api.fetchPackages,
      page,
      setLastPage,
      setPackages,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search !== "") {
      setPage(1);
    }
    fetchPackageInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  const handleDetails = (id) => {
    Navigate(`/admin/packages/${id}`);
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
                    <h3 className="card-title">Packages</h3>
                    <button
                      className="btn btn-primary"
                      onClick={() => Navigate("/admin/packages/add")}
                    >
                      Add New Package
                    </button>
                  </div>
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered mobile-card-table">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Package Id</th>
                          <th>Package Name</th>
                          <th>Trip Name</th>
                          <th>Include Meal</th>
                          <th>Include Hotel</th>
                          <th>Include Vehicle</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packages.map((pkg, index) => (
                          <tr key={index}>
                            <td data-label="SL">{index + 1}</td>
                            <td data-label="Package Id">{pkg.id}</td>
                            <td className="mobile-title" data-label="Package Name">
                              {pkg.name}
                            </td>
                            <td data-label="Trip Name">{pkg.trip_name}</td>
                            <td data-label="Include Meal">
                              {Includestatus[pkg.includes_meal]}
                            </td>
                            <td data-label="Include Hotel">
                              {Includestatus[pkg.includes_hotel]}
                            </td>
                            <td data-label="Include Vehicle">
                              {Includestatus[pkg.includes_bus]}
                            </td>
                            <td data-label="Action">
                              <button
                                onClick={() => handleDetails(pkg.id)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Details"
                                className="btn btn-sm btn-success me-2"
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

export default Packages;
