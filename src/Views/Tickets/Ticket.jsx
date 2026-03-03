import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";
import Loading from "../../Utils/Components/Loading";
import TicketViewModal from "./partial/TicketViewModal";
import TicketList from "./partial/TicketList";
import { toast } from "react-toastify";
import { TICKET_MANAGEMENT } from "../../Utils/Constants/text";

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

  const handleApproved = async (status, ticketId, resolvedStatus = null, resolvedRemarks = null) => {
    const response = await api.updateTicketStatus(ticketId, status, resolvedStatus, resolvedRemarks);
    if(response && response.message){
      toast(response.message);
      setTickets((prevTicket) =>
        prevTicket.map((ticket) =>
          parseInt(ticket.id) == ticketId
            ? { 
                ...ticket, 
                status: status,
                resloved_status: resolvedStatus !== null ? resolvedStatus : status,
                resolved_remarks: resolvedRemarks
              }
            : ticket
        )
      );
    }
    if(showModal){
      setShowModal(false);
    }
  };

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none py-3">
          <div className="container-xl">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">{TICKET_MANAGEMENT }</h2>
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
                            <TicketList
                              key={index}
                              setSelectedTicket={setSelectedTicket}
                              setShowModal={setShowModal}
                              ticket={ticket}
                              handleApproved={handleApproved}
                            />
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
        <TicketViewModal
          selectedTicket={selectedTicket}
          setShowModal={setShowModal}
          handleApproved={handleApproved}
        />
      )}
    </AdminLayout>
  );
};

export default Ticket;
