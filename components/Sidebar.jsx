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

const Sidebar = ({ selectedGenre, setSelectedGenre }) => {
  const [user, setUser] = useState(null);

  // 🟢 Load user from localStorage (for session persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem("moonchillUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🟢 Logout function
  const handleLogout = () => {
    localStorage.removeItem("moonchillUser");
    setUser(null);
    window.location.href = "/"; // Redirect to home
  };

  // 🟢 Common Menu Items
  const menuItems = [
    { id: "home", name: "Home", icon: HiHome, href: "/home" },
    // { id: "search", name: "Search", icon: HiMagnifyingGlass, href: "/home" },
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
    //   href: "/mainplans",
    // },
  ];

  return (
    <>
      <div className="w-16 bg-gray-900 flex flex-col items-center py-6 space-y-8">
        {/* 🔹 Main Navigation */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedGenre === item.id;

          return (
            <Link
              href={item.href}
              key={item.id}
              onClick={() => setSelectedGenre(item.id)}
              passHref
              className={`p-3 rounded-lg transition-colors duration-200 flex justify-center items-center ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              title={item.name}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}

        {/* 🔹 Divider */}
        {/* <div className="w-10 h-[1px] bg-gray-700 my-4" /> */}

        {/* 🔹 Auth Section */}
        {user ? (
          <>
            {/* Profile Button */}
            <Link
              href="/profile"
              title="Profile"
              className="p-3 rounded-lg bg-gray-700 text-white hover:bg-blue-600 transition-all duration-200"
            >
              <HiUserCircle className="w-6 h-6" />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
            >
              <HiArrowLeftOnRectangle className="w-6 h-6" />
            </button>
          </>
        ) : (
          <>
            {/* Login Button */}
            <Link
              href="/login"
              title="Login"
              className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
            >
              <HiArrowRightOnRectangle className="w-6 h-6" />
            </Link>

            {/* Signup Button */}
            <Link
              href="/signup"
              title="Sign Up"
              className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
            >
              <HiUserCircle className="w-6 h-6" />
            </Link>
          </>
        )}

        {/* 🔹 WhatsApp Floating Button */}
        <FloatingWhatsApp
          phoneNumber="+919870465653"
          accountName="Support"
          allowEsc
          allowClickAway
          notification
          notificationSound
          avatar="/logo.png"
          chatMessage="Hello! How can we help you?"
          placeholder="Type a message..."
          className="fixed bottom-4 right-4 z-50"
          onClick={() => console.log("WhatsApp button clicked")}
        />
      </div>
    </>
  );
};

export default Sidebar;
