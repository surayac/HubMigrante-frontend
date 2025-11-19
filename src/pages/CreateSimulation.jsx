import SimulationForm from "../components/SimulationForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateSimulation() {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-gray-50 w-full flex justify-center items-start py-16 px-4">
            <section className="max-w-2xl w-full">

                <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Profile
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Create a New Simulation
                </h1>
                <p className="text-center text-gray-600 mb-10">
                    Fill out the form below to calculate the best visa option for your situation.
                </p>

                <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border">
                    <SimulationForm
                        onClose={() => navigate("/profile")}
                        onSuccess={() => navigate("/profile")}
                    />
                </section>
            </section>
        </section>
    );
}
