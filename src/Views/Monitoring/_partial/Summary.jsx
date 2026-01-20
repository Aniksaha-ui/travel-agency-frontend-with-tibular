import StatCard from "./StatCard";

export const Summary = ({ monitoringInfo }) => {
  return (
    <div className="row g-3">
      <StatCard
        title="Total Requests Today"
        value={monitoringInfo?.daily_report?.[0]?.total_queries}
        icon="fa-bolt"
      />
      <StatCard
        title="Total Execution Time (ms)"
        value={monitoringInfo?.daily_report?.[0]?.total_time}
        icon="fa-clock"
        color="warning"
      />
      <StatCard
        title="Active Routes"
        value={monitoringInfo?.route_report?.length}
        icon="fa-random"
        color="success"
      />
      <StatCard
        title="Slow Queries"
        value={monitoringInfo?.slow_queries?.length}
        icon="fa-exclamation-triangle"
        color="danger"
      />
    </div>
  );
};
