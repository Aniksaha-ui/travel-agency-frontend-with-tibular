import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../../Hooks/useApi";
import useGoBack from "../../../Hooks/useGoBack";
import AdminLayout from "../../../Layout/AdminLayout";
import { VISA_TYPE_FORM_TEXT } from "../text";
import VisaTypeFormFields from "./VisaTypeFormFields";
import VisaTypeFormHeader from "./VisaTypeFormHeader";

const initialFormData = {
  country_id: "",
  visa_name: "",
  processing_days: "",
  fee: "",
  description: "",
  status: true,
};

const VisaTypeForm = ({ action }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useApi();
  const goBack = useGoBack();
  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);

  useEffect(() => {
    // Fetch countries for dropdown first
    const fetchCountries = async () => {
      try {
        const response = await api.fetchVisaCountriesDropdown();
        if (response?.data) {
          setCountries(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Load visa type data only after countries are loaded
  useEffect(() => {
    if (action === "update" && id && !isLoadingCountries) {
      api.getVisaTypeById(id).then((response) => {
        if (response?.data) {
          setFormData({
            country_id: response.data.country_id
              ? String(response.data.country_id)
              : "",
            visa_name: response.data.visa_name || "",
            processing_days: response.data.processing_days || "",
            fee: response.data.fee || "",
            description: response.data.description || "",
            status: Boolean(response.data.status),
          });
        }
      });
    }
  }, [action, id, isLoadingCountries]);

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
      country_id: parseInt(formData.country_id),
      visa_name: formData.visa_name.trim(),
      processing_days: parseInt(formData.processing_days),
      fee: parseFloat(formData.fee),
      description: formData.description.trim(),
      status: formData.status,
    };

    const response =
      action === "add"
        ? await api.addVisaType(payload)
        : await api.updateVisaType(id, payload);

    if (response) {
      toast.success(
        action === "add"
          ? VISA_TYPE_FORM_TEXT.successMessage.add
          : VISA_TYPE_FORM_TEXT.successMessage.update,
      );
      navigate("/admin/visa/types");
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
                  <VisaTypeFormHeader action={action} onBack={goBack} />
                  <VisaTypeFormFields
                    formData={formData}
                    countries={countries}
                    onChange={handleChange}
                  />
                  <div className="card-footer text-end">
                    <button type="submit" className="btn btn-primary">
                      {VISA_TYPE_FORM_TEXT.submitButton}
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

export default VisaTypeForm;
