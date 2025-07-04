import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useRoutesInformation from "../../Hooks/useRouteInformation";
import useVehicleInformation from "../../Hooks/useVehicleInformation";

const GuideForm = ({ action }) => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useRoutesInformation();
  const [vehicle, setVehicle] = useVehicleInformation();
  const { id } = useParams();
  const api = useApi();
  const [formData, setFormData] = useState({
    id: "",
    user_id: "",
    bio: "",
    phone: "",
    rating: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (action === "update") {
      const fetchTripData = async () => {
        const guideInfo = await api.getGuideById(id);
        setFormData(guideInfo.data);
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
    console.log(formData);
    const form_data = new FormData();
    Object.keys(formData).forEach((key) =>
      form_data.append(key, formData[key])
    );

    if (action === "add") {
      let response = api.addGuide(form_data);
      if (response) {
        toast("Add Guide Successfully");
        navigate("/admin/guide");
      }
    } else {
      let response = api.updateGuide(form_data);
      if (response) {
        toast("Update guide Successfully");
        navigate("/admin/guide");
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
              <div className="col"></div>
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
                    <h3 className="card-title">New Guide Create</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Guide Name
                      </label>
                      <div className="col">
                        <input
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Email
                      </label>
                      <div className="col">
                        <input
                          name="email"
                          type="text"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        phone
                      </label>
                      <div className="col">
                        <input
                          name="phone"
                          type="number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Bio Data
                      </label>
                      <div className="col">
                        <input
                          name="bio"
                          type="text"
                          value={formData.bio}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter bio"
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Rating
                      </label>
                      <div className="col">
                        <input
                          name="rating"
                          type="text"
                          value={formData.rating ?? 0}
                          onChange={handleChange}
                          className="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Enter rating"
                        />
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

export default GuideForm;
