import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import { useEffect, useState } from "react";
import fetchData from "../../Utils/Functions/fetchInformation";
import useApi from "../../Hooks/useApi";
import useTripsInformation from "../../Hooks/useTripInformation";
import { toast } from "react-toastify";

const BusLayout = ({ data }) => {
  // Group seats by class for better organization
  const seatGroups = data.reduce((groups, seat) => {
    const key = seat.seat_class;
    if (!groups[key]) groups[key] = [];
    groups[key].push(seat);
    return groups;
  }, {});

  return (
    <div className="card p-4 border-3 container my-4">
      <h3 className="text-center mb-4">Bus Layout</h3>
      {Object.entries(seatGroups).map(([seatClass, seats]) => (
        <div key={seatClass} className="mb-4">
          <h5 className="text-capitalize text-primary">{seatClass} Class</h5>
          <div className="row g-3">
            {seats.map((seat) => (
              <div key={seat.id} className="col-3">
                <div
                  className={`card text-center ${
                    seat.is_available ? "border-success" : "border-danger"
                  }`}
                  style={{
                    backgroundColor: seat.is_available ? "#d4edda" : "#f8d7da",
                  }}
                >
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1">{seat.seat_number}</h6>
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
  );
};

const VehicleBookingForTrip = () => {
  const navigate = useNavigate();
  const [seatData, setSeatData] = useState([]);
  const params = useParams();
  const { id } = params;
  const api = useApi();
  /***States ****/
  const [trips, setTrips] = useTripsInformation();
  /***States ****/

  const [formData, setFormData] = useState({
    trip_id: "",
    vehicle_id: id,
  });
  useEffect(() => {
    fetchVehicleAllSeats(id);
  }, []);
  const fetchVehicleAllSeats = async (id) => {
    const response = await api.vehicleWiseAllSeat(id);
    setSeatData(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let response = api.addVehicleBookingForTrip(formData);
    if (response) {
      toast("Vehicle Booked Successfully");
      navigate("/admin/vehicles");
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
                <form className="card p-5" onSubmit={handleSubmit}>
                  <h3 className="text-center">Booking Trip</h3>
                  <div className="col">
                    <select
                      onChange={handleChange}
                      name="trip_id"
                      className="form-select"
                    >
                      <option value="">Select a route</option>
                      {trips.map((trip, index) => (
                        <option key={index} value={trip.id}>
                          {trip.trip_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="card-footer text-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
                <BusLayout data={seatData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VehicleBookingForTrip;
