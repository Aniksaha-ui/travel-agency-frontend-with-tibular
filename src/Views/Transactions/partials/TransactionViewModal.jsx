import { Fragment } from "react";
import moment from "moment";
import PropTypes from "prop-types";

const TransactionViewModal = ({ selectedTransaction, setShowModal }) => {
  return (
    <Fragment>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          style={{ maxWidth: "800px" }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div className="modal-header bg-light">
              <h5 className="modal-title">Transaction Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Date</label>
                  <div className="fw-medium">
                    {selectedTransaction?.created_at
                      ? moment(selectedTransaction.created_at).format("LLLL")
                      : "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Transaction ID</label>
                  <div className="fw-medium text-break">
                    {selectedTransaction?.transaction_id || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Payment ID</label>
                  <div className="fw-medium text-break">
                    {selectedTransaction?.payment_id || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Booking ID</label>
                  <div className="fw-medium">
                    {selectedTransaction?.booking_id || "-"}
                  </div>
                </div>

                 <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Reference</label>
                  <div className="fw-medium text-break">
                    {selectedTransaction?.transaction_reference || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Purpose</label>
                  <div className="fw-medium">
                    {selectedTransaction?.purpose || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Payment Method</label>
                  <div className="fw-medium">
                    <span className="badge bg-secondary">
                        {selectedTransaction?.payment_method || "-"}
                    </span>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Amount</label>
                  <div className="fw-bold text-primary fs-5">
                    {selectedTransaction?.amount || "0"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Customer Name</label>
                  <div className="fw-medium">
                    {selectedTransaction?.customer_name || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Customer Email</label>
                  <div className="fw-medium text-break">
                    {selectedTransaction?.cus_email || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Bank Transaction ID</label>
                  <div className="fw-medium text-break">
                    {selectedTransaction?.bank_transaction_id || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Bank Approval ID</label>
                  <div className="fw-medium text-break">
                    {selectedTransaction?.bank_approval_id || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Card Type</label>
                  <div className="fw-medium">
                    {selectedTransaction?.card_type || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Card Brand</label>
                  <div className="fw-medium">
                    {selectedTransaction?.card_brand || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Risk Title</label>
                  <div className="fw-medium">
                    {selectedTransaction?.risk_title || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Settlement Status</label>
                  <div className="fw-medium">
                    {selectedTransaction?.settlement_status || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Settled Amount</label>
                  <div className="fw-medium">
                    {selectedTransaction?.settled_amount || "-"}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="text-muted small text-uppercase fw-bold">Customer Paid Amount</label>
                  <div className="fw-medium">
                    {selectedTransaction?.customer_paid_amount || "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </Fragment>
  );
};

TransactionViewModal.propTypes = {
  selectedTransaction: PropTypes.object,
  setShowModal: PropTypes.func.isRequired,
};

export default TransactionViewModal;
