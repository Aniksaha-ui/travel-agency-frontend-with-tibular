import ResponsiveTable from "./ResponsiveTable";

export const LogReport = ({ monitoringInfo }) => {
  return (
    <ResponsiveTable title="Latest SQL Logs">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Route</th>
            <th>SQL</th>
            <th>Time (ms)</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {monitoringInfo?.latest_logs?.map((log) => (
            <tr
              key={log.id}
              className={log.time_ms > 100 ? "table-warning" : ""}
            >
              <td>{log.route}</td>
              <td style={{ minWidth: 350 }}>{log.sql}</td>
              <td>{log.time_ms}</td>
              <td>{log.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
