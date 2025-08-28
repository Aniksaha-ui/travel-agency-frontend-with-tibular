import { useQuery } from "@tanstack/react-query";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";

const Dashboard = () => {
  const api = useApi();

  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboardInfo"], // Query key (array or string)
    queryFn: api.dashboardInformation, // Function to fetch data
    refetchInterval: 60000, // Refetch every 1 minute
  });

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
            <div class="row row-cards">
              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">Total Routes</div>
                        <div className="text-muted">
                          {data?.data?.totalRoute}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">Total Vehicles</div>
                        <div className="text-muted">
                          {data?.data?.totalVehicles}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">Total Trips</div>
                        <div className="text-muted">
                          {data?.data?.totalTours}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">Total Bookings</div>
                        <div className="text-muted">
                          {data?.data?.totalBookings}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">
                          This Month Booking
                        </div>
                        <div className="text-muted">
                          {data?.data?.thisMonthTotalBookings}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">
                          Total Hotel Booking
                        </div>
                        <div className="text-muted">
                          {data?.data?.totalHotelBookings}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">
                          Total Package Booking
                        </div>
                        <div className="text-muted">
                          {data?.data?.totalPackageBookings}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">
                          Total Transaction
                        </div>
                        <div className="text-muted">
                          {data?.data?.totalTransaction}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">
                          Total Backend table
                        </div>
                        <div className="text-muted">
                          {data?.data?.totalTable}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">Total Payment</div>
                        <div className="text-muted">
                          {data?.data?.totalPayments}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span className="bg-primary text-white avatar">
                          <i className="fa fa-shopping-cart text-white"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium">
                          Total Monthly Payment
                        </div>
                        <div className="text-muted">
                          {data?.data?.monthlyPayments}
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
