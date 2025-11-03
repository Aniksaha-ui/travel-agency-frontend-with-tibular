import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import { GUIDE_PACKAGE_COSTING } from "../../Utils/Constants/text";
import moment from "moment";

const GuidePackageCosting = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [costings, setCostings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [payload, setPayload] = useState({});
  const [selectedCost, setSelectedCost] = useState(null); // for modal
  const [showModal, setShowModal] = useState(false); // modal visibility

  const api = useApi();
  const navigation = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      setPayload({ package_id: id });
    }
  }, [id]);

  const fetchGuideAssignInformation = async () => {
    const response = await api.fetchGuidePackagesCosting(id, page, search);

    if (!response || !response.data) {
      setLoading(false);
      return;
    }

    if (response.data.length === 0) {
      setLastPage(1);
      setCostings([]);
      setPaginationInformation({ to: 0, from: 0, total: 0 });
      setLoading(false);
      return;
    }

    if (response.data.data) {
      setLastPage(response.data.last_page);
      setCostings(response.data.data ?? []);
      setPaginationInformation({
        to: response.data.to,
        from: response.data.from,
        total: response.data.total,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search !== "") {
      setPage(1);
    }
    fetchGuideAssignInformation();
  }, [page, search]);

  const handleAddCost = (package_id) => {
    navigation(`/guide/my-packageCosting/addCosting/${package_id}`);
  };

  const handleViewCost = (cost) => {
    setSelectedCost(cost);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCost(null);
  };

  const handleUpdateCost = (package_id,costId) =>{
    navigation(`/guide/my-packageCosting/addCosting/${package_id}/${costId}`);
    
  } 



  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col"></div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h3 className="card-title">{GUIDE_PACKAGE_COSTING}</h3>
                    <div
                      onClick={() => handleAddCost(id)}
                      className="btn btn-primary"
                    >
                      Add New
                    </div>
                  </div>

                  <Search search={search} setSearch={setSearch} />

                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Cost Type</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costings.length > 0 ? (
                          costings.map((cost, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{cost.cost_type}</td>
                              <td>{cost.cost_amount}</td>
                              <td>
                                <div className="d-flex align-item-center justify-content-center">
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleViewCost(cost)}
                                >
                                  View
                                </button>&nbsp;&nbsp;&nbsp;
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleUpdateCost(id,cost.id)}
                                >
                                  Edit
                                </button>
                                </div>
                                
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

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

      {/* Modal */}
      {showModal && selectedCost && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Costing Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
<div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Package Name:</strong>
                    <p>{selectedCost.package_name}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Created At:</strong>
                    <p>{moment(selectedCost.created_at).format("DD MM YYYY")}</p>
                  </div>
                </div>


                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Cost Type:</strong>
                    <p>{selectedCost.cost_type}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Amount:</strong>
                    <p>{selectedCost.cost_amount}</p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <strong>Description:</strong>
                    <p>{selectedCost.description}</p>
                  </div>
                </div>

                {selectedCost.attachment && (
                  <div className="row">
                    <div className="col-12">
                      <strong>Attachment:</strong>
                      <div className="mt-2 text-center">
                        <img
                          src={`${import.meta.env.VITE_IMAGE_URL}${selectedCost.attachment}`}
                          alt="Attachment Preview"
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default GuidePackageCosting;
