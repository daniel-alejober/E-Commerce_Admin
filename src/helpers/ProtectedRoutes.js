import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Slidebar";
import Topbar from "../components/topBar/Topbar";
import '../App.css';

export const ProtectedRoutes = () => {
  const user = true;
  if (user) {
    return(
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
    )
  }
  return <Navigate to="/login" />;
};
