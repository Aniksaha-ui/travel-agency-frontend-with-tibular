import ResponsiveTable from "./ResponsiveTable";

export const RequestHistory = ({ monitoringInfo }) => {
  return (
    <ResponsiveTable title="Recent Requests">
      <table className="table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Route</th>
            <th>Controller</th>
            <th>Queries</th>
            <th>Time (ms)</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {monitoringInfo?.request_report?.map((r) => (
            <tr key={r.request_id}>
              <td data-label="Method">
                <span className="badge bg-blue">{r.method}</span>
              </td>
              <td data-label="Route">{r.route}</td>
              <td data-label="Controller">{r.controller}</td>
              <td data-label="Queries">{r.total_queries}</td>
              <td data-label="Time">{r.total_time_ms}</td>
              <td data-label="Last Seen">{r.last_seen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
