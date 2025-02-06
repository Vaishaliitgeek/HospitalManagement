import React from 'react'
import { getToken } from '../utils/auth'
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRouteHead = ({Component}) => {
  const token=getToken()
  var authenticate=false;
 if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if(decodedToken.role==="head"){
        authenticate=true;
      }
      // doctorId = decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  // return token ? <Component /> : <Navigate to="/login" />;
  return authenticate? <Component/>:<Navigate to="/login"/>;
}

export default PrivateRouteHead