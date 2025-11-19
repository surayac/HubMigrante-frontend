import { Trash2 } from "lucide-react";

export default function SimulationCard({ simulation, onDelete, deleting }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border relative">

      <button
        onClick={onDelete}
        aria-label={`Delete simulation ${simulation.visaType}`}
        title="Delete"
        disabled={deleting}
        className="absolute top-3 right-3 inline-flex items-center justify-center p-1"
      >
        <Trash2
          size={20}
          className={`stroke-[#021746] transition-transform duration-200 transform ${
            deleting ? "opacity-50" : "hover:stroke-blue-600 hover:scale-110 cursor-pointer"
          }`}
          strokeWidth={2}
        />
      </button>

      <h4 className="font-semibold text-gray-900 mb-1">{simulation.visaType}</h4>

      <p className="text-gray-700">Created At: {simulation.createdAt}</p>

      {simulation.message && (
        <p className="text-gray-700 text-sm italic mt-2">
          {simulation.message}
        </p>
      )}
    </div>
  );
}
