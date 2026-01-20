import { useQuery } from "@tanstack/react-query";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import "./monitoring.css";
import Loading from "../../Utils/Components/Loading";
import StatCard from "./_partial/StatCard";
import ResponsiveTable from "./_partial/ResponsiveTable";
import { Summary } from "./_partial/Summary";
import { DailyReport } from "./_partial/DailyReport";
import { RoutePerformance } from "./_partial/RoutePerformance";
import { ControllerReport } from "./_partial/ControllerReport";
import { UserReport } from "./_partial/UserReport";
import { RequestHistory } from "./_partial/RequestHistory";
import { LogReport } from "./_partial/LogReport";

/* ---------------- Reusable KPI Card ---------------- */

/* ---------------- Reusable Responsive Table ---------------- */

const Monitoring = () => {
  const api = useApi();

  const { data, isLoading, error } = useQuery({
    queryKey: ["monitoring"],
    queryFn: api.monitoring,
    refetchInterval: 60000,
  });

  const monitoringInfo = data?.data;

  if (isLoading) {
    return (
      <AdminLayout>
        <Loading />
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
              <h2 className="text-primary mb-2 mb-md-0">
                System Monitoring based on last -{" "}
                {monitoringInfo?.latest_logs.length} request(s)
              </h2>
              <span className="badge bg-green">Live • Auto refresh 60s</span>
            </div>

            {/* -------- KPI SUMMARY -------- */}
            <Summary monitoringInfo={monitoringInfo} />

            {/* -------- DAILY REPORT -------- */}
            <DailyReport monitoringInfo={monitoringInfo} />

            {/* -------- ROUTE PERFORMANCE -------- */}
            <RoutePerformance monitoringInfo={monitoringInfo} />

            {/* -------- CONTROLLER REPORT -------- */}
            <ControllerReport monitoringInfo={monitoringInfo} />

            {/* -------- USER REPORT -------- */}

            <UserReport monitoringInfo={monitoringInfo} />
            {/* -------- REQUEST HISTORY -------- */}
            <RequestHistory monitoringInfo={monitoringInfo} />

            {/* -------- SQL LOGS (SCROLL ONLY) -------- */}
            <LogReport monitoringInfo={monitoringInfo} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Monitoring;
