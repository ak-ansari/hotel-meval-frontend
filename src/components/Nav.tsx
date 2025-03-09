import { HomeIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../hooks";

export default function Navbar() {
  const {isAuthenticated,logout} = useAuth();

  return (
    <nav className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center shadow-lg ">
      <span className="text-3xl font-bold">Hotel Maven</span>
      <a href="/" className="hover:opacity-80">
        <HomeIcon className="h-5 w-5" />
      </a>
      {isAuthenticated && (
        <button
          className="text-white border-white hover:text-green-600 cursor-pointer"
          onClick={() => logout()}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
