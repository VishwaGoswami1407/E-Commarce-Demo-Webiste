import React, { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

export default function Home() {
  const { user, setUser, setIsAuthenticated } = useAuth();

  // ✅ Restore user on refresh from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuthenticatedd');
    if (storedUser && isAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Welcome, {user?.name || 'User'}! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          You are successfully logged in. Explore our features or start shopping!
        </p>
      </div>
    </div>
  );
}
