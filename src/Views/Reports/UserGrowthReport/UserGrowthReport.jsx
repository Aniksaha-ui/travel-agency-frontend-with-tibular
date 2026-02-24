import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import Loading from "../../../Utils/Components/Loading";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { Card, Table, Row, Col } from "react-bootstrap";
import moment from "moment";
import { USER_GROWTH_REPORT } from "../../../Utils/Constants/text";

const UserGrowthReport = () => {
    const api = useApi();
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchUserGrowthReport();
            if (response && response.data) {
                setReportData(response.data);
            }
        } catch (error) {
            console.error("Error fetching user growth report:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    // Prepare data for growth calculation
    const chartData = reportData.map((item, index) => {
        const previousMonthUsers = index > 0 ? reportData[index - 1].new_users : 0;
        const growth = index > 0 ? item.new_users - previousMonthUsers : 0;
        return {
            ...item,
            month_label: moment(item.month).format("MMM YYYY"),
            growth: growth
        };
    });

    return (
        <AdminLayout>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <h2 className="page-title">{USER_GROWTH_REPORT}</h2>
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
                                        <Card.Title>Monthly New Users Registration</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ width: '100%', height: 400 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart
                                                    data={chartData}
                                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                                >
                                                    <defs>
                                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#206bc4" stopOpacity={0.8} />
                                                            <stop offset="95%" stopColor="#206bc4" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <XAxis dataKey="month_label" />
                                                    <YAxis />
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                    <Tooltip 
                                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}
                                                        itemStyle={{ color: '#206bc4' }}
                                                    />
                                                    <Legend />
                                                    <Area 
                                                        type="monotone" 
                                                        dataKey="new_users" 
                                                        stroke="#206bc4" 
                                                        fillOpacity={1} 
                                                        fill="url(#colorUsers)" 
                                                        name="New Users"
                                                    />
                                                </AreaChart>
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
                                        <Card.Title>Detailed Growth Data</Card.Title>
                                        <button className="btn btn-outline-primary btn-sm" onClick={() => window.print()}>
                                            <i className="fas fa-print me-2"></i> Print Report
                                        </button>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <Table responsive className="table-vcenter card-table table-striped table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Month</th>
                                                    <th className="text-center">New Users</th>
                                                    <th className="text-center">Trend</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {chartData.length > 0 ? chartData.reverse().map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.month_label}</td>
                                                        <td className="text-center">
                                                            <span className="badge bg-blue-lt fw-bold" style={{ fontSize: '0.9rem' }}>
                                                                {item.new_users}
                                                            </span>
                                                        </td>
                                                        <td className="text-center">
                                                            {item.growth >= 0 ? (
                                                                <span className="text-success d-inline-flex align-items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up me-1" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                        <path d="M3 17l6 -6l4 4l8 -8"></path>
                                                                        <path d="M14 7l7 0l0 7"></path>
                                                                    </svg>
                                                                    {item.growth}
                                                                </span>
                                                            ) : (
                                                                <span className="text-danger d-inline-flex align-items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-down me-1" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                        <path d="M3 7l9 9l4 -4l5 5"></path>
                                                                        <path d="M16 17l5 0l0 -5"></path>
                                                                    </svg>
                                                                    {Math.abs(item.growth)}
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="3" className="text-center py-4 text-muted">No data available for the selected period</td>
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

export default UserGrowthReport;
