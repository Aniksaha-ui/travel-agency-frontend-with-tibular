import moment from "moment";
import { VISA_APPLICATIONS_TEXT, formatVisaStatusLabel } from "../text";

const VisaApplicationPayments = ({ payments }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{VISA_APPLICATIONS_TEXT.sections.payments}</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-vcenter card-table mobile-card-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Method</th>
              <th>Reference</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td data-label="Amount">{payment.amount}</td>
                  <td data-label="Method">{payment.payment_method || "-"}</td>
                  <td data-label="Reference">
                    {payment.transaction_reference || payment.transaction_id || "-"}
                  </td>
                  <td data-label="Status">
                    <span className="badge bg-success">
                      {formatVisaStatusLabel(payment.payment_status)}
                    </span>
                  </td>
                  <td data-label="Date">
                    {payment.created_at
                      ? moment(payment.created_at).format("DD MMM YYYY, hh:mm A")
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  {VISA_APPLICATIONS_TEXT.empty.noPayments}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisaApplicationPayments;
