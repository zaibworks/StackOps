import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProviderType = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProviderType) => {
  const { user} = useAuth();

  // Auth check complete + user nahi mila
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // User authenticated
  return children;
};

export default ProtectedRoute;