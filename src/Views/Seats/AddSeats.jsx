import { useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddSeats = () => {
  const navigate = useNavigate();
  const api = useApi();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    route_name: "",
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
                    <h3 className="card-title">New Route Form</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Origin
                      </label>
                      <div className="col">
                        <input
                          name="origin"
                          type="text"
                          value={formData.origin}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                        <small className="form-hint">
                          Enter the origin(Ex - Dhaka Region)
                        </small>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Destination
                      </label>
                      <div className="col">
                        <input
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          placeholder="Enter Destination"
                        />
                        <small className="form-hint">
                          Enter the destination (Ex - Dhaka/ Chittagong)
                        </small>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Route Name
                      </label>
                      <div className="col">
                        <input
                          value={formData.route_name}
                          onChange={handleChange}
                          name="route_name"
                          type="text"
                          className="form-control"
                          placeholder="Enter Route Name"
                        />
                        <small className="form-hint">
                          Enter Route Name(Dhaka- Cox's Bazer)
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
