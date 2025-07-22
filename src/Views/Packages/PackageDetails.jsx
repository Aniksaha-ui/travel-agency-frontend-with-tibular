import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useParams } from "react-router-dom";
import moment from "moment";

const PackageDetails = () => {
  const [packageDetail, setPackageDetail] = useState({});
  const api = useApi();
  const { id } = useParams();
  useEffect(() => {
    const fetchPackageDetails = async () => {
      const response = await api.fetchPackageDetails(id);
      if (response) {
        setPackageDetail(response.data);
      }
    };
    fetchPackageDetails();
  }, [id]);

  return (
    <AdminLayout>
      <div className="page-wrapper">
        <div className="page-header d-print-none py-3">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title"></h2>
              </div>
            </div>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-8">
                <div className="card shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">📦 Package Information</h3>
                  </div>
                  <div className="card-body">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">Name:</th>
                          <td>{packageDetail.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Description:</th>
                          <td>{packageDetail.description}</td>
                        </tr>
                        <tr>
                          <th scope="row">Image:</th>
                          <td>
                            <img
                              src={packageDetail.image}
                              alt="Package"
                              className="img-fluid rounded"
                              style={{ maxWidth: "300px" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card mt-4 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h3 className="mb-0">✅ Provided Facilities</h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Meal: {packageDetail.includes_meal == 1 ? "✅" : "❌"}
                      </li>
                      <li className="list-group-item">
                        Hotel:{" "}
                        {packageDetail.includes_hotel == "1" ? "✅" : "❌"}
                      </li>
                      <li className="list-group-item">
                        Bus: {packageDetail.includes_bus == "1" ? "✅" : "❌"}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card mt-4 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">✅ Inclusions</h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {packageDetail.inclusions?.map((item, index) => (
                        <li key={index} className="list-group-item">
                          {item} : ✅
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card mt-4 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h3 className="mb-0">❌ Exclusions</h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {packageDetail.exclusions?.map((item, index) => (
                        <li key={index} className="list-group-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card mt-4 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h3 className="mb-0">💰 Pricing</h3>
                  </div>
                  <div className="card-body">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Adult Price</th>
                          <th>Child Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packageDetail.pricing?.map((price, index) => (
                          <tr key={index}>
                            <td>
                              ৳ {parseFloat(price.adult_price).toLocaleString()}
                            </td>
                            <td>
                              ৳ {parseFloat(price.child_price).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card mt-4 shadow-sm mb-5">
                  <div className="card-header bg-info text-white">
                    <h3 className="mb-0">🚌 Trip Info</h3>
                  </div>
                  <div className="card-body">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">Route:</th>
                          <td>{packageDetail.trip?.route_name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Departure Date:</th>
                          <td>
                            {moment(packageDetail.trip?.departure_time).format(
                              "ll"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Arrival Date:</th>
                          <td>
                            {moment(packageDetail.trip?.arrival_time).format(
                              "ll"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Departure at:</th>
                          <td>{packageDetail.trip?.departure_at}</td>
                        </tr>
                        <tr>
                          <th scope="row">Arrival at:</th>
                          <td>{packageDetail.trip?.arrival_at}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PackageDetails;
