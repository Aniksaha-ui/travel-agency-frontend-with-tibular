import moment from "moment";
import {
  VISA_APPLICATIONS_TEXT,
  VISA_DOCUMENT_STATUS_OPTIONS,
  formatVisaStatusLabel,
  getVisaStatusBadgeClass,
} from "../text";

const VisaApplicationDocuments = ({
  documents,
  documentReviews,
  onDocumentReviewChange,
  onVerifyDocument,
  getFileUrl,
  activeAction,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{VISA_APPLICATIONS_TEXT.sections.documents}</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-vcenter card-table mobile-card-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Uploaded By</th>
              <th>Status</th>
              <th>Review</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.length ? (
              documents.map((document) => {
                const review = documentReviews[document.id] || {
                  status: document.verification_status || "pending",
                  remarks: document.remarks || "",
                };

                return (
                  <tr key={document.id}>
                    <td data-label="Document" className="mobile-title">
                      <div className="fw-semibold">
                        {document.document_label || document.document_key}
                      </div>
                      <small className="text-muted d-block">
                        {document.original_name}
                      </small>
                      <small className="text-muted">
                        {(document.file_size / 1024).toFixed(1)} KB
                      </small>
                    </td>
                    <td data-label="Uploaded By">
                      <div>{document.uploaded_by_name || "-"}</div>
                      <small className="text-muted">
                        {document.created_at
                          ? moment(document.created_at).format("DD MMM YYYY")
                          : "-"}
                      </small>
                    </td>
                    <td data-label="Status">
                      <span
                        className={`badge ${getVisaStatusBadgeClass(
                          document.verification_status,
                        )}`}
                      >
                        {formatVisaStatusLabel(document.verification_status)}
                      </span>
                      {document.reviewed_by_name && (
                        <small className="text-muted d-block mt-1">
                          By {document.reviewed_by_name}
                        </small>
                      )}
                    </td>
                    <td data-label="Review">
                      <select
                        className="form-select form-select-sm mb-2"
                        value={review.status}
                        onChange={(e) =>
                          onDocumentReviewChange(
                            document.id,
                            "status",
                            e.target.value,
                          )
                        }
                      >
                        {VISA_DOCUMENT_STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      <textarea
                        rows="2"
                        className="form-control form-control-sm"
                        value={review.remarks}
                        onChange={(e) =>
                          onDocumentReviewChange(
                            document.id,
                            "remarks",
                            e.target.value,
                          )
                        }
                        placeholder={VISA_APPLICATIONS_TEXT.placeholders.remarks}
                      />
                    </td>
                    <td data-label="Updated">
                      {document.updated_at
                        ? moment(document.updated_at).format("DD MMM YYYY, hh:mm A")
                        : "-"}
                    </td>
                    <td data-label="Action">
                      <div className="d-flex flex-wrap gap-2">
                        <a
                          href={getFileUrl(document.file_path)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          {VISA_APPLICATIONS_TEXT.buttons.viewFile}
                        </a>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => onVerifyDocument(document.id)}
                          disabled={activeAction === `document-${document.id}`}
                        >
                          {activeAction === `document-${document.id}`
                            ? `${VISA_APPLICATIONS_TEXT.buttons.verifyDocument}...`
                            : VISA_APPLICATIONS_TEXT.buttons.verifyDocument}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  {VISA_APPLICATIONS_TEXT.empty.noDocuments}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisaApplicationDocuments;
