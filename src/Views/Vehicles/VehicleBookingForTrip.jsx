import { useParams } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import { useEffect, useState } from "react";
import fetchData from "../../Utils/Functions/fetchInformation";
import useApi from "../../Hooks/useApi";

const BusLayout = ({ data }) => {
  // Group seats by class for better organization
  const seatGroups = data.reduce((groups, seat) => {
    const key = seat.seat_class;
    if (!groups[key]) groups[key] = [];
    groups[key].push(seat);
    return groups;
  }, {});

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
                <div className="card p-4 border-3 container my-4">
                  <h3 className="text-center mb-4">Bus Layout</h3>
                  {Object.entries(seatGroups).map(([seatClass, seats]) => (
                    <div key={seatClass} className="mb-4">
                      <h5 className="text-capitalize text-primary">
                        {seatClass} Class
                      </h5>
                      <div className="row g-3">
                        {seats.map((seat) => (
                          <div key={seat.id} className="col-3">
                            <div
                              className={`card text-center ${
                                seat.is_available
                                  ? "border-success"
                                  : "border-danger"
                              }`}
                              style={{
                                backgroundColor: seat.is_available
                                  ? "#d4edda"
                                  : "#f8d7da",
                              }}
                            >
                              <div className="card-body p-2">
                                <h6 className="card-title mb-1">
                                  {seat.seat_number}
                                </h6>
                                <p className="card-text text-muted mb-0">
                                  {seat.seat_type.charAt(0).toUpperCase() +
                                    seat.seat_type.slice(1)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const VehicleBookingForTrip = () => {
  const [seatData, setSeatData] = useState([]);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetchVehicleAllSeats(id);
  }, []);
  const api = useApi();
  const fetchVehicleAllSeats = async (id) => {
    const response = await api.vehicleWiseAllSeat(id);
    setSeatData(response.data);
  };

  return <BusLayout data={seatData} />;
};

export default VehicleBookingForTrip;
