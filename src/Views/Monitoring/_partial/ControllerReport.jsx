import ResponsiveTable from "./ResponsiveTable";

export const ControllerReport = ({ monitoringInfo }) => {
  return (
    <ResponsiveTable title="Controller Load">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Controller</th>
            <th>Total Queries</th>
            <th>Total Time (ms)</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {monitoringInfo?.controller_report?.map((c) => (
            <tr key={c.controller}>
              <td data-label="Controller">{c.controller}</td>
              <td data-label="Total Queries">{c.total_queries}</td>
              <td data-label="Total Time">{c.total_time}</td>
              <td data-label="Last Seen">{c.last_seen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
