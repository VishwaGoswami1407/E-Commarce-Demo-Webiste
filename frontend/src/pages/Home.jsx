import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const isAuth = localStorage.getItem("isAuthenticated");
    if (storedUser && isAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-600 mb-4">
          Welcome, {user?.name || "User"}! 🎉
        </h1>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          You are successfully logged in. Explore our features or start
          shopping!
        </p>
      </div>
    </div>
  );
}
