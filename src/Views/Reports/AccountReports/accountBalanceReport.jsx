import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Legend as LineLegend,
  ResponsiveContainer,
} from "recharts";
import { Modal, Button } from "react-bootstrap"; // ✅ Import Modal from React Bootstrap

const AccountBalanceReport = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const api = useApi();
  const [accountBalance, setAccountBalance] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountHistory, setAccountHistory] = useState([]);

  useEffect(() => {
    fetchAccountBalance();
  }, []);

  const fetchAccountBalance = async () => {
    const response = await api.fetchAccountBalanceReport();
    if (response && response.data) {
      setAccountBalance(response.data);
    }
  };

  const handleDetails = async (type) => {
    const response = await api.fetchAccountBalanceHistoryReport(type);
    if (response && response.data) {
      console.log(response, "res");

      await setAccountHistory(response.data);
      setIsModalOpen(true);
    }
  };

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-6">
                <div className="card d-flex align-items-center justify-content-center">
                  <h1 className="text-center text-primary mt-3">
                    Account Balance Report
                  </h1>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={accountBalance}
                      dataKey="amount"
                      nameKey="account_name"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {accountBalance.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </div>

              <div className="col-6">
                <div className="card d-flex align-items-center justify-content-center">
                  <h1 className="text-center text-primary mt-3">
                    Account Balance Report
                  </h1>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={accountBalance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3 className="card-title">Account Balance Report</h3>
                  </div>
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Account Name</th>
                          <th>Account Number</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountBalance.map((account, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{account.account_name}</td>
                            <td>{account.account_number}</td>
                            <td>{account.amount}</td>
                            <td>{account.type}</td>
                            <td>
                              <button
                                onClick={() => handleDetails(account.type)}
                                className="btn btn-sm btn-danger"
                              >
                                <i className="fas fa-book"></i> View History
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AccountBalanceReport;
