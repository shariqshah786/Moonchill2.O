"use client";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiMagnifyingGlass,
  HiMiniSquares2X2,
  HiCog6Tooth,
  HiUserCircle,
  HiArrowRightOnRectangle,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";
import Link from "next/link";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const MobileNav = ({ selectedGenre, setSelectedGenre }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("moonchillUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("moonchillUser");
    setUser(null);
    window.location.href = "/";
  };

  const menuItems = [
    { id: "home", name: "Home", icon: HiHome, href: "/" },
    // { id: "search", name: "Search", icon: HiMagnifyingGlass, href: "/" },
    {
      id: "downloads",
      name: "Categories",
      icon: HiMiniSquares2X2,
      href: "/mainplans",
    },
    // {
    //   id: "settings",
    //   name: "Settings",
    //   icon: HiCog6Tooth,
    //   href: "/settings",
    // },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
        <div className="flex justify-around py-2">
          {/* 🔹 Main Menu */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedGenre === item.id;

            return (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => setSelectedGenre(item.id)}
                passHref
                className={`p-3 rounded-lg transition-colors duration-200 flex flex-col justify-center items-center ${
                  isActive
                    ? "bg-gray-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}

          {/* 🔹 User Buttons */}
          {user ? (
            <>
              {/* Profile */}
              <Link
                href="/profile"
                className="p-3 rounded-lg text-white flex flex-col items-center hover:bg-blue-600"
              >
                <HiUserCircle className="w-6 h-6" />
                <span className="text-[10px]">Profile</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-3 rounded-lg text-red-400 flex flex-col items-center hover:bg-red-700 hover:text-white"
              >
                <HiArrowLeftOnRectangle className="w-6 h-6" />
                <span className="text-[10px]">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="p-3 rounded-lg text-blue-400 flex flex-col items-center hover:bg-blue-700 hover:text-white"
              >
                <HiArrowRightOnRectangle className="w-6 h-6" />
                <span className="text-[10px]">Login</span>
              </Link>

              {/* Signup */}
              <Link
                href="/signup"
                className="p-3 rounded-lg text-green-400 flex flex-col items-center hover:bg-green-700 hover:text-white"
              >
                <HiUserCircle className="w-6 h-6" />
                <span className="text-[10px]">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* WhatsApp Button */}
      <FloatingWhatsApp
        phoneNumber="+919136653743"
        accountName="Support"
        allowEsc
        notification
        notificationSound
        avatar="/logo.png"
        chatMessage="Hello! How can we help you?"
        placeholder="Type a message..."
        className="fixed bottom-20 right-4 z-50"
      />
    </>
  );
};

export default MobileNav;
