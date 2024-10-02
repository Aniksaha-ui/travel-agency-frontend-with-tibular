import { useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useRoutesInformation from "../../Hooks/useRouteInformation";
import useVehicleInformation from "../../Hooks/useVehicleInformation";

const AddSeats = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useRoutesInformation();
  const [vehicle, setVehicle] = useVehicleInformation();

  const api = useApi();
  const [formData, setFormData] = useState({
    vehicle_id: "",
    seat_number: "",
    seat_class: "",
    seat_type: "",
    is_available: 0
  });
  
  const availableStatus = ['yes','no'];
  const seatClass = ['economy','business','first_class'];
  const seatType = ['window','aisle','middle'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let response = api.addRoute(formData);
    if (response) {
      toast("Add New Route Successfully");
      navigate("/admin/routes");
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
                  <h3 className="card-title">New Vehicle Form</h3>
                </div>
                <div className="card-body">
                
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label required">
                     Vehicle Name
                    </label>
                    <div className="col">
                      <select onChange={handleChange} name="vehicle_id" className="form-select">
                      {vehicle.map((vehicleInfo, index) => (
                              <option key={index} value={vehicleInfo.id}>
                                  {vehicleInfo.vehicle_name}
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
                      Seat Class
                    </label>
                    <div className="col">
                      <select onChange={handleChange} name="seat_class" className="form-select">
                      {seatClass.map((seat, index) => (
                              <option key={index} value={seat}>
                                  {seat}
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
                      Seat Type
                    </label>
                    <div className="col">
                      <select onChange={handleChange} name="seat_type" className="form-select">
                      {seatType.map((seat, index) => (
                              <option key={index} value={seat}>
                                  {seat}
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
                      Seat Number
                      </label>
                      <div className="col">
                        <input
                          name="seat_number"
                          type="text"
                          value={formData.seat_number}
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
                      Is Available? 
                    </label>
                    <div className="col">
                      <select onChange={handleChange} name="is_available" className="form-select">
                      {availableStatus.map((status, index) => (
                              <option key={index} value={index}>
                                  {status}
                              </option>
                          ))}
                      </select>
                      <small className="form-hint">
                          Choose A Option (yes/no)
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

export default AddSeats;
