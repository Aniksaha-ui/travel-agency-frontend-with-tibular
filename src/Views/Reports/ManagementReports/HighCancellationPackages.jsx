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
} from "recharts";
import { Card, Table, Row, Col, ProgressBar } from "react-bootstrap";
import { HIGH_CANCELLATION_PACKAGES } from "../../../Utils/Constants/text";

const HighCancellationPackages = () => {
    const api = useApi();
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchHighCancellationPackagesReport();
            if (response && response.data) {
                setReportData(response.data);
            }
        } catch (error) {
            console.error("Error fetching high cancellation packages report:", error);
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
                                <h2 className="page-title">{HIGH_CANCELLATION_PACKAGES}</h2>
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
                                        <Card.Title>Bookings vs Cancellations by Package</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ width: '100%', height: 400 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={reportData}
                                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                    <XAxis dataKey="package_name" hide={reportData.length > 5} />
                                                    <YAxis />
                                                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                                                    <Legend />
                                                    <Bar dataKey="total_bookings" name="Total Bookings" fill="#206bc4" radius={[4, 4, 0, 0]} />
                                                    <Bar dataKey="cancelled_count" name="Cancelled" fill="#d63939" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Card>
                            <Card.Header>
                                <Card.Title>High Cancellation Risk Analysis</Card.Title>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Table responsive className="table-vcenter card-table table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>Package Name</th>
                                            <th className="text-center">Total Bookings</th>
                                            <th className="text-center">Cancellations</th>
                                            <th>Cancellation Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.length > 0 ? reportData.map((item, index) => {
                                            const rate = parseFloat(item.cancellation_rate);
                                            let variant = "success";
                                            if (rate > 15) variant = "warning";
                                            if (rate > 30) variant = "danger";
                                            
                                            return (
                                                <tr key={index}>
                                                    <td>{item.package_name}</td>
                                                    <td className="text-center">{item.total_bookings}</td>
                                                    <td className="text-center text-danger fw-bold">{item.cancelled_count}</td>
                                                    <td style={{ width: '250px' }}>
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-grow-1 me-2">
                                                                <ProgressBar now={rate} variant={variant} style={{ height: '8px' }} />
                                                            </div>
                                                            <span className={`fw-bold text-${variant}`}>{rate.toFixed(1)}%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-muted">No high cancellation data found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default HighCancellationPackages;
