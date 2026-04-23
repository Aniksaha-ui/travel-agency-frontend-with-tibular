import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";

const initialFormData = {
  name: "",
  iso_code: "",
  flag: "",
  is_popular: false,
  status: true,
};

const VisaCountryForm = ({ action }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useApi();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (action === "update" && id) {
      api.getVisaCountryById(id).then((response) => {
        if (response?.data) {
          setFormData({
            name: response.data.name ?? "",
            iso_code: response.data.iso_code ?? "",
            flag: response.data.flag ?? "",
            is_popular: Boolean(response.data.is_popular),
            status: Boolean(response.data.is_active),
          });
        }
      });
    }
  }, [action, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload =
      action === "add"
        ? {
            name: formData.name.trim(),
            iso_code: formData.iso_code.trim(),
            flag: formData.flag.trim(),
            is_popular: formData.is_popular,
            status: formData.status,
          }
        : {
            name: formData.name.trim(),
            iso_code: formData.iso_code.trim(),
          };

    const response =
      action === "add"
        ? await api.addVisaCountry(payload)
        : await api.updateVisaCountry(id, payload);

    if (response) {
      toast.success(
        `${action === "add" ? "Added" : "Updated"} visa country successfully`,
      );
      navigate("/admin/visa/countries");
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
              <div className="col-md-12">
                <form className="card" onSubmit={handleSubmit}>
                  <div className="card-header">
                    <h3 className="card-title">
                      {action === "add"
                        ? "New Visa Country Create"
                        : "Update Visa Country"}
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Country Name
                      </label>
                      <div className="col">
                        <input
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter country name"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        ISO Code
                      </label>
                      <div className="col">
                        <input
                          name="iso_code"
                          type="text"
                          value={formData.iso_code}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter ISO code"
                          required
                        />
                      </div>
                    </div>

                    {action === "add" && (
                      <>
                        <div className="mb-3 row">
                          <label className="col-3 col-form-label">
                            Flag URL
                          </label>
                          <div className="col">
                            <input
                              name="flag"
                              type="text"
                              value={formData.flag}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter flag URL"
                            />
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <label className="col-3 col-form-label">
                            Popular Country
                          </label>
                          <div className="col d-flex align-items-center">
                            <label className="form-check mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="is_popular"
                                checked={formData.is_popular}
                                onChange={handleChange}
                              />
                              <span className="form-check-label">
                                Mark as popular
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="mb-3 row">
                          <label className="col-3 col-form-label">
                            Status
                          </label>
                          <div className="col d-flex align-items-center">
                            <label className="form-check mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                              />
                              <span className="form-check-label">
                                Active
                              </span>
                            </label>
                          </div>
                        </div>
                      </>
                    )}
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

export default VisaCountryForm;
