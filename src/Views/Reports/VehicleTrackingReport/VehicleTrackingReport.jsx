import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";

const VehicleTrackingReport = () => {
  const [vehicleTrackingReport, setVehicleTrackingReport] = useState([]);
  const api = useApi();

  useEffect(() => {
    fetchVehicleTrackingReport();
  }, []);

  const fetchVehicleTrackingReport = async () => {
    const response = await api.vehicleTrackingReport();
    if (response) {
      setVehicleTrackingReport(response);
    }
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
                          <th>Trip Name</th>
                          <th>Vehicle Name</th>
                          <th>Travel Start Date</th>
                          <th>Travel End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicleTrackingReport.map((vehicle, index) => (
                          <tr key={index}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.trip_name}</td>
                            <td>{vehicle.vehicle_name}</td>
                            <td>{vehicle.travel_start_date}</td>
                            <td>{vehicle.travel_end_date}</td>
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

export default VehicleTrackingReport;
