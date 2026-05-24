import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import Loading from "../../Utils/Components/Loading";
import useGoBack from "../../Hooks/useGoBack";
import { toast } from "react-toastify";
import moment from "moment";
import { calculateBookingTotal } from "../utils/calculate"

const TripUsers = () => {
    const { id } = useParams();
    const api = useApi();
    const goBack = useGoBack();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch users for this trip
                const response = await api.fetchTripUsers(id);
                if (response && response.status && response.data) {
                    setUsers(response.data);
                }

            } catch (error) {
                toast("Error fetching trip users:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

   

    const grandTotal = useMemo(() => {
        return users.reduce((acc, user) => {
            return acc + calculateBookingTotal(user.seat_ids, user.price);
        }, 0);
    }, [users]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="page-wrapper">
                    <div className="container-xl d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                        <Loading />
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="page-wrapper">
                <div className="page-header d-print-none">
                    <div className="container-xl">
                        <div className="row g-2 align-items-center">
                            <div className="col">
                                <div className="page-pretitle">Overview</div>
                                <h2 className="page-title">
                                    Trip Users {title ? `for ${title}` : `(ID: ${id})`}
                                </h2>
                            </div>
                            <div className="col-auto ms-auto d-print-none">
                                <div className="btn-list">
                                    <span className="d-none d-sm-inline">

                                    </span>
                                    <button className="btn btn-secondary" onClick={goBack}>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-body">
                    <div className="container-xl">
                        {/* Summary Card */}
                        <div className="row row-cards mb-4">
                            <div className="col-sm-6 col-lg-3">
                                <div className="card card-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-primary text-white avatar">
                                                    {/* Currency Icon or similar */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="font-weight-medium">
                                                    Total Revenue
                                                </div>
                                                <div className="text-muted">
                                                    {grandTotal.toFixed(2)} BDT
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="card card-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <span className="bg-green text-white avatar">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                                                </span>
                                            </div>
                                            <div className="col">
                                                <div className="font-weight-medium">
                                                    Total Bookings
                                                </div>
                                                <div className="text-muted">
                                                    {users.length}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row row-cards">
                            <div className="col-12">
                                <div className="card">
                                    <div className="table-responsive">
                                        <table className="table table-vcenter card-table mobile-card-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Booking Date</th>
                                                    <th>Status</th>
                                                    <th>Seats</th>
                                                    <th>Unit Price</th>
                                                    <th>Total Payment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.length > 0 ? (
                                                    users.map((user, index) => {
                                                        const bookingTotal = calculateBookingTotal(user.seat_ids, user.price);
                                                        return (
                                                            <tr key={index}>
                                                                <td data-label="Name">
                                                                    <div className="d-flex py-1 align-items-center">
                                                                        <div className="flex-fill">
                                                                            <div className="font-weight-medium">{user.name}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td data-label="Email">
                                                                    <div className="text-muted">{user.email}</div>
                                                                </td>
                                                                <td data-label="Booking Date">
                                                                    {moment(user.booking_date).format('ll')}
                                                                </td>
                                                                <td data-label="Status">
                                                                    <span className={`badge bg-${user.status === 'paid' ? 'success' : 'warning'}`}>
                                                                        {user.status}
                                                                    </span>
                                                                </td>
                                                                <td data-label="Seats">
                                                                    <div className="text-muted text-wrap" style={{ maxWidth: "200px" }}>
                                                                        {user.seat_ids}
                                                                    </div>
                                                                </td>
                                                                <td data-label="Unit Price">
                                                                    {user.price}
                                                                </td>
                                                                <td data-label="Total Payment" className="text-end" style={{ fontWeight: 'bold' }}>
                                                                    {bookingTotal.toFixed(2)}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">
                                                            No users found for this trip.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            {users.length > 0 && (
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan="6" className="font-weight-bold text-end">Grand Total</td>
                                                        <td className="font-weight-bold text-end">{grandTotal.toFixed(2)}</td>
                                                    </tr>
                                                </tfoot>
                                            )}
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

export default TripUsers;
