import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const OnlinePaymentConfigForm = ({ action }) => {
  const navigate = useNavigate();
 const paymentForEnum = ['trip','package','hotel']
 const onlinePaymentEnum = ['No','Yes'];
  const { id } = useParams();
  const api = useApi();
  const [formData, setFormData] = useState({
    configuration_id: "",
    payment_for: "",
    online_payment: "0",
  });

  useEffect(() => {
    if (action === "update") {
      const fetchConfigure = async () => {
        const configureInfo = await api.getConfigureById(id);
        setFormData(configureInfo.data);
      };
      fetchConfigure();
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
    const form_data = new FormData();
    
   
    Object.keys(formData).forEach((key) =>
      form_data.append(key, formData[key])
    );
 formData.append('configure_id',id); 
    if (action === "add") {
      let response = api.addConfigure(form_data);
      if (response) {
        toast("Configure added successfully");
        navigate("/admin/online-payment-configure");
      }
    } else {
      
      let response = api.updateConfigure(form_data);
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
                    <h3 className="card-title">New Payment Configure Create</h3>
                  </div>
                  <div className="card-body">
                      <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Payment Channel
                      </label>

                      <div className="col">
                        <select value={formData.payment_for} onChange={handleChange} name="payment_for" className="form-select">
                        <option value="">Select a type</option> 
                        {paymentForEnum.map((pay_for, index) => (
                                <option key={index} value={pay_for}>
                                    {pay_for}
                                </option>
                            ))}
                        </select>
                        <small className="form-hint">
                       
                        </small>
                      </div>
                      </div>


                     <div className="mb-3 row">
                      <label className="col-3 col-form-label required">
                        Payment Channel
                      </label>

                 <div className="col">
                        <select value={formData.online_payment} onChange={handleChange} name="online_payment" className="form-select">
                        <option value="">Select a type</option> 
                        {onlinePaymentEnum.map((online, index) => (
                                <option key={index} value={index}>
                                    {online}
                                </option>
                            ))}
                        </select>
                        <small className="form-hint">
                       
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

export default OnlinePaymentConfigForm;
