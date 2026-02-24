import { useEffect, useState } from "react";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import Loading from "../../../Utils/Components/Loading";
import { Card, Table, Row, Col, Alert } from "react-bootstrap";
import { LOW_PERFORMING_PACKAGES } from "../../../Utils/Constants/text";

const LowPerformingPackages = () => {
    const api = useApi();
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchLowPerformingPackagesReport();
            if (response && response.data) {
                setReportData(response.data);
            }
        } catch (error) {
            console.error("Error fetching low performing packages report:", error);
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
                                <h2 className="page-title">{LOW_PERFORMING_PACKAGES}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body">
                    <div className="container-xl">
                        <Alert variant="warning" className="border-0 shadow-sm mb-4">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-exclamation-triangle fa-2x me-3 text-warning"></i>
                                <div>
                                    <h4 className="alert-heading mb-1">Attention Required</h4>
                                    <p className="mb-0">The packages listed below have shown low booking counts in the recent period. Consider reviewing pricing, marketing, or package details.</p>
                                </div>
                            </div>
                        </Alert>

                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                                <Card.Title className="mb-0">Low Sales Packages Performance</Card.Title>
                                <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
                                    <i className="fas fa-file-export me-2"></i> Export Data
                                </button>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Table responsive hover className="table-vcenter card-table mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Package Name</th>
                                            <th className="text-center">Recent Bookings</th>
                                            <th className="text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.length > 0 ? reportData.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-muted">#{item.id}</td>
                                                <td className="fw-bold text-dark">{item.package_name}</td>
                                                <td className="text-center">
                                                    <span className="badge bg-red-lt px-3 py-2">
                                                        {item.recent_booking_count}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="text-danger small fw-bold">
                                                        <i className="fas fa-arrow-down me-1"></i> Low Performance
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-5">
                                                    <div className="text-muted">
                                                        <i className="fas fa-check-circle fa-3x mb-3 text-success d-block"></i>
                                                        No low-performing packages identified. All packages are meeting expectations.
                                                    </div>
                                                </td>
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

export default LowPerformingPackages;
