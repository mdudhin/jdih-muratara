import Footer from "../../components/user/footer";
import Navbar from "../../components/user/navbar";
import { Outlet } from "react-router-dom";

const LayoutUser = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutUser;
