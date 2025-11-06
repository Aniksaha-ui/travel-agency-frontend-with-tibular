import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Utils/Components/Loading";
import AdminLayout from "../../../Layout/AdminLayout";
import Search from "../../../Utils/Components/Search";
import { PaginationFooter } from "../../../Utils/Components/PaginationFooter";
import fetchData from "../../../Utils/Functions/fetchInformation";
import moment from "moment";
import { TRIP_PERFORMANCE } from "../../../Utils/Constants/text";
import useGoBack from "../../../Hooks/useGoBack";
import FinancialReportList from "./_partial/FinancialReportList";

function FinancialReport() {
  const goBack = useGoBack();

  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [financialReport, setFinancialReport] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();
  const fetchFinancialReport = async () => {
    await fetchData(
      api.financialReport,
      page,
      setLastPage,
      setFinancialReport,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchFinancialReport();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col"></div>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3 className="card-title">{TRIP_PERFORMANCE}</h3>
                    <div onClick={goBack} className="btn btn-primary">
                      Back
                    </div>
                  </div>
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#SL</th>
                          <th>Financial Year</th>
                          <th>Payment Amount</th>
                          <th>Refund</th>
                          <th>Costing</th>
                           </tr>
                      </thead>
                      <tbody>
                        {financialReport.map((fy_report, index) => (
                           <FinancialReportList key={index} fy_report={fy_report} index={index}/>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <PaginationFooter
                    paginationInformation={paginationInformation}
                    lastPage={lastPage}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default FinancialReport;
