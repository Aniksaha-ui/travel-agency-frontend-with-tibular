import AdminLayout from "./Layout/AdminLayout";
import "./index.css";
function App() {
  return (
    <AdminLayout>
      <div className="page-wrapper">
        {/* Page header */}
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">Datatables</h2>
              </div>
            </div>
          </div>
        </div>
        {/* Page body */}
        <div className="page-body">
          <div className="container-xl">
            <div className="card">
              <div className="card-body">
                {/* searching and filtering */}
                <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                  <div className="row mb-4">
                    <div className="col-md-10 mt-1">
                      <h4>Hello Datatable !</h4>
                    </div>
                    <div className="col-md-2">
                      <div className="input-icon">
                        <span className="input-icon-addon">
                          {/* Download SVG icon from http://tabler-icons.io/i/search */}
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
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search…"
                          aria-label="Search in website"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* searching and filtering */}
                {/* table view  */}
                <div id="table-default" className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <button className="table-sort" data-sort="sort-name">
                            Name
                          </button>
                        </th>
                        <th>
                          <button className="table-sort" data-sort="sort-city">
                            City
                          </button>
                        </th>
                        <th>
                          <button className="table-sort" data-sort="sort-type">
                            Type
                          </button>
                        </th>
                        <th>
                          <button className="table-sort" data-sort="sort-score">
                            Score
                          </button>
                        </th>
                        <th>
                          <button className="table-sort" data-sort="sort-date">
                            Date
                          </button>
                        </th>
                        <th>
                          <button
                            className="table-sort"
                            data-sort="sort-quantity"
                          >
                            Quantity
                          </button>
                        </th>
                        <th>
                          <button
                            className="table-sort"
                            data-sort="sort-progress"
                          >
                            Progress
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-tbody">
                      <tr>
                        <td className="sort-name">Steel Vengeance</td>
                        <td className="sort-city">
                          Cedar Point, United States
                        </td>
                        <td className="sort-type">RMC Hybrid</td>
                        <td className="sort-score">100,0%</td>
                        <td className="sort-date" data-date={1628071164}>
                          August 04, 2021
                        </td>
                        <td className="sort-quantity">74</td>
                        <td className="sort-progress" data-progress={30}>
                          <div className="row align-items-center">
                            <div className="col-12 col-lg-auto">30%</div>
                            <div className="col">
                              <div
                                className="progress"
                                style={{ width: "5rem" }}
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: "30%" }}
                                  role="progressbar"
                                  aria-valuenow={30}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-label="30% Complete"
                                >
                                  <span className="visually-hidden">
                                    30% Complete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="sort-name">Steel Vengeance</td>
                        <td className="sort-city">
                          Cedar Point, United States
                        </td>
                        <td className="sort-type">RMC Hybrid</td>
                        <td className="sort-score">100,0%</td>
                        <td className="sort-date" data-date={1628071164}>
                          August 04, 2021
                        </td>
                        <td className="sort-quantity">74</td>
                        <td className="sort-progress" data-progress={30}>
                          <div className="row align-items-center">
                            <div className="col-12 col-lg-auto">30%</div>
                            <div className="col">
                              <div
                                className="progress"
                                style={{ width: "5rem" }}
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: "30%" }}
                                  role="progressbar"
                                  aria-valuenow={30}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-label="30% Complete"
                                >
                                  <span className="visually-hidden">
                                    30% Complete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <ul className="pagination ">
                        <li className="page-item disabled">
                          <a
                            className="page-link"
                            href="#"
                            tabIndex={-1}
                            aria-disabled="true"
                          >
                            {/* Download SVG icon from http://tabler-icons.io/i/chevron-left */}
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M15 6l-6 6l6 6" />
                            </svg>
                            prev
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            4
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            5
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            next{" "}
                            {/* Download SVG icon from http://tabler-icons.io/i/chevron-right */}
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M9 6l6 6l-6 6" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </tfoot>
                  </table>
                </div>
                {/* table view  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default App;
