import { ticketResolveStatus } from "../../../Utils/Constants/status";

const TicketList = ({
  ticket,
  setSelectedTicket,
  setShowModal,
  handleApproved,
}) => {
  return (
    <tr>
      <td className="text-center">{ticket.id}</td>
      <td>{ticket.title}</td>
      <td>{ticket.remarks}</td>
      <td>
        <span
          className={`badge ${
            Number(ticket.resolved_status) === 1
              ? "bg-success"
              : "bg-warning text-dark"
          }`}
        >
          {ticketResolveStatus[ticket.status] ?? "Unknown"}
        </span>
      </td>
      <td>{ticket.generate_by_name}</td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setSelectedTicket(ticket);
            setShowModal(true);
          }}
        >
          <i className="fa fa-eye" aria-hidden="true"></i>
        </button>

        <button
          className="btn btn-sm btn-success"
          onClick={() => handleApproved(1, ticket?.id)}
        >
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
};

export default TicketList;
