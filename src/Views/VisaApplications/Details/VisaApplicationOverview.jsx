import moment from "moment";
import { VISA_APPLICATIONS_TEXT, formatVisaStatusLabel } from "../text";

const InfoRow = ({ label, value }) => (
  <div className="col-md-6">
    <label className="text-muted small text-uppercase fw-bold">{label}</label>
    <div className="fw-medium">{value || "-"}</div>
  </div>
);

const VisaApplicationOverview = ({ application }) => {
  const applicantInfo = application.applicant_info ?? {};

  return (
    <div className="row row-cards">
      <div className="col-lg-4">
        <div className="card h-100">
          <div className="card-header">
            <h3 className="card-title">{VISA_APPLICATIONS_TEXT.labels.applicantInfo}</h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <InfoRow label="Full Name" value={application.full_name} />
              <InfoRow label="Email" value={application.email || applicantInfo.email} />
              <InfoRow label="Phone" value={application.phone || applicantInfo.phone} />
              <InfoRow
                label="Date of Birth"
                value={application.date_of_birth || applicantInfo.date_of_birth || "-"}
              />
              <InfoRow label="Gender" value={formatVisaStatusLabel(application.gender)} />
              <InfoRow
                label="Nationality"
                value={application.nationality || applicantInfo.nationality}
              />
              <InfoRow
                label="Passport No"
                value={application.passport_no || applicantInfo.passport_number}
              />
              <InfoRow
                label="Passport Expiry"
                value={
                  application.passport_expiry_date ||
                  applicantInfo.passport_expiry ||
                  "-"
                }
              />
              <div className="col-12">
                <label className="text-muted small text-uppercase fw-bold">
                  Address
                </label>
                <div className="fw-medium">
                  {application.present_address || applicantInfo.address || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card h-100">
          <div className="card-header">
            <h3 className="card-title">{VISA_APPLICATIONS_TEXT.labels.packageInfo}</h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <InfoRow label="Country" value={application.country_name} />
              <InfoRow label="Visa Package" value={application.package_title} />
              <InfoRow label="Visa Type" value={application.visa_name} />
              <InfoRow
                label="Processing Days"
                value={application.processing_days_snapshot}
              />
              <InfoRow
                label="Travel Date"
                value={
                  application.travel_date || VISA_APPLICATIONS_TEXT.empty.travelDate
                }
              />
              <InfoRow
                label="Applied At"
                value={
                  application.applied_at
                    ? moment(application.applied_at).format("DD MMM YYYY, hh:mm A")
                    : "-"
                }
              />
              <InfoRow
                label="Travel Purpose"
                value={application.travel_purpose}
              />
              <div className="col-12">
                <label className="text-muted small text-uppercase fw-bold">
                  Package Description
                </label>
                <div className="fw-medium">
                  {application.package_description || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card h-100">
          <div className="card-header">
            <h3 className="card-title">{VISA_APPLICATIONS_TEXT.labels.assignmentInfo}</h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <InfoRow
                label="Assigned Officer"
                value={
                  application.assigned_officer_name ||
                  VISA_APPLICATIONS_TEXT.empty.assignedOfficer
                }
              />
              <InfoRow label="User" value={application.user_name} />
              <InfoRow label="User Email" value={application.user_email} />
              <InfoRow
                label="Fee Snapshot"
                value={`${application.fee_snapshot || 0} ${
                  application.currency_snapshot || ""
                }`}
              />
              <InfoRow
                label="Current Status"
                value={formatVisaStatusLabel(application.status)}
              />
              <InfoRow
                label="Payment Status"
                value={formatVisaStatusLabel(application.payment_status)}
              />
              <div className="col-12">
                <label className="text-muted small text-uppercase fw-bold">
                  Admin Note
                </label>
                <div className="fw-medium">
                  {application.admin_note || VISA_APPLICATIONS_TEXT.empty.adminNote}
                </div>
              </div>
              <div className="col-12">
                <label className="text-muted small text-uppercase fw-bold">
                  {VISA_APPLICATIONS_TEXT.labels.requiredDocuments}
                </label>
                <div className="d-flex flex-wrap gap-2 mt-1">
                  {application.required_documents?.length ? (
                    application.required_documents.map((document) => (
                      <span
                        key={document.id}
                        className="badge bg-secondary-lt text-secondary"
                      >
                        {document.document_label}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted small">
                      {VISA_APPLICATIONS_TEXT.empty.noRequirements}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationOverview;
