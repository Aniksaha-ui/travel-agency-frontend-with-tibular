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
import AccountBalanceReport from "./Views/Reports/AccountReports/accountBalanceReport.jsx";
import Bookings from "./Views/Bookings/Bookings.jsx";
import Packages from "./Views/Packages/Packages.jsx";
import PackageDetails from "./Views/Packages/PackageDetails.jsx";
import PackageAdd from "./Views/Packages/PackageAdd.jsx";
import VehicleTrackingReport from "./Views/Reports/VehicleTrackingReport/VehicleTrackingReport.jsx";
import Refunds from "./Views/Refunds/Refunds.jsx";
import BookingInvoice from "./Views/Bookings/BookingInvoice.jsx";
import GuideInformation from "./Views/Guides/Guides.jsx";
import GuideForm from "./Views/Guides/GuideForm.jsx";
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer></ToastContainer>

        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="admin/dashboard" element={<Dashboard />}></Route>
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
              path="admin/vehicletrackingreport"
              element={<VehicleTrackingReport />}
            ></Route>

            <Route
              path="admin/tripPerformance"
              element={<TripPerformance />}
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
              path="admin/tickets"
              element={<Ticket />}
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
              element={<GuidePackageCostingForm action="add"/>}
            ></Route>

              <Route
              path="guide/my-packageCosting/addCosting/:packageId/:costId"
              element={<GuidePackageCostingForm action="update"/>}
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
  </StrictMode>
);
