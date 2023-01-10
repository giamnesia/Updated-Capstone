import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();

  if (!user) {
    toast.error("Please login first", {
      autoClose: 6000,
      pauseOnHover: false,
      position: "bottom-right",
    });
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;