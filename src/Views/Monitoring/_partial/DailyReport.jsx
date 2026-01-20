import ResponsiveTable from "./ResponsiveTable";

export const DailyReport = ({ monitoringInfo }) => {
  return (
    <ResponsiveTable title="Daily Summary">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Queries</th>
            <th>Total Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {monitoringInfo?.daily_report?.map((day) => (
            <tr key={day.date}>
              <td data-label="Date">{day.date}</td>
              <td data-label="Total Queries">{day.total_queries}</td>
              <td data-label="Total Time">{day.total_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResponsiveTable>
  );
};
