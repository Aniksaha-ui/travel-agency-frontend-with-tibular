import { useQuery } from "@tanstack/react-query";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import "./monitoring.css";

/* ---------------- Reusable KPI Card ---------------- */
const StatCard = ({ title, value, icon, color = "primary" }) => (
  <div className="col-12 col-sm-6 col-lg-3">
    <div className="card h-100">
      <div className="card-body d-flex align-items-center">
        <span className={`avatar bg-${color} text-white me-3`}>
          <i className={`fa ${icon}`} />
        </span>
        <div>
          <div className="fw-bold">{title}</div>
          <div className="text-muted fs-4">{value ?? "-"}</div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------------- Reusable Responsive Table ---------------- */
const ResponsiveTable = ({ title, children }) => (
  <div className="card mt-4">
    <div className="card-header">
      <h4 className="card-title">{title}</h4>
    </div>
    <div className="table-responsive responsive-table">{children}</div>
  </div>
);

const Monitoring = () => {
  const api = useApi();

  const { data, isLoading, error } = useQuery({
    queryKey: ["monitoring"],
    queryFn: api.monitoring,
    refetchInterval: 60000,
  });

  const m = data?.data;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container-xl text-center mt-5">
          <h4>Loading system monitoring...</h4>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="container-xl text-center mt-5 text-danger">
          <h4>Failed to load monitoring data</h4>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            {/* -------- HEADER -------- */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
              <h2 className="text-primary mb-2 mb-md-0">System Monitoring</h2>
              <span className="badge bg-green">Live • Auto refresh 60s</span>
            </div>

            {/* -------- KPI SUMMARY -------- */}
            <div className="row g-3">
              <StatCard
                title="Total Requests Today"
                value={m?.daily_report?.[0]?.total_queries}
                icon="fa-bolt"
              />
              <StatCard
                title="Total Execution Time (ms)"
                value={m?.daily_report?.[0]?.total_time}
                icon="fa-clock"
                color="warning"
              />
              <StatCard
                title="Active Routes"
                value={m?.route_report?.length}
                icon="fa-random"
                color="success"
              />
              <StatCard
                title="Slow Queries"
                value={m?.slow_queries?.length}
                icon="fa-exclamation-triangle"
                color="danger"
              />
            </div>

            {/* -------- DAILY REPORT -------- */}
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
                  {m?.daily_report?.map((day) => (
                    <tr key={day.date}>
                      <td data-label="Date">{day.date}</td>
                      <td data-label="Total Queries">{day.total_queries}</td>
                      <td data-label="Total Time">{day.total_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>

            {/* -------- ROUTE PERFORMANCE -------- */}
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
                  {m?.route_report?.map((r) => (
                    <tr key={r.route}>
                      <td data-label="Route">{r.route}</td>
                      <td data-label="Total Queries">{r.total_queries}</td>
                      <td data-label="Avg Time">{r.avg_time}</td>
                      <td
                        data-label="Max Time"
                        className={r.max_time > 5 ? "text-danger fw-bold" : ""}
                      >
                        {r.max_time}
                      </td>
                      <td data-label="Last Seen">{r.last_seen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ResponsiveTable>

            {/* -------- CONTROLLER REPORT -------- */}
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
                  {m?.controller_report?.map((c) => (
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

            {/* -------- USER REPORT -------- */}
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
                  {m?.user_report?.map((u) => (
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

            {/* -------- REQUEST HISTORY -------- */}
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
                  {m?.request_report?.map((r) => (
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

            {/* -------- SQL LOGS (SCROLL ONLY) -------- */}
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
                  {m?.latest_logs?.map((log) => (
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Monitoring;
