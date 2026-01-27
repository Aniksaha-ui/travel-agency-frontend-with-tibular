import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";
import Loading from "../../Utils/Components/Loading";

const OnlinePaymentConfig = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [configure, setConfigure] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchConfigureInformation = async () => {
    await fetchData(
      api.fetchOnlinePaymentConfig,
      page,
      setLastPage,
      setConfigure,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchConfigureInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  const handleNewConfigure = () => {
    navigation("/admin/online-payment-configure/add");
  };



  const handleEdit = (id) => {
    navigation(`/admin/online-payment-configure/update/${id}`);
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
                    <h3 className="card-title">Online Payment Configure(SSLCommerz)</h3>
                    <div
                      onClick={() => handleNewConfigure()}
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
                          <th>Configure Id</th>
                          <th>Payment For</th>
                          <th>Enable</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {configure.map((config, index) => (
                          <tr key={index}>
                            <td>{config.id}</td>
                            <td>{config.payment_for}</td>
                            <td>{config.online_payment == "0" ? 'No' : 'Yes'}</td>
                           
                            <td>
                              <button
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleEdit(config.id)}
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

export default OnlinePaymentConfig;
