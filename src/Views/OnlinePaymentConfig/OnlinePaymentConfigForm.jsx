import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OnlinePaymentConfigForm = ({ action }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useApi();

  const paymentForEnum = ["trip", "package", "hotel"];
  const onlinePaymentEnum = ["No", "Yes"];

  const [formData, setFormData] = useState({
    payment_for: "",
    online_payment: "0",
  });

  // ✅ Correct useEffect dependency
  useEffect(() => {
    if (action === "update" && id) {
      const fetchConfigure = async () => {
        try {
          const res = await api.getConfigureById(id);
          setFormData({
            payment_for: res.data.payment_for,
            online_payment: res.data.online_payment,
          });
        } catch (error) {
          toast("Failed to load configuration");
        }
      };
      fetchConfigure();
    }
  }, [action, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = new FormData();

    Object.keys(formData).forEach((key) => {
      form_data.append(key, formData[key]);
    });

    // ✅ add configuration_id only on update
    if (action === "update") {
      form_data.append("configuration_id", id);
    }

    try {
      let response;

      if (action === "add") {
        response = await api.addConfigure(form_data);
        if (response) {
          toast("Configure added successfully");
        }
      } else {
        response = await api.updateConfigure(form_data);
        if (response) {
          toast("Configure updated successfully");
        }
      }

      navigate("/admin/online-payment-configure");
    } catch (error) {
      console.error(error);
      toast("Something went wrong");
    }
  };

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-md-12">
                <form className="card" onSubmit={handleSubmit}>
                  <div className="card-header">
                    <h3 className="card-title">
                      {action === "add"
                        ? "New Payment Configure Create"
                        : "Update Payment Configure"}
                    </h3>
                  </div>

                  <div className="card-body">
                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Payment For
                      </label>
                      <div className="col">
                        <select
                          value={formData.payment_for}
                          onChange={handleChange}
                          name="payment_for"
                          className="form-select"
                        >
                          <option value="">Select a type</option>
                          {paymentForEnum.map((pay_for, index) => (
                            <option key={index} value={pay_for}>
                              {pay_for}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Online Payment
                      </label>
                      <div className="col">
                        <select
                          value={formData.online_payment}
                          onChange={handleChange}
                          name="online_payment"
                          className="form-select"
                        >
                          <option value="">Select a type</option>
                          {onlinePaymentEnum.map((online, index) => (
                            <option key={index} value={index}>
                              {online}
                            </option>
                          ))}
                        </select>
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

export default OnlinePaymentConfigForm;
