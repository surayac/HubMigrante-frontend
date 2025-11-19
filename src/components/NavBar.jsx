import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-screen fixed top-0 left-0 bg-gray-900 z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 h-[50px]">

        <Link to="/" className="flex items-center gap-1">
          <span className="text-4xl md:text-3xl font-heading font-bold tracking-tight">
            <span className="text-[#4C92E7]">H</span>
            <span className="text-[#FFFFFF]">M</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">

          {!token && (
            <>
              <Link
                to="/login"
                className="text-white font-bold text-sm md:text-base hover:text-[#4C92E7] transition-colors cursor-pointer"
              >
                LOGIN
              </Link>

              <Link
                to="/register"
                className="text-white font-bold text-sm md:text-base hover:text-[#4C92E7] transition-colors cursor-pointer"
              >
                REGISTER
              </Link>
            </>
          )}

          {token && (
            <>
              <Link
                to="/profile"
                className="text-white font-bold text-sm md:text-base hover:text-[#4C92E7] transition-colors cursor-pointer"
              >
                PROFILE
              </Link>

              <button
                onClick={handleLogout}
                className="text-white font-bold text-sm md:text-base hover:text-red-400 transition-colors cursor-pointer"
              >
                LOGOUT
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
