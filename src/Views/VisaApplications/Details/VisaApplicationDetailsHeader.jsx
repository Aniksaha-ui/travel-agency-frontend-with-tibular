import {
  VISA_APPLICATIONS_TEXT,
  formatVisaStatusLabel,
  getPaymentStatusBadgeClass,
  getVisaStatusBadgeClass,
} from "../text";

const VisaApplicationDetailsHeader = ({
  application,
  onBack,
  onPrint,
  isPrinting,
}) => {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
      <div>
        <h3 className="card-title mb-1">{application.application_no}</h3>
        <div className="d-flex flex-wrap gap-2">
          <span className={`badge ${getVisaStatusBadgeClass(application.status)}`}>
            {formatVisaStatusLabel(application.status)}
          </span>
          <span
            className={`badge ${getPaymentStatusBadgeClass(
              application.payment_status,
            )}`}
          >
            {formatVisaStatusLabel(application.payment_status)}
          </span>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-2">
        <button type="button" onClick={onBack} className="btn btn-secondary">
          {VISA_APPLICATIONS_TEXT.buttons.back}
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="btn btn-primary"
          disabled={isPrinting}
        >
          {isPrinting
            ? `${VISA_APPLICATIONS_TEXT.buttons.print}...`
            : VISA_APPLICATIONS_TEXT.buttons.print}
        </button>
      </div>
    </div>
  );
};

export default VisaApplicationDetailsHeader;
