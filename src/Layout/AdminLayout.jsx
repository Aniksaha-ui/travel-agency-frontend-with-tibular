import { Fragment } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import MobileBottomNav from "./common/MobileBottomNav";

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="page">
        <Header></Header>
        {children}
        <MobileBottomNav />
        <Footer></Footer>
      </div>
    </Fragment>
  );
};

export default AdminLayout;
