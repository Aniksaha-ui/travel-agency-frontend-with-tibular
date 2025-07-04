import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useRoutesInformation from "../../Hooks/useRouteInformation";
import useVehicleInformation from "../../Hooks/useVehicleInformation";

const FormTrips = ({ action }) => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useRoutesInformation();
  const [vehicle, setVehicle] = useVehicleInformation();
  const { id } = useParams();
  const api = useApi();
  const [formData, setFormData] = useState({
    vehicle_id: "",
    route_id: "",
    trip_name: "",
    departure_time: "",
    arrival_time: "",
    price: 0,
    is_active: 1,
    image: "",
  });

  useEffect(() => {
    if (action === "update") {
      const fetchTripData = async () => {
        const tripData = await api.getTripById(id);
        console.log(tripData, "trip data");
        setFormData(tripData.data);
      };
      fetchTripData();
    }
  }, [action === "update"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    Object.keys(formData).forEach((key) =>
      form_data.append(key, formData[key])
    );

    if (action === "add") {
      let response = api.addTrip(form_data);
      if (response) {
        toast("Add Trip Successfully");
        navigate("/admin/trips");
      }
    } else {
      let response = api.updateTrip(id, form_data);
      if (response) {
        toast("Update Trip Successfully");
        navigate("/admin/trips");
      }
    }
  };
  return (
    <AdminLayout>
      <div className="page-wrapper">
        {/* Page header */}
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">Form elements</h2>
              </div>
            </div>
          </div>
        </div>
        {/* Page body */}
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-md-12">
                <form className="card" onSubmit={handleSubmit}>
                  <div className="card-header">
                    <h3 className="card-title">New Trip Form</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Vehicle Name
                      </label>
                      <div className="col">
                        <select
                          value={formData.vehicle_id || ""} // Bind to the correct property
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              vehicle_id: e.target.value, // Update vehicle_id
                            })
                          }
                          name="vehicle_id"
                          className="form-select"
                        >
                          <option value="">Select a vehicle</option>{" "}
                          {/* Default option */}
                          {vehicle.map((vehicleInfo, index) => (
                            <option key={index} value={vehicleInfo.id}>
                              {vehicleInfo.vehicle_name}
                            </option>
                          ))}
                        </select>

                        <small className="form-hint">
                          Enter Vehicle Type (Economic, Business...)
                        </small>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Route
                      </label>
                      <div className="col">
                        <select
                          value={formData.route_id}
                          onChange={handleChange}
                          name="route_id"
                          className="form-select"
                        >
                          <option value="">Select Route</option>
                          {routes.map((route, index) => (
                            <option key={index} value={route.id}>
                              {route.route_name}
                            </option>
                          ))}
                        </select>
                        <small className="form-hint">
                          Choose A Option (yes/no)
                        </small>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Trip Name
                      </label>
                      <div className="col">
                        <input
                          name="trip_name"
                          type="text"
                          value={formData.trip_name}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter trip name"
                        />
                        <small className="form-hint">Enter the trip_name</small>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Image
                      </label>
                      <div className="col">
                        <input
                          name="image"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              image: e.target.files[0],
                            })
                          }
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Departure Date
                      </label>
                      <div className="col">
                        <input
                          name="departure_time"
                          type="date"
                          value={
                            formData.departure_time
                              ? new Date(formData.departure_time)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                        <small className="form-hint">
                          Enter the Departure Date
                        </small>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Arrival Date
                      </label>
                      <div className="col">
                        <input
                          name="arrival_time"
                          type="date"
                          value={
                            formData.arrival_time
                              ? new Date(formData.arrival_time)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter Arrival Date"
                        />
                        <small className="form-hint">
                          Enter the Departure Date(Ex - Dhaka Region)
                        </small>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Trip Cost
                      </label>
                      <div className="col">
                        <input
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                        <small className="form-hint">
                          Enter the trip price(Ex - 10000)
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-end">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FormTrips;
