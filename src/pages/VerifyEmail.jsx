import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        alert('Email verified. You can now log in.');
      } catch (err) {
        alert('Verification failed.');
      }
    };
    if (token) verify();
  }, [token]);

  return (
    <div className="text-center mt-10 text-lg font-semibold text-gray-800 dark:text-gray-200">
      Verifying your email...
    </div>
  );
}