import ResponsiveTable from "./ResponsiveTable";

export const UserReport = ({ monitoringInfo }) => {
  return (
    <ResponsiveTable title="User Activity">
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Total Queries</th>
            <th>Total Time (ms)</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {monitoringInfo?.user_report?.map((u) => (
            <tr key={u.user_id}>
              <td data-label="User ID">{u.user_id}</td>
              <td data-label="Total Queries">{u.total_queries}</td>
              <td data-label="Total Time">{u.total_time}</td>
              <td data-label="Last Seen">{u.last_seen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
