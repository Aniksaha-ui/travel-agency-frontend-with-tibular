import { useParams } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";

const TripSummeryView = ({ tripSummery }) => {
  return (
    <div className="table-responsive mx-2 my-2">
      <table className="table table-bordered">
        <thead>
          <tr style={{ padding: "10px" }}>
            <th>Route Name</th>
            <th>Total Seat</th>
            <th>Availale Seat</th>
            <th>Booked Seat</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {tripSummery.map((trip, index) => (
            <tr key={index}>
              <td>{trip.route_name}</td>
              <td>{trip.total_seats}</td>
              <td>{trip.available_seats}</td>
              <td>{trip.booked_seats}</td>
              <td>{trip.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BusLayout = ({ data }) => {
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
                    backgroundColor:
                      seat.is_available == "1" ? "#48ce4d" : "#f55a42",
                  }}
                >
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1">{seat.seat_number}</h6>
                    <p className="card-text text-muted mb-0">
                      {seat.seat_type}
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

function TripsDetails() {
  const params = useParams();
  const { tourId } = params;
  const api = useApi();
  const [tripSummery, setTripSummery] = useState([]);
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    fetchTourDetailsInformation(tourId);
  }, []);

  const fetchTourDetailsInformation = async (tourId) => {
    const response = await api.fetchTourDetailsInformation(tourId);

    if (response) {
      await setTripSummery(response.tripSummaries);
      await setSeatLayout(response.seat_layout);
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
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3 className="card-title">Trip Summery</h3>
                  </div>
                  <TripSummeryView tripSummery={tripSummery} />
                  <BusLayout data={seatLayout} />
                  {/* search */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default TripsDetails;
