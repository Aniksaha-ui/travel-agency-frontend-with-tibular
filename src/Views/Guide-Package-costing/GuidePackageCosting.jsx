import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import { GUIDE_PACKAGE_COSTING } from "../../Utils/Constants/text";

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
  const api = useApi();
  const navigation = useNavigate();
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    if (id) {
      setPayload({ package_id: id });
    }
  }, [id]);

  const fetchGuideAssignInformation = async (payload) => {
    const response = await api.fetchGuidePackagesCosting(id, page, search);

    if (response.data.length === 0) {
      setLastPage(1);
      setCostings([]);
      setPaginationInformation({
        to: 0,
        from: 0,
        total: 0,
      });
      setLoading(false);
    }
    if (response && response.data) {
      setLastPage(response.data.last_page);
      setCostings(response.data ?? []);
      setPaginationInformation({
        to: response.data.to,
        from: response.data.from,
        total: response.data.total,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchGuideAssignInformation(id);
  }, [page, search]);

  const handlePackageReview = (package_id) => {
    navigation(`/guide/package/${package_id}`);
  };

  const handleAddCost = (package_id) => {
    navigation(`/guide/my-packageCosting/addCosting/${package_id}`);
  };

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
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Cost Type</th>
                          <th>Amount</th>
                          <th>Description</th>
                          <th>Attachment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costings.map((cost, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{cost.cost_type}</td>
                            <td>{cost.cost_amount}</td>
                            <td>{cost.description}</td>
                            <td>{cost.description}</td>
                          </tr>
                        ))}
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
    </AdminLayout>
  );
};

export default GuidePackageCosting;
