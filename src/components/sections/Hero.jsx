import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-br from-blue-500 via-orange-400 to-blue-300 text-white pt-[70px] overflow-hidden flex items-center justify-center"
      role="region"
      aria-labelledby="hero-heading"
    >
      <div className="px-4 sm:px-6 lg:px-16 xl:px-24 py-20 lg:py-32 max-w-5xl text-center">
        <h1
          id="hero-heading"
          className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight"
        >
          HubMigrante
        </h1>

        <p
          className="text-lg lg:text-2xl mb-10 text-orange-50 max-w-3xl mx-auto"
        >
         Your plan starts here!
        </p>

        <button
          onClick={handleRegister}
          className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4
                     font-semibold text-lg text-orange-700 shadow-md transition-all duration-300 ease-out
                     hover:shadow-2xl hover:shadow-orange-600/50 hover:-translate-y-1 hover:scale-105
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2
                     active:scale-100 active:translate-y-0"
          aria-label="Comenzar gratis y registrarse"
        >
          <span className="relative z-10">Comenzar gratis</span>
          <ChevronRight
            size={24}
            aria-hidden="true"
            className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-2"
          />
        </button>
      </div>
    </section>
  );
}
