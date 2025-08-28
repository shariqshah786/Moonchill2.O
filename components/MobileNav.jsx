import {
  HiHome,
  HiArrowDownTray,
  HiChatBubbleLeftRight,
  HiCog6Tooth,
  HiMiniSquares2X2,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import Link from "next/link";

const MobileNav = ({ selectedGenre, setSelectedGenre }) => {
  const menuItems = [
    { id: "home", name: "Home", icon: HiHome, href: "/home" },
    { id: "search", name: "Search", icon: HiMagnifyingGlass, href: "/home" },
    {
      id: "downloads",
      name: "Catagories",
      icon: HiMiniSquares2X2,
      href: "/mainplans",
    },
    {
      id: "settings",
      name: "Settings",
      icon: HiCog6Tooth,
      href: "/mainplans",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-50">
      <div className="flex justify-around py-2">
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
                  ? "bg-gray-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              title={item.name}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
