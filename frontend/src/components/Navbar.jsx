import { LogOut, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === "true";
    const navigate = useNavigate();

   function handleLogout() {
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated'); // ✅ Correct key
  navigate('/login');
}

    return (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                
                {/* 🔗 Logo Link */}
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="KLE Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Marwadi-Commerce</span>
                </Link>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col justify-center items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">

                        {/* 🔓 Not Logged In */}
                        {!isLoggedIn && (
                            <li>
                                <Link to="/login" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                                    Login / Register
                                </Link>
                            </li>
                        )}

                        {/* 🔐 Logged In */}
                        {isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/products" className="block py-2 px-3 text-black rounded-sm md:bg-transparent md:p-0">
                                        Products
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/product/add" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                                        Add Products
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/cart" className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black md:p-0">
                                        <ShoppingCart className="h-5 w-5" />
                                    </Link>
                                </li>

                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar