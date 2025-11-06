import moment from "moment";

const FinancialReportList = ({ fy_report, index }) => {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        {moment(fy_report.fy_start).format("YYYY")} -{" "}
        {moment(fy_report.fy_end).format("YYYY")}{" "}
      </td>
      <td>{fy_report.payment_amount}</td>
      <td>{fy_report.refund}</td>
      <td>{fy_report.costing}</td>
    </tr>
  );
};

export default FinancialReportList;
