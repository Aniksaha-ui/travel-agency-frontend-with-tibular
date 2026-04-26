import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../../Hooks/useApi";
import useGoBack from "../../../Hooks/useGoBack";
import AdminLayout from "../../../Layout/AdminLayout";
import { VISA_REQUIREMENT_FORM_TEXT } from "../text";
import VisaRequirementFormFields from "./VisaRequirementFormFields";
import VisaRequirementFormHeader from "./VisaRequirementFormHeader";

const initialFormData = {
  visa_type_id: "",
  document_name: "",
  instructions: "",
  is_required: true,
  allow_multiple: false,
  sort_order: 0,
};

const VisaRequirementForm = ({ action }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useApi();
  const goBack = useGoBack();
  const [formData, setFormData] = useState(initialFormData);
  const [visaTypes, setVisaTypes] = useState([]);

  useEffect(() => {
    const loadVisaTypes = async () => {
      const response = await api.fetchVisaTypesDropdown();
      if (response?.data) {
        setVisaTypes(response.data);
      }
    };

    loadVisaTypes();
  }, []);

  useEffect(() => {
    if (action === "update" && id) {
      api.getVisaRequirementById(id).then((response) => {
        if (response?.data) {
          setFormData({
            visa_type_id: response.data.visa_type_id
              ? String(response.data.visa_type_id)
              : "",
            document_name: response.data.document_name ?? "",
            instructions: response.data.instructions ?? "",
            is_required: Boolean(response.data.is_required),
            allow_multiple: Boolean(response.data.allow_multiple),
            sort_order: response.data.sort_order ?? 0,
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

    const payload = {
      visa_type_id: parseInt(formData.visa_type_id),
      document_name: formData.document_name.trim(),
      instructions: formData.instructions.trim(),
      is_required: formData.is_required,
      allow_multiple: formData.allow_multiple,
      sort_order: parseInt(formData.sort_order) || 0,
    };

    const response =
      action === "add"
        ? await api.addVisaRequirement(payload)
        : await api.updateVisaRequirement(id, payload);

    if (response) {
      toast.success(
        action === "add"
          ? VISA_REQUIREMENT_FORM_TEXT.successMessage.add
          : VISA_REQUIREMENT_FORM_TEXT.successMessage.update,
      );
      navigate("/admin/visa/requirements");
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
                  <VisaRequirementFormHeader action={action} onBack={goBack} />
                  <VisaRequirementFormFields
                    formData={formData}
                    visaTypes={visaTypes}
                    onChange={handleChange}
                  />
                  <div className="card-footer text-end">
                    <button type="submit" className="btn btn-primary">
                      {VISA_REQUIREMENT_FORM_TEXT.submitButton}
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

export default VisaRequirementForm;
