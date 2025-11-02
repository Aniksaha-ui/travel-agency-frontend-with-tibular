import moment from "moment";
import { refundDisbrusedStatus } from "../../../Utils/Constants/status";

const RefundList = ({ index, refund, disbrused }) => {
  return (
    <tr key={index}>
      <td>{refund.id}</td>
      <td>{moment(refund.booking_date).format("DD MMMM YYYY")}</td>
      <td>{refund.trip_name}</td>
      <td>{refund.seat_ids}</td>
      <td>{refund.reason}</td>
      <td>{refundDisbrusedStatus[refund.status]}</td>
      <td>
        {refundDisbrusedStatus[refund.status] ===
          refundDisbrusedStatus.pending && (
          <button
            onClick={() => disbrused(refund.id)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Checked In"
            className="btn btn-sm btn-success ms-2"
          >
            <i className="fas fa-check"></i>
          </button>
        )}
      </td>
    </tr>
  );
};
export default RefundList;
