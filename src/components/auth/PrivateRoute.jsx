import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload["role"] || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/nao-autorizado" replace />;
    }

    return children;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
