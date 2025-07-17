import { LogOut, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="text-2xl font-bold">Marwadi-Commerce</span>
        </Link>

        {/* Toggle Button (Mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-center">
            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-4 hover:bg-gray-100 md:hover:bg-transparent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/products"
                    className="block py-2 px-4 hover:bg-gray-100 md:hover:bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product/add"
                    className="block py-2 px-4 hover:bg-gray-100 md:hover:bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="block py-2 px-4 hover:bg-gray-100 md:hover:bg-transparent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mx-auto" />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
