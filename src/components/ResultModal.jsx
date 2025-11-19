import { X } from "lucide-react";

export default function ResultModal({ open, onClose, data }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4 z-50">
            <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                    Simulation Result
                </h2>

                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-800">
                        Visa type: <span className="text-blue-700">{data.visaType}</span>
                    </p>

                    <p className="mt-3 text-gray-700 leading-relaxed">
                        {data.message}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
