import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Slidebar";
import Topbar from "../components/topBar/Topbar";
import { useSelector } from "react-redux";
import "../App.css";

export const ProtectedRoutes = () => {
  /*estamos usando redux */
  const userAdmin = useSelector((state) => state.user.currentUser);
  let admin = false;
  if (userAdmin !== null) {
    admin = userAdmin.isAdmin;
  }
  console.log(admin);
  if (admin) {
    <Navigate to="/home" />;
    return (
      <>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Outlet />
        </div>
      </>
    );
  }
  return <Navigate to="/" />;
};
