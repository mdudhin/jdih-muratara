import Footer from "../../components/user/footer";
import Navbar from "../../components/user/navbar";
import { Outlet } from "react-router-dom";

const LayoutUser = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutUser;
