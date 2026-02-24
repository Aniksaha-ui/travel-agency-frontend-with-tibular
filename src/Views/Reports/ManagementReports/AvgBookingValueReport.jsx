import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import Loading from "../../../Utils/Components/Loading";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
import { Card, Table, Row, Col } from "react-bootstrap";
import { AVG_BOOKING_VALUE_REPORT } from "../../../Utils/Constants/text";

const AvgBookingValueReport = () => {
    const api = useApi();
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    const COLORS = ["#206bc4", "#5eba00"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchAvgBookingValueReport();
            if (response && response.data) {
                setReportData(response.data);
            }
        } catch (error) {
            console.error("Error fetching average booking value report:", error);
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
                                <h2 className="page-title">{AVG_BOOKING_VALUE_REPORT}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="container-xl">
                        <Row className="mb-4">
                            <Col md={12}>
                                <Card>
                                    <Card.Header>
                                        <Card.Title>Average Booking Value by Type</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ width: '100%', height: 400 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={reportData}
                                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                    <XAxis dataKey="booking_type" className="text-capitalize" />
                                                    <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
                                                    <Tooltip 
                                                        formatter={(value) => [`${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Avg Value']}
                                                        contentStyle={{ borderRadius: '8px' }}
                                                    />
                                                    <Legend />
                                                    <Bar dataKey="average_value" name="Average Booking Value" radius={[4, 4, 0, 0]}>
                                                        {reportData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
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
                                        <Card.Title>Summary Table</Card.Title>
                                        <button className="btn btn-outline-primary btn-sm" onClick={() => window.print()}>
                                            <i className="fas fa-print me-2"></i> Print Report
                                        </button>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Table responsive className="table-vcenter card-table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Booking Type</th>
                                                    <th className="text-end">Average Transaction Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportData.length > 0 ? reportData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="text-capitalize font-weight-bold">{item.booking_type}</td>
                                                        <td className="text-end text-primary fw-bold" style={{ fontSize: '1.1rem' }}>
                                                            {parseFloat(item.average_value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="2" className="text-center py-4 text-muted">No data found</td>
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

export default AvgBookingValueReport;
