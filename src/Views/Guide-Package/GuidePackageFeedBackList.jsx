import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";

const GuidePackageFeedBackList = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [payload, setPayload] = useState({});
  const api = useApi();
  const navigation = useNavigate();
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    setPayload({ package_id: id });
  }, [id]);

  const fetchGuideAssignInformation = async (id) => {
    await fetchData(
      api.fetchGuideFeedBack,
      page,
      setLastPage,
      setReviews,
      search,
      setPaginationInformation,
      setLoading
    );
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
                    <h3 className="card-title">Package Assign Information</h3>
                  </div>
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Trip Name</th>
                          <th>Package Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map((pack, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pack.trip_name}</td>
                            <td>{pack.package_name}</td>
                            <td>
                              <button
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                updateTrip
                                title="Edit"
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handlePackageReview(pack.id)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            </td>
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

export default GuidePackageFeedBackList;
