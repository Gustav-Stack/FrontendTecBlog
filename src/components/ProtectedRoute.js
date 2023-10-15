import { useAuth } from "../AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const { isLoggedIn } = useAuth(); // Correção: Use navigate em vez de Navigate

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
}

export default ProtectedRoute;
