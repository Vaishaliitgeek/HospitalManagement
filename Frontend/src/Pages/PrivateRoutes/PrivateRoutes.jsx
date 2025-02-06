import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/auth";

const PrivateRoutes = ({ Component }) => {
  const token = getToken();

  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoutes;