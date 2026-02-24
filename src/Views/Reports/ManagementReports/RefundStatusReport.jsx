import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import Loading from "../../../Utils/Components/Loading";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, Table, Row, Col } from "react-bootstrap";
import { REFUND_STATUS_REPORT } from "../../../Utils/Constants/text";

const RefundStatusReport = () => {
    const api = useApi();
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    const COLORS = ["#206bc4", "#5eba00", "#f76707", "#d63939", "#4299e1"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchRefundStatusReport();
            if (response && response.data) {
                setReportData(response.data);
            }
        } catch (error) {
            console.error("Error fetching refund status report:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <AdminLayout>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">{REFUND_STATUS_REPORT}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="container-xl">
                        <Row className="mb-4">
                            <Col md={6}>
                                <Card className="h-100">
                                    <Card.Header>
                                        <Card.Title>Refunds by Status (Count)</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ width: '100%', height: 300 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={reportData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="total_refunds"
                                                        nameKey="status"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {reportData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="h-100">
                                    <Card.Header>
                                        <Card.Title>Refunds by status (Amount)</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ width: '100%', height: 300 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={reportData}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="total_amount"
                                                        nameKey="status"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {reportData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Card>
                                    <Card.Header className="d-flex justify-content-between align-items-center">
                                        <Card.Title>Detailed Refund Status Data</Card.Title>
                                        <button className="btn btn-outline-primary btn-sm" onClick={() => window.print()}>
                                            <i className="fas fa-print me-2"></i> Print Report
                                        </button>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Table responsive className="table-vcenter card-table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Status</th>
                                                    <th className="text-center">Total Refunds</th>
                                                    <th className="text-end">Total Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportData.length > 0 ? reportData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="text-capitalize">
                                                            <span className={`badge ${item.status === 'disbursed' ? 'bg-success' : 'bg-warning'} me-2`}></span>
                                                            {item.status}
                                                        </td>
                                                        <td className="text-center">{item.total_refunds}</td>
                                                        <td className="text-end fw-bold">
                                                            {parseFloat(item.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="3" className="text-center py-4 text-muted">No refund data found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default RefundStatusReport;
