import {
  VISA_APPLICATIONS_TEXT,
  VISA_APPLICATION_STATUS_OPTIONS,
} from "../text";

const VisaApplicationActions = ({
  users,
  assignmentData,
  adminUpdateData,
  statusData,
  onAssignmentChange,
  onAdminUpdateChange,
  onStatusChange,
  onAssign,
  onAdminUpdate,
  onStatusUpdate,
  activeAction,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{VISA_APPLICATIONS_TEXT.sections.workflow}</h3>
      </div>
      <div className="card-body">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="border rounded p-3 h-100">
              <h4 className="h5 mb-3">{VISA_APPLICATIONS_TEXT.buttons.assign}</h4>
              <div className="mb-3">
                <label className="form-label">{VISA_APPLICATIONS_TEXT.labels.officer}</label>
                <select
                  name="officer_id"
                  className="form-select"
                  value={assignmentData.officer_id}
                  onChange={onAssignmentChange}
                >
                  <option value="">{VISA_APPLICATIONS_TEXT.placeholders.officer}</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">{VISA_APPLICATIONS_TEXT.labels.remarks}</label>
                <textarea
                  rows="3"
                  name="remarks"
                  className="form-control"
                  value={assignmentData.remarks}
                  onChange={onAssignmentChange}
                  placeholder={VISA_APPLICATIONS_TEXT.placeholders.remarks}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onAssign}
                disabled={activeAction === "assign"}
              >
                {activeAction === "assign"
                  ? `${VISA_APPLICATIONS_TEXT.buttons.assign}...`
                  : VISA_APPLICATIONS_TEXT.buttons.assign}
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="border rounded p-3 h-100">
              <h4 className="h5 mb-3">
                {VISA_APPLICATIONS_TEXT.buttons.adminUpdate}
              </h4>
              <div className="mb-3">
                <label className="form-label">{VISA_APPLICATIONS_TEXT.labels.officer}</label>
                <select
                  name="assigned_to"
                  className="form-select"
                  value={adminUpdateData.assigned_to}
                  onChange={onAdminUpdateChange}
                >
                  <option value="">{VISA_APPLICATIONS_TEXT.placeholders.officer}</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">{VISA_APPLICATIONS_TEXT.labels.adminNote}</label>
                <textarea
                  rows="3"
                  name="remarks"
                  className="form-control"
                  value={adminUpdateData.remarks}
                  onChange={onAdminUpdateChange}
                  placeholder={VISA_APPLICATIONS_TEXT.placeholders.remarks}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onAdminUpdate}
                disabled={activeAction === "update"}
              >
                {activeAction === "update"
                  ? `${VISA_APPLICATIONS_TEXT.buttons.adminUpdate}...`
                  : VISA_APPLICATIONS_TEXT.buttons.adminUpdate}
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="border rounded p-3 h-100">
              <h4 className="h5 mb-3">
                {VISA_APPLICATIONS_TEXT.buttons.updateStatus}
              </h4>
              <div className="mb-3">
                <label className="form-label">{VISA_APPLICATIONS_TEXT.labels.status}</label>
                <select
                  name="status"
                  className="form-select"
                  value={statusData.status}
                  onChange={onStatusChange}
                >
                  <option value="">Select status</option>
                  {VISA_APPLICATION_STATUS_OPTIONS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">{VISA_APPLICATIONS_TEXT.labels.remarks}</label>
                <textarea
                  rows="3"
                  name="remarks"
                  className="form-control"
                  value={statusData.remarks}
                  onChange={onStatusChange}
                  placeholder={VISA_APPLICATIONS_TEXT.placeholders.remarks}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onStatusUpdate}
                disabled={activeAction === "status"}
              >
                {activeAction === "status"
                  ? `${VISA_APPLICATIONS_TEXT.buttons.updateStatus}...`
                  : VISA_APPLICATIONS_TEXT.buttons.updateStatus}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationActions;
