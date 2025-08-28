import {
  HiHome,
  HiMagnifyingGlass,
  HiArrowDownTray,
  HiCog6Tooth,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import Link from "next/link";

const Sidebar = ({ selectedGenre, setSelectedGenre }) => {
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
    <div className="w-16 bg-gray-900 flex flex-col items-center py-6 space-y-8">
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
    </div>
  );
};

export default Sidebar;
