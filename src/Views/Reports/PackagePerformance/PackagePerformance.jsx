import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";

const PackagePerformance = () => {
  const [packages, setPackages] = useState([]);
  const api = useApi();

  useEffect(() => {
    fetchPackagePerformanceReport();
  }, []);

  const fetchPackagePerformanceReport = async () => {
    const response = await api.packagePerformanceReport();
    setPackages(response.data);
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
                          <th>Package Name</th>
                          <th>Total Bookings</th>

                          <th>Total Income</th>
                          <th>Total Cost</th>
                          <th>Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packages.map((pack, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pack.package_name}</td>
                            <td>{pack.total_bookings}</td>
                            <td>{pack.total_income}</td>
                            <td>{pack.total_expense}</td>
                            <td>{pack.net_profit}</td>
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

export default PackagePerformance;
