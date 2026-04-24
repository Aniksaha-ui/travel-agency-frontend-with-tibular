import { VISA_COUNTRY_FORM_TEXT } from "../text";

const VisaCountryFormHeader = ({ action, onBack }) => {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
      <h3 className="card-title">
        {action === "add"
          ? VISA_COUNTRY_FORM_TEXT.addTitle
          : VISA_COUNTRY_FORM_TEXT.updateTitle}
      </h3>
      <button
        type="button"
        onClick={onBack}
        className="btn btn-primary d-flex align-items-center"
      >
        {VISA_COUNTRY_FORM_TEXT.backButton}
      </button>
    </div>
  );
};

export default VisaCountryFormHeader;
