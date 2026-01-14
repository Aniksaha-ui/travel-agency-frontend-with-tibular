import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";
import Loading from "../../Utils/Components/Loading";
import { ticketResolveStatus } from "../../Utils/Constants/status";

const Ticket = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const api = useApi();
  const navigation = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTicketInformation = async () => {
    await fetchData(
      api.fetchTickets,
      page,
      setLastPage,
      setTickets,
      search,
      setPaginationInformation,
      setLoading
    );
  };

  useEffect(() => {
    if (search !== "") setPage(1);
    fetchTicketInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none py-3">
          <div className="container-xl">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Ticket Management</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header d-flex align-items-center justify-content-between bg-light">
                    <h3 className="card-title mb-0">Ticket Information</h3>
                  </div>

                  {/* Search */}
                  <div className="p-3 border-bottom">
                    <Search search={search} setSearch={setSearch} />
                  </div>

                  {/* Table */}
                  <div className="table-responsive p-3">
                    <table className="table table-hover table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th className="text-center">#</th>
                          <th>Title</th>
                          <th>Remarks</th>
                          <th>Status</th>
                          <th>Customer</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tickets.length > 0 ? (
                          tickets.map((ticket, index) => (
                            <tr key={ticket.id}>
                              <td className="text-center">{ticket.id}</td>
                              <td>{ticket.title}</td>
                              <td>{ticket.remarks}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    ticket.resloved_status === 1
                                      ? "bg-success"
                                      : "bg-warning text-dark"
                                  }`}
                                >
                                  {ticketResolveStatus[ticket.resloved_status]}
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
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={6}
                              className="text-center text-muted py-3"
                            >
                              No tickets found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="p-3 border-top">
                    <PaginationFooter
                      paginationInformation={paginationInformation}
                      lastPage={lastPage}
                      page={page}
                      setPage={setPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
     {showModal && selectedTicket && (
  <>
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        style={{ maxWidth: "900px" }}
      >
        <div
          className="modal-content"
          style={{
            backgroundColor: "#1e1e2f",
            color: "#ccc",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 style={{ color: "#a78bfa", fontWeight: "700" }}>
              Ticket Details
            </h4>
            <button
              type="button"
              className="btn btn-link text-light fs-5"
              onClick={() => setShowModal(false)}
              style={{ textDecoration: "none" }}
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Details grid */}
          <div
            className="d-grid"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem 2rem",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <small className="text-muted">Title</small>
              <div>{selectedTicket.title || "-"}</div>
            </div>

            <div>
              <small className="text-muted">Remarks</small>
              <div>{selectedTicket.remarks || "-"}</div>
            </div>

            <div>
              <small className="text-muted">Status</small>
              <div>
                <span
                  className="badge"
                  style={{
                    backgroundColor:
                      selectedTicket.resloved_status === 1 ? "#65a30d" : "#facc15",
                    color: selectedTicket.resloved_status === 1 ? "#fff" : "#222",
                    padding: "0.3em 0.8em",
                    borderRadius: "10px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {ticketResolveStatus[selectedTicket.resloved_status]}
                </span>
              </div>
            </div>

            <div>
              <small className="text-muted">Resolved</small>
              <div>
                {selectedTicket.resolved_user_name || (
                  <span className="text-secondary">—</span>
                )}
              </div>
            </div>

            <div>
              <small className="text-muted">Generated By</small>
              <div>{selectedTicket.generate_by_name || "-"}</div>
            </div>

            <div>
              <small className="text-muted">Resolved By</small>
              <div>{selectedTicket.resolved_user_name || <span>—</span>}</div>
            </div>

            <div>
              <small className="text-muted">Created At</small>
              <div>{selectedTicket.created_at || "N/A"}</div>
            </div>

            <div>
              <small className="text-muted">Updated At</small>
              <div>{selectedTicket.updated_at || "N/A"}</div>
            </div>

            <div>
              <small className="text-muted">Status Code</small>
              <div>{selectedTicket.status || "-"}</div>
            </div>
          </div>

          {/* Description - full width */}
          <div style={{ marginBottom: "1.5rem" }}>
            <small className="text-muted">Description</small>
            <div
              style={{
                backgroundColor: "#27293d",
                padding: "1rem",
                borderRadius: "8px",
                color: "#e0e0e0",
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
              }}
            >
              {selectedTicket.description || "-"}
            </div>
          </div>

          {/* Attachment area */}
          <div style={{ marginBottom: "1.5rem" }}>
            <small className="text-muted">Attachment</small>
            <div>
              {selectedTicket.attachment ? (
                <a
                  href={`${import.meta.env.VITE_IMAGE_URL}${selectedTicket.attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-light"
                >
                  View Attachment
                </a>
              ) : (
                <span className="text-secondary">No attachment</span>
              )}
            </div>
          </div>

          {/* Close button */}
          <div className="text-end">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
  </>
)}

    </AdminLayout>
  );
};

export default Ticket;
