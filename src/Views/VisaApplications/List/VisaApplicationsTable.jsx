import moment from "moment";
import {
  VISA_APPLICATIONS_TEXT,
  formatVisaStatusLabel,
  getPaymentStatusBadgeClass,
  getVisaStatusBadgeClass,
} from "../text";

const VisaApplicationsTable = ({
  visaApplications,
  paginationInformation,
  onView,
}) => {
  return (
    <div className="table-responsive mx-2 mt-1">
      <table className="table table-bordered mobile-card-table">
        <thead>
          <tr>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.serial}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.applicationNo}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.applicant}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.packageTitle}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.country}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.status}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.paymentStatus}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.assignedOfficer}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.createdAt}</th>
            <th>{VISA_APPLICATIONS_TEXT.tableHeaders.action}</th>
          </tr>
        </thead>
        <tbody>
          {visaApplications.length ? (
            visaApplications.map((application, index) => (
              <tr key={application.id}>
                <td data-label={VISA_APPLICATIONS_TEXT.tableHeaders.serial}>
                  {(paginationInformation.from || 0) + index + 1}
                </td>
                <td
                  className="mobile-title"
                  data-label={VISA_APPLICATIONS_TEXT.tableHeaders.applicationNo}
                >
                  <div className="fw-semibold">{application.application_no}</div>
                  <small className="text-muted">
                    Passport: {application.passport_no}
                  </small>
                </td>
                <td data-label={VISA_APPLICATIONS_TEXT.tableHeaders.applicant}>
                  <div className="fw-semibold">{application.full_name}</div>
                  <small className="text-muted d-block">{application.email}</small>
                  <small className="text-muted">{application.phone}</small>
                </td>
                <td data-label={VISA_APPLICATIONS_TEXT.tableHeaders.packageTitle}>
                  <div>{application.package_title || application.visa_name}</div>
                  <small className="text-muted">{application.visa_type}</small>
                </td>
                <td data-label={VISA_APPLICATIONS_TEXT.tableHeaders.country}>
                  {application.country_name}
                </td>
                <td data-label={VISA_APPLICATIONS_TEXT.tableHeaders.status}>
                  <span
                    className={`badge ${getVisaStatusBadgeClass(
                      application.status,
                    )}`}
                  >
                    {formatVisaStatusLabel(application.status)}
                  </span>
                </td>
                <td
                  data-label={VISA_APPLICATIONS_TEXT.tableHeaders.paymentStatus}
                >
                  <span
                    className={`badge ${getPaymentStatusBadgeClass(
                      application.payment_status,
                    )}`}
                  >
                    {formatVisaStatusLabel(application.payment_status)}
                  </span>
                </td>
                <td
                  data-label={VISA_APPLICATIONS_TEXT.tableHeaders.assignedOfficer}
                >
                  {application.assigned_officer_name ||
                    VISA_APPLICATIONS_TEXT.empty.assignedOfficer}
                </td>
                <td data-label={VISA_APPLICATIONS_TEXT.tableHeaders.createdAt}>
                  {application.created_at
                    ? moment(application.created_at).format("DD MMM YYYY")
                    : "-"}
                </td>
                <td data-label={VISA_APPLICATIONS_TEXT.tableHeaders.action}>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => onView(application.id)}
                  >
                    {VISA_APPLICATIONS_TEXT.buttons.view}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center text-muted py-4">
                {VISA_APPLICATIONS_TEXT.empty.noApplications}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisaApplicationsTable;
