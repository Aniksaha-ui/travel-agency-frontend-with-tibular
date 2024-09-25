import { useEffect, useState } from "react";
import AdminLayout from "./Layout/AdminLayout";
import "./index.css";
import useApi from "./Hooks/useApi";
import fetchData from "./Utils/Functions/fetchInformation";
import Search from "./Utils/Components/Search";

function App() {
  const [page, setPage] = useState(1);
  const [paginationInformation,setPaginationInformation] = useState({to:0,from:0,total: 0});
  const [lastPage, setLastPage] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const api = useApi();

  /***common for all pages for pagination */

  const createPaginationLinks = (lastPage, currentPage, setCurrentPage) => {
    const links = Array.from({ length: lastPage }).map((_, i) => (
      <li
        key={i + 1}
        className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
      >
        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </button>
      </li>
    ));
    return links;
  };

  /***common for all pages for paginate */
  const fetchRouteInformation = async () => {
    await fetchData( api.fetchRoutes, page,setLastPage,setRoutes, search, setPaginationInformation);
  };

  useEffect(() => {
    if (search != "") {
      setPage(1);
    }
    fetchRouteInformation();
  }, [page, search]);

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
                    <h3 className="card-title">Route List</h3>
                    <div className="btn btn-primary">Add New</div>
                  </div>                   
                  <Search search={search} setSearch={setSearch} />   {/* search */}
                  <div className="table-responsive mx-2 mt-1">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Origin</th>
                          <th>Destination</th>
                          <th>Route Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routes.map((route, index) => (
                          <tr key={route.id}>
                            <td>{route.id}</td>
                            <td>{route.origin}</td>
                            <td>
                              <span className="badge bg-success me-1" />
                              {route.destination}
                            </td>
                            <td>{route.route_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer d-flex align-items-center">
                    <p className="m-0 text-muted">
                      Showing <span>{paginationInformation.from}</span> to <span>{paginationInformation.to}</span> of{" "}
                      <span>{paginationInformation.total}</span> entries
                    </p>
                    <ul className="pagination m-0 ms-auto">
                      {createPaginationLinks(lastPage, page, setPage)}
                      <li className="page-item">
                        <a className="page-link" href="#">
                          next
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 6l6 6l-6 6" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default App;
