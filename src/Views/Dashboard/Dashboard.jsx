import { useQuery } from "@tanstack/react-query";
import useApi from "../../Hooks/useApi";
import AdminLayout from "../../Layout/AdminLayout";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  backgroundColors,
  borderColors,
  pieChartOptions,
} from "../../Utils/Functions/chart";
import {
  CHART_TITLE_FOR_ORIGIN_WISE_TRIP_COUNT,
  CHART_TITLE_FOR_PAYMENT_TOTAL_AMOUNT,
  CHART_TITLE_FOR_PAYMENT_TOTAL_TRANSACTION,
} from "../../Utils/Constants/text";
ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const api = useApi();

  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboardInfo"], // Query key (array or string)
    queryFn: api.dashboardInformation, // Function to fetch data
    refetchInterval: 60000, // Refetch every 1 minute
  });

  if (data && data?.data && data.data.paymentData) {
    var paymentData = data?.data?.paymentData;
    var paymentLabels = paymentData.map((item) => item.payment_method);
    var totalPaymentAmountValues = paymentData.map((item) =>
      parseFloat(item.total_amount)
    );
    var totalPaymentCountValues = paymentData.map((item) =>
      parseFloat(item.payment_held)
    );
  }

  if (data && data?.data && data?.data.tripData) {
    var tripData = data?.data?.tripData;
    var labels = tripData.map((item) => item.origin);
    var originWiseTripExistCount = tripData.map((item) =>
      parseFloat(item.trip_exist ?? 5)
    );
  }

  const ChannelWiseTotalAmountInfo = {
    labels: paymentLabels,
    datasets: [
      {
        label: "Total Amount",
        data: totalPaymentAmountValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const ChannelWiseTotalAmountInfoOptions = pieChartOptions(
    CHART_TITLE_FOR_PAYMENT_TOTAL_AMOUNT
  );

  const OriginWiseTripExistInfo = {
    labels: labels,
    datasets: [
      {
        label: "Total Trip",
        data: originWiseTripExistCount,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const ChannelWiseTotalTransactionInfo = {
    labels: paymentLabels,
    datasets: [
      {
        label: "Total Amount",
        data: totalPaymentCountValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const ChannelWiseTotalTransactionInfoOptions = pieChartOptions(
    CHART_TITLE_FOR_PAYMENT_TOTAL_TRANSACTION
  );

  const OriginWiseTripExistInfoOptions = pieChartOptions(
    CHART_TITLE_FOR_ORIGIN_WISE_TRIP_COUNT
  );

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
            <h3 className="text-center text-primary">Dashboard Information</h3>
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

            <div className="row mx-auto ">
              <h3 className="text-center text-primary mt-2">
                Channel Wise Summery
              </h3>

              <div className="card col-md-4 col-lg-4 col-12 p-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Channel Name</th>
                      <th>Total Transaction</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.paymentData?.map((item) => (
                      <tr key={item.channelName}>
                        <td>{item.payment_method}</td>
                        <td>{item.payment_held}</td>
                        <td>{item.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card col-md-4 col-lg-3 col-12 mx-5">
                <Pie
                  data={ChannelWiseTotalAmountInfo}
                  options={ChannelWiseTotalAmountInfoOptions}
                />
              </div>
              <div className="card col-md-4 col-lg-3 col-12 mx-5">
                <Pie
                  data={ChannelWiseTotalTransactionInfo}
                  options={ChannelWiseTotalTransactionInfoOptions}
                />
              </div>

              <h3 className=" text-primary text-center mt-2">
                Origin Wise Summery
              </h3>

              <div className="card col-md-4 col-lg-4 col-12 p-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Origin</th>
                      <th>Available Trips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.tripData?.map((item) => (
                      <tr key={item.origin}>
                        <td>{item.origin}</td>
                        <td>{item.trip_exist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card col-md-4 col-lg-3 col-12 mx-5">
                <Pie
                  data={OriginWiseTripExistInfo}
                  options={OriginWiseTripExistInfoOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
