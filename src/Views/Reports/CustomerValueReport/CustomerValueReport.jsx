import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import moment from "moment";

const CustomerValueReport = () => {
  const [customerReports, setCustomerReports] = useState([]);
  const api = useApi();

  useEffect(() => {
    getCustomerValueReport();
  }, []);

  const getCustomerValueReport = async () => {
    const response = await api.customerValueReport();
    console.log(response.data, "response");

    setCustomerReports(response.data);
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
                <div className="card p-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomerValueReport;
