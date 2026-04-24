import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../../Hooks/useApi";
import useGoBack from "../../../Hooks/useGoBack";
import AdminLayout from "../../../Layout/AdminLayout";
import { VISA_COUNTRY_FORM_TEXT } from "../text";
import VisaCountryFormFields from "./VisaCountryFormFields";
import VisaCountryFormHeader from "./VisaCountryFormHeader";

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
  const goBack = useGoBack();
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
        action === "add"
          ? VISA_COUNTRY_FORM_TEXT.successMessage.add
          : VISA_COUNTRY_FORM_TEXT.successMessage.update,
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
                  <VisaCountryFormHeader action={action} onBack={goBack} />
                  <VisaCountryFormFields
                    action={action}
                    formData={formData}
                    onChange={handleChange}
                  />
                  <div className="card-footer text-end">
                    <button type="submit" className="btn btn-primary">
                      {VISA_COUNTRY_FORM_TEXT.submitButton}
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
