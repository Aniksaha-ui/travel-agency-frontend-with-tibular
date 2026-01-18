import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Utils/Components/Loading";
import AdminLayout from "../../../Layout/AdminLayout";
import Search from "../../../Utils/Components/Search";
import { PaginationFooter } from "../../../Utils/Components/PaginationFooter";
import fetchData from "../../../Utils/Functions/fetchInformation";
import { TOP_CUSTOMERS } from "../../../Utils/Constants/text";

function CustomerValueReport() {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [customerReports, setCustomerReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchCustomerValueReport = async () => {
    await fetchData(
      api.customerValueReport,
      page,
      setLastPage,
      setCustomerReports,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchCustomerValueReport();
  }, [page, search]);

  if (loading) {
    return <Loading />;
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
                    <h3 className="card-title">{TOP_CUSTOMERS}</h3>
                   
                  </div>
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#SL</th>
                          <th>Customer Name</th>
                          <th>Total Trips Booking </th>
                          <th>Total Package Booking </th>
                          <th>Total Paid</th>
                          <th>Total Refunded</th>
                          <th>Total Net Amount Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerReports.map((customer, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.total_trip_bookings}</td>
                            <td>{customer.total_package_bookings}</td>
                            <td>{customer.total_paid}</td>
                            <td>{customer.total_refunded}</td>
                            <td>{customer.net_spent}</td>
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

export default CustomerValueReport;
