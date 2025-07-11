import { useEffect, useRef, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { useParams } from "react-router-dom";
import useApi from "../../Hooks/useApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import "./invoice.css";

const BookingInvoice = () => {
  const params = useParams();
  const { id } = params;
  const api = useApi();
  const [bookingInvoiceInfo, setBookingInvoiceInfo] = useState([]);
  const invoiceRef = useRef(null);

  // const downloadPDF = async () => {
  //   const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(`invoice_${bookingInvoiceInfo.booking_id}.pdf`);
  // };

  const downloadPDF = async () => {
    const element = invoiceRef.current;

    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      windowWidth: document.body.scrollWidth,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position -= pdf.internal.pageSize.getHeight();
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save(`invoice_${bookingInvoiceInfo.booking_id}.pdf`);
  };

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
        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-success" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>

        <div id="invoice" ref={invoiceRef}>
          <div className="card">
            <div className="card-header-primary">
              <h2 className="mb-0">INVOICE</h2>
              <small>Travel Booking Confirmation</small>
            </div>

            <div className="card-body px-5 py-4">
              <div className="mb-4 text-center border-bottom pb-3">
                <h4 className="fw-bold mb-1">Ecovani Travel Agency</h4>
                <p className="mb-0">22/A Jhiltuly, Faridpur</p>
                <p className="mb-0">Phone: 01628781323</p>
                <p className="mb-0">Email: sahaanik1045@gmail.com</p>
              </div>

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
                    <strong>Booking ID:</strong> #
                    {bookingInvoiceInfo.booking_id}
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

              <h5 className="text-muted mb-3">Trip Summary</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">Trip Name</th>
                      <td>
                        {bookingInvoiceInfo.trip_name}(#
                        {bookingInvoiceInfo.trip_id})
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Departure Time</th>
                      <td>
                        {moment(bookingInvoiceInfo.departure_time).format(
                          "lll"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Arrival Time</th>
                      <td>
                        {moment(bookingInvoiceInfo.arrival_time).format("lll")}
                      </td>
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
                      <td>
                        {bookingInvoiceInfo.seat_numbers ??
                          "Since the booking is cancelled, no seat number is available"}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Price per Seat</th>
                      <td>
                        ৳{parseFloat(bookingInvoiceInfo.price).toFixed(2)}
                      </td>
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

              <div className="text-center mt-5">
                <p className="text-muted mb-0">
                  Thank you for booking with us!
                </p>
                <small className="text-secondary">
                  We wish you a safe and pleasant journey.
                </small>
              </div>
            </div>

            <div className="card-footer text-center bg-light">
              <small className="text-muted">
                &copy; {new Date().getFullYear()} Ecovani Travel Agency · All
                rights reserved
              </small>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingInvoice;
