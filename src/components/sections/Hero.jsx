import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/register');
  };

  return (
    <section
      className="relative w-full min-h-screen text-gray-900 pt-[70px] flex flex-col items-center justify-center"
      role="region"
      aria-labelledby="hero-heading"
    >

      <h1
        id="hero-heading"
        className="text-4xl lg:text-6xl font-extrabold mb-10 text-center"
      >
        Hub Migrante
      </h1>

      <section className="flex flex-wrap justify-center items-center gap-3 mb-8">
        <img
          src="/src/assets/img/image1.png"
          alt="View of Barcelona from the Mountain"
          className="w-50 h-50 object-cover shadow-md transition-all duration-300 transform 
          hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer"        />
        <img
          src="/src/assets/img/image2.png"
          alt="View from the airplane window"
          className="w-50 h-50 object-cover shadow-md transition-all duration-300 transform 
          hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer"        />
        <img
          src="/src/assets/img/image3.png"
          alt="View of Sagrada Familia by night"
          className="w-50 h-50 object-cover shadow-md transition-all duration-300 transform 
          hover:scale-105 filter grayscale hover:grayscale-0 cursor-pointer"        />
      </section>

      <section className="w-full bg-gray-200/70 text-center py-8 flex flex-col items-center justify-center">
        <p className="text-xl font-bold">
        Plan your move. Simplify your journey.
        </p>
        <p className="text-base md:text-xl max-w-3xl text-gray-800 mb-5 leading-relaxed px-4">
          Moving abroad is exciting — but it can also be overwhelming.
          Let our Migration Simulator help you discover the best visa options, understand the requirements, and create a clear step-by-step plan to start your new life in Spain with confidence.
          Your path to a new beginning starts here.
        </p>

        <button
          onClick={handleStart}
          className="group inline-flex items-center justify-center gap-1 rounded-xl bg-gray-900 px-8 py-3
                     font-semibold text-lg text-white shadow-md transition-all duration-300 ease-out
                     hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 hover:scale-105
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-400/60 focus-visible:ring-offset-2
                     active:scale-100 active:translate-y-0 cursor-pointer"
          aria-label="Start"
        >
          <span>Start</span>
          <ChevronRight
            size={20}
            aria-hidden="true"
            className="transition-transform duration-300 ease-out group-hover:translate-x-2"
          />
        </button>
      </section>
    </section>
  );
}
