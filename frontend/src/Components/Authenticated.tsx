import React, { useEffect } from 'react';
import { useUser } from '../Context/User';
import { useNavigate } from 'react-router-dom';

interface AuthenticatedProps {
  children: React.ReactNode; 
}

const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const { user } = useUser();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!user) {
      navigate("/");  
    }
  }, [user, navigate]); 

  if (!user) return null;

  return <>{children}</>; 
};

export default Authenticated;
