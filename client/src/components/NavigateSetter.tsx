import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from '../lib/navigation';

const NavigateSetter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};

export default NavigateSetter;
