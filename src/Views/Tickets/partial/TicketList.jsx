import { Fragment } from "react";
import { ticketResolveStatus, ticketMainStatus } from "../../../Utils/Constants/status";

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
            Number(ticket.status) === 1
              ? "bg-success"
              : Number(ticket.status) === 2
              ? "bg-danger"
              : "bg-warning text-dark"
          }`}
        >
          {ticketMainStatus[ticket.status] ?? "Unknown"}
        </span>
        {Number(ticket.status) === 1 && (
           <div className="small text-muted" style={{ fontSize: '0.75rem', marginTop: '2px' }}>
             ({ticketResolveStatus[ticket.resloved_status] || 'N/A'})
           </div>
        )}
      </td>
      <td>{ticket.generate_by_name}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center gap-1">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setSelectedTicket(ticket);
              setShowModal(true);
            }}
            title="View Details"
          >
            <i className="fa fa-eye" aria-hidden="true"></i>
          </button>
          
          {ticket && Number(ticket.status) === 0 && (
            <Fragment>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleApproved(1, ticket?.id, 1)}
                title="Approve Ticket"
              >
                <i className="fa fa-check" aria-hidden="true"></i>
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleApproved(2, ticket?.id, 2)}
                title="Reject Ticket"
              >
                <i className="fas fa-times"></i>
              </button>
            </Fragment>
          )}

          {ticket && Number(ticket.status) === 1 && Number(ticket.resloved_status) === 1 && (
            <button
               className="btn btn-sm btn-info text-white"
               onClick={() => handleApproved(2, ticket?.id, 2)}
               title="Mark as Resolved"
            >
               <i className="fa fa-check" aria-hidden="true"></i>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TicketList;
