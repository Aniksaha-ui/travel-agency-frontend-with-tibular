import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Views/Login/Login.jsx";
import { RecoilRoot } from "recoil";
import Users from "./Views/Users/Users.jsx";
import RouteInformation from "./Views/Routes/Routes.jsx";
import AddRoutes from "./Views/Routes/AddRoutes.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleInformation from "./Views/Vehicles/Vehicles.jsx";
import AddVehicles from "./Views/Vehicles/AddVehicles.jsx";
import SeatsInformation from "./Views/Seats/Seats.jsx";
import AddSeats from "./Views/Seats/AddSeats.jsx";
import VehicleWiseSeatReport from "./Views/Reports/VehicleReports/VehicleWiseSeatReport.jsx";
import VehicleSeatLayout from "./Views/Reports/VehicleReports/vehicleSeatLayout.jsx";
import Trips from "./Views/Trips/Trips.jsx";
import FormTrips from "./Views/Trips/AddTrips.jsx";
import VehicleBookingForTrip from "./Views/Vehicles/VehicleBookingForTrip.jsx";
import TripsDetails from "./Views/Trips/TripsDetails.jsx";
import AccountBalanceReport from "./Views/Reports/AccountReports/AccountBalance/AccountBalance.jsx";
import AccountHistoryReport from "./Views/Reports/AccountReports/AccountHistory/AccountHistory.jsx";
import DailyAccountBalance from "./Views/Reports/AccountReports/DailyAccountBalance/DailyAccountBalance.jsx";
import SalesPanel from "./Views/Reports/AccountReports/SalesPanel.jsx";
import Bookings from "./Views/Bookings/Bookings.jsx";
import Packages from "./Views/Packages/Packages.jsx";
import PackageDetails from "./Views/Packages/PackageDetails.jsx";
import PackageAdd from "./Views/Packages/PackageAdd.jsx";
import VehicleTrackingReport from "./Views/Reports/VehicleTrackingReport/VehicleTrackingReport.jsx";
import Refunds from "./Views/Refunds/Refunds.jsx";
import BookingInvoice from "./Views/Bookings/BookingInvoice.jsx";
import GuideInformation from "./Views/Guides/Guides.jsx";
import GuideForm from "./Views/Guides/GuideForm.jsx";
import VisaCountries from "./Views/VisaCountries/List/VisaCountries.jsx";
import VisaCountryForm from "./Views/VisaCountries/Form/VisaCountryForm.jsx";
import VisaTypes from "./Views/VisaTypes/List/VisaTypes.jsx";
import VisaTypeForm from "./Views/VisaTypes/Form/VisaTypeForm.jsx";
import VisaRequirements from "./Views/VisaRequirements/List/VisaRequirements.jsx";
import VisaRequirementForm from "./Views/VisaRequirements/Form/VisaRequirementForm.jsx";
import TripPerformance from "./Views/Reports/TripPerformance/TripPerformance.jsx";
import PackagePerformance from "./Views/Reports/PackagePerformance/PackagePerformance.jsx";
import CustomerValueReport from "./Views/Reports/CustomerValueReport/CustomerValueReport.jsx";
import HotelInformation from "./Views/Hotel/Hotel.jsx";
import HotelForm from "./Views/Hotel/HotelForm.jsx";
import HotelCheckIn from "./Views/HotelCheckIn/HotelCheckin.jsx";
import Dashboard from "./Views/Dashboard/Dashboard.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MonthlyRunningBalance from "./Views/Reports/MonthlyRunningBalance/MonthlyRunningBalance.jsx";
import GuidePackage from "./Views/Guide-Package/GuidePackage.jsx";
import GuidePackageFeedBackList from "./Views/Guide-Package/GuidePackageFeedBackList.jsx";
import GuidePackageCosting from "./Views/Guide-Package-costing/GuidePackageCosting.jsx";
import GuidePackageForm from "./Views/Guide-Package-costing/GuidePackageForm.jsx";
import GuidePackageCostingForm from "./Views/Guide-Package-costing/GuidePackageForm.jsx";
import FinancialReport from "./Views/Reports/FinancialReport/FinancialReport.jsx";
import Ticket from "./Views/Tickets/Ticket.jsx";
import Transactions from "./Views/Transactions/Transactions.jsx";
import Monitoring from "./Views/Monitoring/Monitoring.jsx";
import PackageSummary from "./Views/PacakgeSummary/PackageSummary.jsx";
import OnlinePaymentConfig from "./Views/OnlinePaymentConfig/OnlinePaymentConfig.jsx";
import OnlinePaymentConfigForm from "./Views/OnlinePaymentConfig/OnlinePaymentConfigForm.jsx";
import ZoomBlocker from "./Utils/Components/ZoomBlocker.jsx";
import MenuItems from "./Views/Menu/MenuItems.jsx";
import MenuItemForm from "./Views/Menu/MenuItemForm.jsx";
import TripUsers from "./Views/Trips/TripUsers.jsx";
import BlogBuilder from "./Views/Blog/BlogBuilder.jsx";
import BlogList from "./Views/Blog/BlogList.jsx";
import LowOccupancyTripReport from "./Views/Reports/TripReports/LowOccupancyTripReport.jsx";
import UserGrowthReport from "./Views/Reports/UserGrowthReport/UserGrowthReport.jsx";
import RefundStatusReport from "./Views/Reports/ManagementReports/RefundStatusReport.jsx";
import AvgBookingValueReport from "./Views/Reports/ManagementReports/AvgBookingValueReport.jsx";
import LowPerformingPackages from "./Views/Reports/ManagementReports/LowPerformingPackages.jsx";
import HighCancellationPackages from "./Views/Reports/ManagementReports/HighCancellationPackages.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ZoomBlocker />
      <BrowserRouter>
        <ToastContainer></ToastContainer>

        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="admin/dashboard" element={<Dashboard />}></Route>
            <Route path="admin/blog-list" element={<BlogList />}></Route>
            <Route
              path="admin/blog/add"
              element={<BlogBuilder action="add" />}
            ></Route>
            <Route
              path="admin/blog/update/:id"
              element={<BlogBuilder action="update" />}
            ></Route>
            <Route path="admin/menu-items" element={<MenuItems />}></Route>
            <Route
              path="admin/menu-items/add"
              element={<MenuItemForm action="add" />}
            ></Route>
            <Route
              path="admin/menu-items/update/:id"
              element={<MenuItemForm action="update" />}
            ></Route>
            <Route path="admin/routes" element={<RouteInformation />}></Route>
            <Route path="admin/routes/add" element={<AddRoutes />}></Route>
            <Route path="/admin/users" element={<Users />}></Route>
            <Route
              path="admin/vehicles"
              element={<VehicleInformation />}
            ></Route>
            <Route path="admin/vehicles/add" element={<AddVehicles />}></Route>
            <Route
              path="admin/vehicles/bookfortrip/:id"
              element={<VehicleBookingForTrip />}
            ></Route>
            <Route path="admin/seat" element={<SeatsInformation />}></Route>
            <Route path="admin/seat/add" element={<AddSeats />}></Route>

            <Route
              path="admin/vehicleSeatLayout/:id"
              element={<VehicleSeatLayout />}
            ></Route>
            <Route path="admin/trips" element={<Trips />}></Route>
            <Route path="admin/trips/users/:id" element={<TripUsers />}></Route>
            <Route
              path="admin/trips/:tourId"
              element={<TripsDetails />}
            ></Route>
            <Route
              path="admin/trips/add"
              element={<FormTrips action="add" />}
            ></Route>
            <Route
              path="/admin/trips/update/:id"
              element={<FormTrips action="update" />}
            ></Route>

            <Route path="admin/bookings" element={<Bookings />}></Route>
            <Route
              path="admin/bookinginvoice/:id"
              element={<BookingInvoice />}
            ></Route>

            <Route path="admin/packages" element={<Packages />}></Route>
            <Route
              path="admin/packages/:id"
              element={<PackageDetails />}
            ></Route>

            <Route path="/admin/packages/add" element={<PackageAdd />}></Route>
            <Route
              path="/admin/packages/update/:id"
              element={<PackageAdd action="update" />}
            ></Route>

            <Route path="/admin/refunds" element={<Refunds />}></Route>

            <Route path="admin/guide" element={<GuideInformation />}></Route>
            <Route
              path="admin/guide/add"
              element={<GuideForm action="add" />}
            ></Route>

            <Route
              path="admin/guide/update/:id"
              element={<GuideForm action="update" />}
            ></Route>

            <Route
              path="admin/visa/countries"
              element={<VisaCountries />}
            ></Route>
            <Route
              path="admin/visa/countries/add"
              element={<VisaCountryForm action="add" />}
            ></Route>
            <Route
              path="admin/visa/countries/update/:id"
              element={<VisaCountryForm action="update" />}
            ></Route>

            <Route path="admin/visa/types" element={<VisaTypes />}></Route>
            <Route
              path="admin/visa/types/add"
              element={<VisaTypeForm action="add" />}
            ></Route>
            <Route
              path="admin/visa/types/update/:id"
              element={<VisaTypeForm action="update" />}
            ></Route>
            <Route
              path="admin/visa/requirements"
              element={<VisaRequirements />}
            ></Route>
            <Route
              path="admin/visa/requirements/add"
              element={<VisaRequirementForm action="add" />}
            ></Route>
            <Route
              path="admin/visa/requirements/update/:id"
              element={<VisaRequirementForm action="update" />}
            ></Route>

            <Route path="admin/hotel" element={<HotelInformation />}></Route>
            <Route
              path="admin/hotel/add"
              element={<HotelForm action="add" />}
            ></Route>

            <Route
              path="admin/hotel/update/:id"
              element={<HotelForm action="update" />}
            ></Route>

            <Route
              path="admin/hotel/checkin"
              element={<HotelCheckIn />}
            ></Route>

            {/* reports */}
            <Route
              path="admin/vehiclewiseseatreport"
              element={<VehicleWiseSeatReport />}
            ></Route>

            <Route
              path="admin/account/balance"
              element={<AccountBalanceReport />}
            ></Route>
            <Route
              path="admin/account/history"
              element={<AccountHistoryReport />}
            ></Route>
            <Route
              path="admin/account/daily-balance"
              element={<DailyAccountBalance />}
            ></Route>
            <Route
              path="admin/account/overall-sales"
              element={<SalesPanel />}
            ></Route>
            <Route
              path="admin/account/route-wise-sales"
              element={<SalesPanel />}
            ></Route>
            <Route
              path="admin/account/ticket-status-report"
              element={<SalesPanel />}
            ></Route>

            <Route
              path="admin/vehicletrackingreport"
              element={<VehicleTrackingReport />}
            ></Route>

            <Route
              path="admin/tripPerformance"
              element={<TripPerformance />}
            ></Route>
            <Route
              path="admin/low-occupancy-report"
              element={<LowOccupancyTripReport />}
            ></Route>

            <Route
              path="admin/packagePerformance"
              element={<PackagePerformance />}
            ></Route>

            <Route
              path="admin/customerValueReport"
              element={<CustomerValueReport />}
            ></Route>

            <Route
              path="admin/monthRunningBalance"
              element={<MonthlyRunningBalance />}
            ></Route>

            <Route
              path="admin/financialReport"
              element={<FinancialReport />}
            ></Route>

            <Route
              path="admin/user-growth-report"
              element={<UserGrowthReport />}
            ></Route>

            <Route
              path="admin/refund-status-report"
              element={<RefundStatusReport />}
            ></Route>

            <Route
              path="admin/avg-booking-value-report"
              element={<AvgBookingValueReport />}
            ></Route>

            <Route
              path="admin/low-performing-packages"
              element={<LowPerformingPackages />}
            ></Route>

            <Route
              path="admin/high-cancellation-packages"
              element={<HighCancellationPackages />}
            ></Route>

            <Route path="admin/tickets" element={<Ticket />}></Route>

            <Route path="admin/transactions" element={<Transactions />}></Route>

            <Route path="admin/monitoring" element={<Monitoring />}></Route>

            <Route
              path="admin/package-summary"
              element={<PackageSummary />}
            ></Route>

            <Route
              path="admin/online-payment-configure"
              element={<OnlinePaymentConfig />}
            ></Route>

            <Route
              path="admin/online-payment-configure/add"
              element={<OnlinePaymentConfigForm action="add" />}
            ></Route>

            <Route
              path="admin/online-payment-configure/update/:id"
              element={<OnlinePaymentConfigForm action="update" />}
            ></Route>

            <Route
              path="guide/myAssignPackages"
              element={<GuidePackage />}
            ></Route>

            <Route
              path="guide/my-packageCosting/:id"
              element={<GuidePackageCosting />}
            ></Route>

            <Route
              path="guide/my-packageCosting/addCosting/:packageId"
              element={<GuidePackageCostingForm action="add" />}
            ></Route>

            <Route
              path="guide/my-packageCosting/addCosting/:packageId/:costId"
              element={<GuidePackageCostingForm action="update" />}
            ></Route>

            <Route
              path="guide/my-feedback/:id"
              element={<GuidePackageFeedBackList />}
            ></Route>

            {/* reports */}
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
