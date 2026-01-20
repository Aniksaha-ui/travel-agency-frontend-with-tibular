import ResponsiveTable from "./ResponsiveTable";

export const RoutePerformance = ({ monitoringInfo }) => {
  return (
    <ResponsiveTable title="Route Performance">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Route</th>
            <th>Total Queries</th>
            <th>Avg Time (ms)</th>
            <th>Max Time (ms)</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {monitoringInfo?.route_report?.map((r) => (
            <tr key={r.route}>
              <td data-label="Route">{r.route}</td>
              <td data-label="Total Queries">{r.total_queries}</td>
              <td data-label="Avg Time">{r.avg_time}</td>
              <td
                data-label="Max Time"
                className={r.max_time > 100 ? "text-danger fw-bold" : ""}
              >
                {r.max_time}
              </td>
              <td data-label="Last Seen">{r.last_seen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
