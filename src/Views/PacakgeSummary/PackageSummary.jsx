import { useQuery } from "@tanstack/react-query";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import "../Monitoring/monitoring.css";
import Loading from "../../Utils/Components/Loading";
import { PackageSummaryList } from "./_partial/PackageSummaryList";

/* ---------------- Reusable KPI Card ---------------- */

/* ---------------- Reusable Responsive Table ---------------- */

const PackageSummary = () => {
  const api = useApi();

  const { data, isLoading, error } = useQuery({
    queryKey: ["packageSummary"],
    queryFn: api.packageSummary,
    refetchInterval: 60000,
  });

  const packageSummaryInfo = data?.data;

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
          <h4>Package-wise Booking Summary Report</h4>
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
                Package Summary Report
              </h2>
              <span className="badge bg-green">Live • Auto refresh 60s</span>
            </div>

          
           

            {/* -------- SQL LOGS (SCROLL ONLY) -------- */}
            <PackageSummaryList packageSummaryInfo={packageSummaryInfo} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PackageSummary;
