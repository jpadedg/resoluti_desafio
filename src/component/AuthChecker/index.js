'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthChecker = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/');
    }
  }, []);

  return children;
};

export default AuthChecker;