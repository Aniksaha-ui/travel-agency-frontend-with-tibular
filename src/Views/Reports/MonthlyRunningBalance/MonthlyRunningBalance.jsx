import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Utils/Components/Loading";
import AdminLayout from "../../../Layout/AdminLayout";
import Search from "../../../Utils/Components/Search";
import { PaginationFooter } from "../../../Utils/Components/PaginationFooter";
import fetchData from "../../../Utils/Functions/fetchInformation";
import { MONTH_RUNNING_BALANCE } from "../../../Utils/Constants/api";
import useGoBack from "../../../Hooks/useGoBack";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { barchartOption } from "../../../Utils/Functions/chart";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function MonthlyRunningBalance() {
  const goBack = useGoBack();

  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [balance, setBalance] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();

  const fetchRunningBalanceInformation = async () => {
    await fetchData(
      api.monthlyRunningBalance,
      page,
      setLastPage,
      setBalance,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search !== "") {
      setPage(1);
    }
    fetchRunningBalanceInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  // Chart Data
  const barChartData = {
    labels: balance.map((b) => b.month),
    datasets: [
      {
        label: "Total Credit",
        data: balance.map((b) => b.total_credit),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Debit",
        data: balance.map((b) => b.total_debit),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Closing Balance",
        data: balance.map((b) => b.closing_balance),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const lineChartData = {
    labels: balance.map((b) => b.month),
    datasets: [
      {
        label: "Opening Balance",
        data: balance.map((b) => b.opening_balance),
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
      {
        label: "Closing Balance",
        data: balance.map((b) => b.closing_balance),
        borderColor: "rgba(255, 159, 64, 1)",
        fill: false,
      },
    ],
  };

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
                    <h3 className="card-title">{MONTH_RUNNING_BALANCE}</h3>
                    <div onClick={goBack} className="btn btn-primary">
                      Back
                    </div>
                  </div>
                  <Search search={search} setSearch={setSearch} />
                  {/* Table */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Month Name</th>
                          <th>Total Credit</th>
                          <th>Total Debit</th>
                          <th>Opening Balance</th>
                          <th>Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {balance.map((bl, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{bl.month}</td>
                            <td>{bl.total_credit}</td>
                            <td>{bl.total_debit}</td>
                            <td>{bl.opening_balance}</td>
                            <td>{bl.closing_balance}</td>
                          </tr>
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

                <div className="row gx-5">
                  <div className="col-md-6 card mt-4">
                    <div className="card-header">
                      <h3 className="card-title">Monthly Balance Overview</h3>
                    </div>
                    <div className="card-body">
                      <Bar
                        data={barChartData}
                        options={barchartOption("Monthly Running Balance")}
                      />
                    </div>
                  </div>

                  {/* Line Chart */}
                  <div className="col-md-6 card mt-4">
                    <div className="card-header">
                      <h3 className="card-title">Balance Trend</h3>
                    </div>
                    <div className="card-body">
                      <Line
                        data={lineChartData}
                        options={barchartOption(
                          "opening balance vs closing balance trend"
                        )}
                      />
                    </div>
                  </div>
                  {/* Bar Chart */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default MonthlyRunningBalance;
