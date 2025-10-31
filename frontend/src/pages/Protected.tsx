import { useNavigate } from 'react-router';

import { useEffect, type ReactNode } from 'react';



const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {

        navigate("/login?unauthorized=true", { replace: true});
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
