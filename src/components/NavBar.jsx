import { Link } from "react-router-dom";



export default function NavBar() {

  return (

    <nav className="w-screen fixed top-0 left-0 bg-gray-900">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 h-[50px]">
        <img
          src="/src/assets/img/logo.png"
          alt="Hub Migrante Logo"
          className="h-30 md:h-20 object-contain" />

        <div className="flex items-center gap-3 md:gap-5">
          <button className="text-white text-sm md:text-base hover:text-pink-500 transition-colors cursor-pointer">
            Login
          </button>

          <button className="text-white text-sm md:text-base hover:text-pink-500 transition-colors cursor-pointer">
          Register
          </button>

        </div>
      </div>
    </nav>

  );

}