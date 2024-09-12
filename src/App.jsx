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
          <h2 className="page-title">
            Tables
          </h2>
        </div>
      </div>
    </div>
  </div>
  {/* Page body */}
  <div className="page-body">
    <div className="container-xl">
      <div className="row row-cards">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Route List</h3>
            </div>
            <div className="card-body border-bottom py-3">
              <div className="d-flex">
                <div></div>
                <div className="ms-auto text-muted">
                  Search:
                  <div className="ms-2 d-inline-block">
                    <input type="text" className="form-control form-control-sm" aria-label="Search invoice" />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive mx-2 mt-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="w-1">No.
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-sm icon-thick" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 15l6 -6l6 6" /></svg>
                    </th>
                    <th>Invoice Subject</th>
                    <th>Client</th>
                    <th>VAT No.</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="text-muted">001401</span></td>
                    <td><a href="invoice.html" className="text-reset" tabIndex={-1}>Design Works</a></td>
                    <td>
                      <span className="flag flag-country-us" />
                      Carlson Limited
                    </td>
                    <td>
                      87956621
                    </td>
                    <td>
                      15 Dec 2019
                    </td>
                    <td>
                      <span className="badge bg-success me-1" /> Paid
                    </td>
                    <td>$887</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-footer d-flex align-items-center">
              <p className="m-0 text-muted">Showing <span>1</span> to <span>8</span> of <span>16</span> entries</p>
              <ul className="pagination m-0 ms-auto">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
                    {/* Download SVG icon from http://tabler-icons.io/i/chevron-left */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                    prev
                  </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    next {/* Download SVG icon from http://tabler-icons.io/i/chevron-right */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
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
