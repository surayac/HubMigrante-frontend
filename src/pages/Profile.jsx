import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/ApiUser";
import { Trash2 } from "lucide-react";


export default function Profile() {

    const { token } = useAuth();

    const [user, setUser] = useState(null);
    const [simulations, setSimulations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setLoading(false); // Garante que o estado de carregamento termine.
            return;
        }

        async function loadUser() {
            try {
                const res = await api.get("/api/v1/users/me");
                setUser(res.data);
            } catch (err) {
                console.error("Error loading user:", err);
                setError("Failed to load user data. Please log in again.");
                setLoading(false);
            }
        }

        //  loadUser();
        // }, [token]);

        // useEffect(() => {
        //  if (!user) return;

        async function loadSimulations() {
            try {
                const res = await api.get("/api/v1/simulations/me");
                setSimulations(res.data);
            } catch (err) {
                console.error("Error loading simulations:", err);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
        loadSimulations();

    }, [token]);

    if (!token) return <p className="text-center mt-10">You are not logged in.</p>;
    if (loading) return <p className="text-center mt-10">Loading…</p>;

    return (
        <section className="min-h-screen w-full bg-white text-gray-900">

            <div className="max-w-3xl mx-auto mt-20 px-6 pb-16 flex flex-col items-center gap-10">

                {/* CARD 1 */}
                <div className="w-full bg-gray-100/80 rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Welcome back, {user?.name || "User"}!
                    </h2>
                    <p className="text-gray-600">{user?.email}</p>

                    <button className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-xl font-medium shadow-md transition-all hover:scale-105 hover:bg-gray-800 cursor-pointer">
                        Edit Profile
                    </button>
                </div>

                {/* CARD 2 */}
                <div className="w-full bg-gray-100/80 rounded-2xl p-8 shadow-md flex flex-col items-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        My Simulations
                    </h3>

                    {loading && <p className="text-gray-600">Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!loading && simulations.length === 0 && (
                        <p className="text-gray-700">You haven't created any simulations yet.</p>
                    )}

                    {!loading && simulations.length > 0 && (
                        <div className="mt-6 grid md:grid-cols-2 gap-6 w-full">
                            {simulations.map((sim) => (
                                <div key={sim.simulationId} className="bg-white rounded-xl p-5 shadow-sm border">
                                    <button
                                        
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: "8px",
                                        }}
                                        aria-label="Delete"
                                    >
                                        <Trash2 size={24} 
                                        className="stroke-[#021746] hover:stroke-blue-600 transition-transform duration-200 transform hover:scale-110 cursor-pointer"
                                        strokeWidth={2} />                                    </button>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {sim.visaType}
                                    </h4>
                                    <p className="text-gray-700">Created At: {sim.createdAt}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <button className="mt-8 bg-gray-900 text-white px-7 py-3 rounded-xl font-medium shadow-md transition-all hover:scale-105 hover:bg-gray-800 cursor-pointer mx-auto">
                        Create Simulation
                    </button>
                </div>

            </div>
        </section>
    );
}
