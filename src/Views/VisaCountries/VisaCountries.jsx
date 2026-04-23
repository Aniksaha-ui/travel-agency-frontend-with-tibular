import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loading from "../../Utils/Components/Loading";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import { VISA_COUNTRY_TITLE } from "../../Utils/Constants/text";
import fetchData from "../../Utils/Functions/fetchInformation";

const VisaCountries = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [visaCountries, setVisaCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const navigation = useNavigate();

  const fetchVisaCountryInformation = async () => {
    await fetchData(
      api.fetchVisaCountries,
      page,
      setLastPage,
      setVisaCountries,
      search,
      setPaginationInformation,
      setLoading,
    );
  };

  useEffect(() => {
    if (search !== "" && page !== 1) {
      setPage(1);
      return;
    }

    fetchVisaCountryInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  const handleAddNewVisaCountry = () => {
    navigation("/admin/visa/countries/add");
  };

  const handleEdit = (id) => {
    navigation(`/admin/visa/countries/update/${id}`);
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
                    <h3 className="card-title">{VISA_COUNTRY_TITLE}</h3>
                    <div
                      onClick={handleAddNewVisaCountry}
                      className="btn btn-primary"
                    >
                      Add New
                    </div>
                  </div>
                  <Search search={search} setSearch={setSearch} />
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Name</th>
                          <th>ISO Code</th>
                          <th>Nationality</th>
                          <th>Display Order</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visaCountries.map((country) => (
                          <tr key={country.id}>
                            <td>{country.id}</td>
                            <td>{country.name}</td>
                            <td>{country.iso_code}</td>
                            <td>{country.nationality_name}</td>
                            <td>{country.display_order}</td>
                            <td>
                              <span
                                className={`badge ${
                                  country.is_active
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {country.is_active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <button
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleEdit(country.id)}
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

export default VisaCountries;
