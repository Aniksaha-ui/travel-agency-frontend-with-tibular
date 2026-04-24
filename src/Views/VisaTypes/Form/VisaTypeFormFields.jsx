import { VISA_TYPE_FORM_TEXT } from "../text";

const VisaTypeFormFields = ({ formData, countries, onChange }) => {
  return (
    <div className="card-body">
      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_TYPE_FORM_TEXT.fields.country}
        </label>
        <div className="col">
          <select
            name="country_id"
            value={formData.country_id}
            onChange={onChange}
            className="form-select"
            required
          >
            <option value="">
              {VISA_TYPE_FORM_TEXT.placeholders.selectCountry}
            </option>
            {countries.map((country) => (
              <option key={country.id} value={String(country.id)}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_TYPE_FORM_TEXT.fields.visaName}
        </label>
        <div className="col">
          <input
            name="visa_name"
            type="text"
            value={formData.visa_name}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_TYPE_FORM_TEXT.placeholders.visaName}
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_TYPE_FORM_TEXT.fields.processingDays}
        </label>
        <div className="col">
          <input
            name="processing_days"
            type="number"
            value={formData.processing_days}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_TYPE_FORM_TEXT.placeholders.processingDays}
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_TYPE_FORM_TEXT.fields.fee}
        </label>
        <div className="col">
          <input
            name="fee"
            type="number"
            step="0.01"
            value={formData.fee}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_TYPE_FORM_TEXT.placeholders.fee}
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label">
          {VISA_TYPE_FORM_TEXT.fields.description}
        </label>
        <div className="col">
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_TYPE_FORM_TEXT.placeholders.description}
            rows="3"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label">
          {VISA_TYPE_FORM_TEXT.fields.status}
        </label>
        <div className="col d-flex align-items-center">
          <label className="form-check mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={onChange}
            />
            <span className="form-check-label">
              {VISA_TYPE_FORM_TEXT.statusActive}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default VisaTypeFormFields;
