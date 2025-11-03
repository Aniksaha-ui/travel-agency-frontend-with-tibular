import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { getLocalStorage } from "../../Utils/Functions/localStorage";

const GuidePackageCostingForm = ({ action }) => {
  const navigate = useNavigate();
  const { packageId, costId } = useParams();
  const api = useApi();
  const userInformation = getLocalStorage("user") ?? {};

  const [formData, setFormData] = useState({
    package_id: packageId || "",
    guide_id: userInformation.id || "",
    cost_type: "",
    cost_amount: "",
    description: "",
    attachment: "",
    costing_id: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingAttachment, setExistingAttachment] = useState("");

  // ✅ Fetch existing costing data once
  useEffect(() => {
    if (action !== "update" || !costId) return;

    const fetchCostingData = async () => {
      try {
        const response = await api.getPackageCosting(costId);
        if (response?.data?.[0]) {
          const data = response.data[0];
          setFormData((prev) => ({
            ...prev,
            package_id: data.package_id || packageId,
            guide_id: data.guide_id || userInformation.id,
            cost_type: data.cost_type || "",
            cost_amount: data.cost_amount || "",
            description: data.description || "",
            costing_id: costId,
            attachment: "",
          }));
          setExistingAttachment(data.attachment || "");
        }
      } catch (err) {
        toast.error("Failed to fetch costing data.");
      }
    };

    fetchCostingData();
    // ✅ Only run once for costId changes
  }, [action, costId, packageId]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || "";
    setFormData((prev) => ({ ...prev, attachment: file }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedData = { ...formData, costing_id: costId || formData.costing_id };
      const form_data = new FormData();

      Object.entries(updatedData).forEach(([key, value]) =>
        form_data.append(key, value)
      );

      let response;
      if (action === "add") {
        response = await api.addPackageCostingByPackage(form_data);
        if (response) toast.success("Guide costing added successfully!");
      } else {
        response = await api.updatePackageCostingByPackage(form_data);
        if (response) toast.success("Guide costing updated successfully!");
      }

      navigate(`/guide/my-packageCosting/${packageId}`);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">
                  {action === "add" ? "Add New Cost" : "Update Cost"}
                </h2>
              </div>
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
                      {action === "add" ? "New Cost Entry" : "Edit Cost Entry"}
                    </h3>
                  </div>

                  <div className="card-body">
                    {/* Cost Type */}
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Cost Type
                      </label>
                      <div className="col">
                        <input
                          name="cost_type"
                          type="text"
                          value={formData.cost_type}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter cost type"
                          required
                        />
                      </div>
                    </div>

                    {/* Cost Amount */}
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Cost Amount
                      </label>
                      <div className="col">
                        <input
                          name="cost_amount"
                          type="number"
                          min="0"
                          step="any"
                          value={formData.cost_amount}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter cost amount"
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label">
                        Description
                      </label>
                      <div className="col">
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="form-control"
                          rows="3"
                          placeholder="Enter description"
                        ></textarea>
                      </div>
                    </div>

                    {/* Attachment */}
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label">Attachment</label>
                      <div className="col">
                        <input
                          name="attachment"
                          type="file"
                          accept=".png,.jpg,.jpeg"
                          onChange={handleFileChange}
                          className="form-control"
                        />
                        {existingAttachment && action === "update" && (
                          <div className="mt-2">
                            <small>Current File:</small>
                            <div>
                              <a
                                href={existingAttachment}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Attachment
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="card-footer text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : action === "add"
                        ? "Add Cost"
                        : "Update Cost"}
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

export default GuidePackageCostingForm;
