import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../../Hooks/useApi";
import AdminLayout from "../../../Layout/AdminLayout";
import Loading from "../../../Utils/Components/Loading";
import { PaginationFooter } from "../../../Utils/Components/PaginationFooter";
import fetchData from "../../../Utils/Functions/fetchInformation";
import VisaApplicationsHeader from "./VisaApplicationsHeader";
import VisaApplicationsTable from "./VisaApplicationsTable";

const VisaApplications = () => {
  const [page, setPage] = useState(1);
  const [paginationInformation, setPaginationInformation] = useState({
    to: 0,
    from: 0,
    total: 0,
  });
  const [lastPage, setLastPage] = useState([]);
  const [visaApplications, setVisaApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const navigation = useNavigate();

  const fetchVisaApplicationInformation = async () => {
    await fetchData(
      api.fetchVisaApplications,
      page,
      setLastPage,
      setVisaApplications,
      search,
      setPaginationInformation,
      setLoading,
    );
  };

  useEffect(() => {
    if (search !== "" && page !== 1) {
      setPage(1);
      return;
    }

    fetchVisaApplicationInformation();
  }, [page, search]);

  if (loading) {
    return <Loading />;
  }

  const handleView = (id) => {
    navigation(`/admin/visa/applications/${id}`);
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
                  <VisaApplicationsHeader
                    search={search}
                    setSearch={setSearch}
                  />
                  <VisaApplicationsTable
                    visaApplications={visaApplications}
                    paginationInformation={paginationInformation}
                    onView={handleView}
                  />
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

export default VisaApplications;
