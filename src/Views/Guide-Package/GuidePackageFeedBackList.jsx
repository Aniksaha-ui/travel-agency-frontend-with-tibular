import { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../../Utils/Components/Search";
import { PaginationFooter } from "../../Utils/Components/PaginationFooter";
import fetchData from "../../Utils/Functions/fetchInformation";
import { GUIDE_PACKAGE_FEEDBACK_INFORMATION } from "../../Utils/Constants/text";

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
    if (id) {
      setPayload({ package_id: id });
    }
  }, [id]);

  const fetchGuideAssignInformation = async (payload) => {
    const response = await api.fetchGuideFeedBack(page, search, payload);

    if (response.data.length === 0) {
      setLastPage(1);
      setReviews([]);
      setPaginationInformation({
        to: 0,
        from: 0,
        total: 0,
      });
      setLoading(false);
    }
    if (response.data && response.data.data) {
      setLastPage(response.data.last_page);
      setReviews(response.data.data ?? []);
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
                    <h3 className="card-title">
                      {GUIDE_PACKAGE_FEEDBACK_INFORMATION}
                    </h3>
                  </div>
                  <Search search={search} setSearch={setSearch} />{" "}
                  {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Comment</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map((review, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{review.feedback}</td>
                            <td>{review.rating}</td>
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
