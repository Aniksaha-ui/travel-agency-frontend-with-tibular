import { VISA_REQUIREMENT_FORM_TEXT } from "../text";

const VisaRequirementFormFields = ({ formData, visaTypes, onChange }) => {
  return (
    <div className="card-body">
      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_REQUIREMENT_FORM_TEXT.fields.visaType}
        </label>
        <div className="col">
          <select
            name="visa_type_id"
            value={formData.visa_type_id}
            onChange={onChange}
            className="form-select"
            required
          >
            <option value="">
              {VISA_REQUIREMENT_FORM_TEXT.placeholders.selectVisaType}
            </option>
            {visaTypes.map((visaType) => (
              <option key={visaType.id} value={String(visaType.id)}>
                {visaType.country_name
                  ? `${visaType.country_name} - ${visaType.visa_name}`
                  : visaType.visa_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label required">
          {VISA_REQUIREMENT_FORM_TEXT.fields.documentName}
        </label>
        <div className="col">
          <input
            name="document_name"
            type="text"
            value={formData.document_name}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_REQUIREMENT_FORM_TEXT.placeholders.documentName}
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label">
          {VISA_REQUIREMENT_FORM_TEXT.fields.instructions}
        </label>
        <div className="col">
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_REQUIREMENT_FORM_TEXT.placeholders.instructions}
            rows="3"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label">
          {VISA_REQUIREMENT_FORM_TEXT.fields.sortOrder}
        </label>
        <div className="col">
          <input
            name="sort_order"
            type="number"
            value={formData.sort_order}
            onChange={onChange}
            className="form-control"
            placeholder={VISA_REQUIREMENT_FORM_TEXT.placeholders.sortOrder}
            min="0"
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label">
          {VISA_REQUIREMENT_FORM_TEXT.fields.isRequired}
        </label>
        <div className="col d-flex align-items-center">
          <label className="form-check mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              name="is_required"
              checked={formData.is_required}
              onChange={onChange}
            />
            <span className="form-check-label">
              {VISA_REQUIREMENT_FORM_TEXT.hints.required}
            </span>
          </label>
        </div>
      </div>

      <div className="mb-3 row">
        <label className="col-3 col-form-label">
          {VISA_REQUIREMENT_FORM_TEXT.fields.allowMultiple}
        </label>
        <div className="col d-flex align-items-center">
          <label className="form-check mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              name="allow_multiple"
              checked={formData.allow_multiple}
              onChange={onChange}
            />
            <span className="form-check-label">
              {VISA_REQUIREMENT_FORM_TEXT.hints.allowMultiple}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default VisaRequirementFormFields;
