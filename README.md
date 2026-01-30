# Travel Agency Management System (Admin Frontend)

A comprehensive, role-based dashboard for managing all operations of a travel agency. Built with **React** and **Vite**, this application provides robust tools for managing bookings, logistics, financials, and reporting.

## 🚀 Features

### 1. Operations Dashboard
- **Admin Dashboard**: High-level overview of business metrics.
- **Guide Dashboard**: Dedicated view for guides to see their assigned packages.

### 2. Transport & Logistics
Manage the entire fleet and transportation logistics.
- **Vehicle Management**: Add and manage vehicles.
- **Route Management**: Define travel routes (origins, destinations).
- **Seat Management**: Configure seating arrangements.
- **Trip Management**: Schedule and manage individual trips.
- **Ticket Management**: Handle ticket issuance and tracking.

### 3. Package & Tour Management
Create and sell tour packages.
- **Package Management**: Create, edit, and list tour packages with detailed itineraries and costing.
- **Guide Management**: Assign guides to specific packages.
- **Package Booking Summary**: Track bookings for specific packages.

### 4. Hotel Management
Manage hotel inventory and guest stays.
- **Hotel Listings**: Add and update hotel details.
- **Hotel Check-in**: Manage guest check-ins.

### 5. Booking & CRM
- **Booking Management**: comprehensive view of all client bookings.
- **User Management**: Administer system users and roles.
- **Customer Value Report**: Analyze high-value customers.

### 6. Financial Management
Full financial control and oversight.
- **Transaction Management**: Record and track all financial transactions.
- **Refund Management**: Process and audit refunds.
- **Online Payment Config**: Configure payment gateway settings.
- **Financial Reports**: access detailed financial statements.
  - Account Balance Report
  - Monthly Running Balance

### 7. Analytics & Reporting
Extensive reporting module for data-driven decisions.
- **Vehicle Reports**: Seat occupancy and tracking reports.
- **Performance Reports**: Analyze profitability of **Trips** and **Packages**.
- **Monitoring**: SQL Monitor and system query reports.

---

## 🛠 Tech Stack

- **Core**: [React](https://react.dev/) (v18), [Vite](https://vitejs.dev/)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/), CSS3
- **State Management**: [Recoil](https://recoiljs.org/) for global state.
- **Data Fetching**: Axios, React Query (TanStack Query)
- **Visualization**: Recharts, Chart.js
- **Utilities**:
  - `moment`: Date manipulation.
  - `jspdf` & `html2canvas`: PDF generation (e.g., invoices).
  - `react-toastify`: User notifications.

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-agency-frontend-with-tibular
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Ensure the backend API is running.
   - Update `.env` file if necessary (API endpoints, keys).

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

- **`src/Layout`**: Main layout components including `Sidebar` and `Header` navigation.
- **`src/Views`**: Contains all page components, organized by module (e.g., `Bookings`, `Hotel`, `Reports`).
- **`src/Hooks`**: Custom hooks, primarily `useApi` for centralized API calls.
- **`src/Utils`**:
  - `Functions`: Helper functions (fetchData, localStorage wrappers).
  - `Components`: Reusable UI elements (Loading, Search, Pagination).
  - `Constants`: App-wide constants (SVG icons, text labels).

---

## 🔐 Roles & Permissions

- **Admin**: Full access to all modules including financial reports and user management.
- **Guide**: Limited access to view assigned packages and schedules.

---

## License

Private & Proprietary.
