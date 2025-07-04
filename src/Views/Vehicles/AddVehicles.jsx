import { useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate, useRoutes } from "react-router-dom";
import { toast } from "react-toastify";
import useRoutesInformation from "../../Hooks/useRouteInformation";

const AddVehicles = () => {
    const [routes, setRoutes] = useRoutesInformation();
  const navigate = useNavigate();
  const vehicleTypeEnum = ['flight','bus','train']
  const api = useApi();
  const [formData, setFormData] = useState({
    vehicle_type: "",
    vehicle_name: "",
    total_seats: "",
    route_id: ""
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let response = api.addVehicle(formData);
    if (response) {
      toast("Add New Vehicle Successfully");
      navigate("/admin/vehicles");
    }
  }
  return (
    <AdminLayout>
      <div className="page-wrapper">
        {/* Page header */}
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">Form elements{routes.length}</h2>
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
                    <h3 className="card-title">New Vehicle Form</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Vehicle Name
                      </label>
                      <div className="col">
                        <input
                          name="vehicle_name"
                          type="text"
                          value={formData.vehicle_name}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter Vehicle Name"
                        />
                        <small className="form-hint">
                          Enter Vehicle Name(Toyta, Marcity...)
                        </small>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Vehicle Type
                      </label>
                      <div className="col">
                        <select onChange={handleChange} name="vehicle_type" className="form-select">
                        <option value="">Select a type</option> {/* Default option */}
                        {vehicleTypeEnum.map((vehicle, index) => (
                                <option key={index} value={vehicle}>
                                    {vehicle}
                                </option>
                            ))}
                        </select>
                        <small className="form-hint">
                        Enter Vehicle Type(Economic, Business...)
                        </small>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                       Total Seat
                      </label>
                      <div className="col">
                        <input
                          value={formData.total_seats}
                          onChange={handleChange}
                          name="total_seats"
                          type="text"
                          className="form-control"
                          placeholder="Enter Route Name"
                          required
                        />
                        <small className="form-hint">
                          Enter Route Name(Dhaka- Cox's Bazer)
                        </small>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                       Route
                      </label>
                      <div className="col">
                        <select onChange={handleChange} name="route_id" className="form-select">
                        <option value="">Select a route</option>
                        {routes.map((route, index) => (
                                <option key={index} value={route.id}>
                                    {route.route_name}
                                </option>
                            ))}
                        </select>
                        <small className="form-hint">
                        Enter Vehicle Type(Economic, Business...)
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
}
  


export default AddVehicles;
