import moment from "moment";
import PropTypes from "prop-types";

const TransactionList = ({ transaction }) => {
  return (
    <tr>
      <td className="text-center">
        {transaction &&
          transaction.created_at &&
          moment(transaction.created_at).format("ll")}
      </td>
      <td className="text-center">
        {transaction && transaction.transaction_id}
      </td>
      <td className="text-center">{transaction && transaction.payment_id}</td>
      <td className="text-center">{transaction && transaction.booking_id}</td>
      <td>{transaction && transaction.transaction_reference}</td>
      <td>{transaction && transaction.purpose}</td>
      <td>{transaction && transaction.payment_method}</td>
      <td>{transaction && transaction.amount}</td>
    </tr>
  );
};

TransactionList.propTypes = {
  transaction: PropTypes.shape({
    created_at: PropTypes.oneOfType([PropTypes.string]),
    transaction_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    payment_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    booking_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    transaction_reference: PropTypes.string,
    purpose: PropTypes.string,
    payment_method: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default TransactionList;
