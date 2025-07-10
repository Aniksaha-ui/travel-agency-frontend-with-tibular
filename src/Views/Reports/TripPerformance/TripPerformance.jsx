import { useEffect, useState } from "react"
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import moment from "moment";

const TripPerformance = () => {
    const [trips,setTrips] = useState([]);
    const api = useApi();

    useEffect(()=>{
        fetchTripPerformanceReport();
    },[]);

    const fetchTripPerformanceReport = async () => {
        const response = await api.tripPerformanceReport();
        setTrips(response.data);
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
                <div className="card p-3">
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#SL</th>
                          <th>Trip Name</th>
                          <th>Total Seats</th>
                          <th>Total Booked Seats</th>
                          <th>Total Available Seat</th>
                          <th>Total Income</th>
                          <th>Total Cost</th>
                          <th>Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trips.map((trip, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{trip.trip_name}({moment(trip.departure_time).format("DD MMMM, YYYY")} - {moment(trip.arrival_time).format("DD MMMM, YYYY")})</td>
                            <td>{trip.total_seats_booked + trip.total_seats_available}</td>
                            <td>{trip.total_seats_booked }</td>
                            <td>{trip.total_seats_available }</td>
                            <td>{trip.total_income}</td>
                            <td>{trip.total_cost}</td>
                            <td>{trip.profit}</td>
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
    )
}

export default TripPerformance