import moment from "moment";
import { VISA_APPLICATIONS_TEXT, formatVisaStatusLabel } from "../text";

const VisaApplicationStatusLogs = ({ statusLogs }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{VISA_APPLICATIONS_TEXT.sections.statusLogs}</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-vcenter card-table mobile-card-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Changed By</th>
              <th>Transition</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {statusLogs.length ? (
              statusLogs.map((log) => (
                <tr key={log.id}>
                  <td data-label="Date">
                    {log.created_at
                      ? moment(log.created_at).format("DD MMM YYYY, hh:mm A")
                      : "-"}
                  </td>
                  <td data-label="Changed By">{log.changed_by_name || "-"}</td>
                  <td data-label="Transition">
                    <span className="text-muted">
                      {formatVisaStatusLabel(log.old_status)}
                    </span>
                    {" -> "}
                    <span className="fw-semibold">
                      {formatVisaStatusLabel(log.new_status)}
                    </span>
                  </td>
                  <td data-label="Note">{log.note || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  {VISA_APPLICATIONS_TEXT.empty.noLogs}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisaApplicationStatusLogs;
