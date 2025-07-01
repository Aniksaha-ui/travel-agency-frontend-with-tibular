import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { useParams } from "react-router-dom";
import useApi from "../../Hooks/useApi";

const BookingInvoice = () => {
  const params = useParams();
  const { id } = params;
  const api = useApi();
  const [bookingInvoiceInfo, setBookingInvoiceInfo] = useState([]);

  useEffect(() => {
    fetchBookingInvoice(id);
  }, []);

  const fetchBookingInvoice = async (bookingId) => {
    const response = await api.fetchBookingInvoiceByBookingId(bookingId);
    console.log(response.data[0]);

    setBookingInvoiceInfo(response.data[0]);
  };

  return (
    <AdminLayout>
      <div className="container my-5">
        <div className="card shadow border-0">
          {/* Invoice Header */}
          <div className="card-header bg-primary text-white text-center py-4">
            <h2 className="mb-0">INVOICE</h2>
            <small>Travel Booking Confirmation</small>
          </div>

          {/* Invoice Body */}
          <div className="card-body px-5 py-4">
            {/* Company Info */}
            <div className="mb-4 text-center border-bottom pb-3">
              <h4 className="fw-bold mb-1">Ecovani Travel Agency</h4>
              <p className="mb-0">22/A Jhiltuly, Faridpur</p>
              <p className="mb-0">Phone: 01628781323</p>
              <p className="mb-0">Email: sahaanik1045@gmail.com</p>
            </div>

            {/* Passenger and Booking Info */}
            <div className="row mb-4">
              <div className="col-md-6">
                <h5 className="text-muted">Passenger Information</h5>
                <p className="mb-1">
                  <strong>Name:</strong> {bookingInvoiceInfo.user_name}
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> {bookingInvoiceInfo.user_email}
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <h5 className="text-muted">Invoice Details</h5>
                <p className="mb-1">
                  <strong>Booking ID:</strong> #{bookingInvoiceInfo.booking_id}
                </p>
                <p className="mb-0">
                  <strong>Booking Status:</strong>{" "}
                  <span
                    className={`badge rounded-pill bg-${
                      bookingInvoiceInfo.booking_status === "cancelled"
                        ? "danger"
                        : "success"
                    }`}
                  >
                    {bookingInvoiceInfo.booking_status &&
                      bookingInvoiceInfo.booking_status.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>

            {/* Trip Details Table */}
            <h5 className="text-muted mb-3">Trip Summary</h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Trip Name</th>
                    <td>{bookingInvoiceInfo.trip_name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Trip ID</th>
                    <td>#{bookingInvoiceInfo.trip_id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Booking Type</th>
                    <td>{bookingInvoiceInfo.booking_type}</td>
                  </tr>
                  {bookingInvoiceInfo.package_name && (
                    <tr>
                      <th scope="row">Package</th>
                      <td>{bookingInvoiceInfo.package_name}</td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row">Booked Seats</th>
                    <td>{bookingInvoiceInfo.booked_seats || "N/A"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Price per Seat</th>
                    <td>৳{parseFloat(bookingInvoiceInfo.price).toFixed(2)}</td>
                  </tr>
                  <tr className="table-light fw-bold">
                    <th scope="row">Total Amount</th>
                    <td className="text-primary">
                      ৳
                      {parseFloat(
                        bookingInvoiceInfo.total_payment_amount
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Info Table */}
            <h5 className="text-muted mt-4 mb-3">Payment Information</h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Payment Method</th>
                    <td>{bookingInvoiceInfo.payment_method}</td>
                  </tr>
                  {bookingInvoiceInfo.bkash && (
                    <tr>
                      <th scope="row">bKash</th>
                      <td>{bookingInvoiceInfo.bkash}</td>
                    </tr>
                  )}
                  {bookingInvoiceInfo.nagad && (
                    <tr>
                      <th scope="row">Nagad</th>
                      <td>{bookingInvoiceInfo.nagad}</td>
                    </tr>
                  )}
                  {bookingInvoiceInfo.card && (
                    <tr>
                      <th scope="row">Card</th>
                      <td>{bookingInvoiceInfo.card}</td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row">Transaction Reference</th>
                    <td>{bookingInvoiceInfo.transaction_reference}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Message */}
            <div className="text-center mt-5">
              <p className="text-muted mb-0">Thank you for booking with us!</p>
              <small className="text-secondary">
                We wish you a safe and pleasant journey.
              </small>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="card-footer text-center bg-light">
            <small className="text-muted">
              &copy; {new Date().getFullYear()} Ecovani Travel Agency · All
              rights reserved
            </small>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingInvoice;
