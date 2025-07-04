import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { useParams } from "react-router-dom";
import Loading from "../../../Utils/Components/Loading";
import AdminLayout from "../../../Layout/AdminLayout";

function VehicleSeatLayout() {
  const params = useParams();
  const [seats, setSeats] = useState([]);
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const fetchVehicleAllSeat = async (id) => {
    const response = await api.vehicleWiseAllSeat(id);
    setSeats(response.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchVehicleAllSeat(id);
  }, []);

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
        <h2>Ticket {seats.length}</h2>
        <div className="page-body">
          <div className="container-xl">
            <div className="container pt-4 pb-4 card" style={{ width: "40%" }}>
              <div className="row row-cards">
                {seats.map((seat, index) => (
                  <div key={index} className="col-lg-3 col-md-3 col-6">
                    <button
                      className={`btn ${
                        seat.is_available ? "btn-success" : "btn-danger"
                      }`}
                      disabled={!seat.is_available}
                    >
                      {seat.seat_number}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default VehicleSeatLayout;
