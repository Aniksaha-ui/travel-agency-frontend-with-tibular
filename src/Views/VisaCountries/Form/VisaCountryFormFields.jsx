import { VISA_COUNTRY_FORM_TEXT } from "../text";

const VisaCountryFormFields = ({ action, formData, onChange }) => {
  return (
    <div className="card-body">
      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_COUNTRY_FORM_TEXT.fields.countryName}
        </label>
        <div className="col">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_COUNTRY_FORM_TEXT.placeholders.countryName}
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_COUNTRY_FORM_TEXT.fields.isoCode}
        </label>
        <div className="col">
          <input
            name="iso_code"
            type="text"
            value={formData.iso_code}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_COUNTRY_FORM_TEXT.placeholders.isoCode}
            required
          />
        </div>
      </div>

      {action === "add" && (
        <>
          <div className="mb-3 row">
            <label className="col-3 col-form-label">
              {VISA_COUNTRY_FORM_TEXT.fields.flagUrl}
            </label>
            <div className="col">
              <input
                name="flag"
                type="text"
                value={formData.flag}
                onChange={onChange}
                className="form-control"
                placeholder={VISA_COUNTRY_FORM_TEXT.placeholders.flagUrl}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-3 col-form-label">
              {VISA_COUNTRY_FORM_TEXT.fields.popularCountry}
            </label>
            <div className="col d-flex align-items-center">
              <label className="form-check mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="is_popular"
                  checked={formData.is_popular}
                  onChange={onChange}
                />
                <span className="form-check-label">
                  {VISA_COUNTRY_FORM_TEXT.hints.popular}
                </span>
              </label>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-3 col-form-label">
              {VISA_COUNTRY_FORM_TEXT.fields.status}
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
                  {VISA_COUNTRY_FORM_TEXT.hints.active}
                </span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VisaCountryFormFields;
