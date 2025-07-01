import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useTripsInformation from "../../Hooks/useTripInformation";
import useApi from "../../Hooks/useApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PackageAdd = () => {
  const [guideInformation, setGuideInformation] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    includes_bus: 0,
    includes_hotel: 0,
    includes_meal: 0,
    trip_id: "",
    inclusions: [""],
    exclusions: [""],
    pricing: [{ adult_price: "", child_price: "" }],
    guide_id: "",
  });
  const navigate = useNavigate();
  const [trips, setTrips] = useTripsInformation();
  const api = useApi();

  useEffect(() => {
    fetchGuideDropDown();
  }, []);

  const fetchGuideDropDown = async () => {
    const response = await api.fetchGuideDropDown();
    if (response.status === true) {
      setGuideInformation(response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleArrayChange = (type, index, value) => {
    const updated = [...formData[type]];
    updated[index] = value;
    setFormData({ ...formData, [type]: updated });
  };

  const handlePricingChange = (index, field, value) => {
    const updated = [...formData.pricing];
    updated[index][field] = value;
    setFormData({ ...formData, pricing: updated });
  };
  const addField = (type) => {
    if (type === "pricing") {
      setFormData({
        ...formData,
        pricing: [...formData.pricing, { adult_price: "", child_price: "" }],
      });
    } else {
      setFormData({ ...formData, [type]: [...formData[type], ""] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.addPackage(formData).then((response) => {
      if (response) {
        toast("Package Added Successfully");
        navigate("/admin/packages");
      }
    });
  };
  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none py-3">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col"></div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <h1 className="text-center mb-4"> Create Package</h1>
          <div className="container-xl">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <form onSubmit={handleSubmit}>
                  {/* Package Info Section */}
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-primary text-white">
                      Package Information
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label>Package Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Enter package name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label>Trip Name</label>
                        <select
                          onChange={handleChange}
                          name="trip_id"
                          className="form-select"
                        >
                          <option value={formData.trip_id}>
                            Select a route
                          </option>
                          {trips.map((trip, index) => (
                            <option key={index} value={trip.id}>
                              {trip.trip_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label>Guide Name</label>
                        <select
                          onChange={handleChange}
                          name="guide_id"
                          className="form-select"
                        >
                          <option value="">Select a guide</option>
                          {guideInformation.map((guide, index) => (
                            <option key={index} value={guide.id}>
                              {guide.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label>Image Url</label>
                        <input
                          type="text"
                          className="form-control"
                          name="image"
                          placeholder="Enter image URL"
                          value={formData.image}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          name="description"
                          placeholder="Enter package description"
                          rows="3"
                          required
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="d-flex">
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="includes_bus"
                            checked={formData.includes_bus === 1}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            Includes Bus
                          </label>
                        </div>

                        <div className="mb-3 ms-2 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="includes_hotel"
                            checked={formData.includes_hotel === 1}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            Includes Hotel
                          </label>
                        </div>

                        <div className="mb-3 ms-2 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="includes_meal"
                            checked={formData.includes_meal === 1}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">
                            Includes Meal
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions Section */}
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-success text-white">
                      Inclusions
                    </div>
                    <div className="card-body">
                      {formData.inclusions.map((item, index) => (
                        <input
                          key={index}
                          type="text"
                          className="form-control mb-2"
                          value={item}
                          onChange={(e) =>
                            handleArrayChange(
                              "inclusions",
                              index,
                              e.target.value
                            )
                          }
                          placeholder={`Inclusion ${index + 1}`}
                          required
                        />
                      ))}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={() => addField("inclusions")}
                      >
                        + Add Inclusion
                      </button>
                    </div>
                  </div>

                  {/* Exclusions Section */}
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-danger text-white">
                      Exclusions
                    </div>
                    <div className="card-body">
                      {formData.exclusions.map((item, index) => (
                        <input
                          key={index}
                          type="text"
                          className="form-control mb-2"
                          value={item}
                          onChange={(e) =>
                            handleArrayChange(
                              "exclusions",
                              index,
                              e.target.value
                            )
                          }
                          placeholder={`Exclusion ${index + 1}`}
                          required
                        />
                      ))}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => addField("exclusions")}
                      >
                        + Add Exclusion
                      </button>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-info text-white">
                      Pricing Details
                    </div>
                    <div className="card-body">
                      {formData.pricing.map((price, index) => (
                        <div className="row mb-3" key={index}>
                          <div className="col">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Adult Price"
                              value={price.adult_price}
                              onChange={(e) =>
                                handlePricingChange(
                                  index,
                                  "adult_price",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="col">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Child Price"
                              value={price.child_price}
                              onChange={(e) =>
                                handlePricingChange(
                                  index,
                                  "child_price",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info"
                        onClick={() => addField("pricing")}
                      >
                        + Add Pricing
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="text-end">
                    <button type="submit" className="btn btn-success">
                      Submit Package
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
export default PackageAdd;
