import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/ApiUser";
import { Trash2, LogOut, Edit } from "lucide-react";
import EditProfileForm from "../components/EditProfileForm";
import { deleteMyUser } from "../services/UserService";
import { deleteSimulation } from "../services/SimulationService";
import toast from "react-hot-toast";
import MyToast from "../components/toasts/MyToast";
import ConfirmToast from "../components/toasts/ConfirmToast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    const [user, setUser] = useState(null);
    const [simulations, setSimulations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [deletingSimId, setDeletingSimId] = useState(null); 

    useEffect(() => {
        if (!token) {
            setLoading(false);
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

    const handleDeleteSimulation = (simulationId) => {
        toast.custom((t) => (
          <ConfirmToast
            message="Delete this simulation?"
            onConfirm={async () => {
              // mostra carregando
              setDeletingSimId(simulationId);
              try {
                await deleteSimulation(simulationId);
    
                // remove do state sem reload
                setSimulations((prev) => prev.filter((s) => s.simulationId !== simulationId));
    
                toast.custom(
                  <MyToast
                    title="Simulation deleted"
                    message="The simulation was removed."
                    type="success"
                  />
                );
              } catch (err) {
                console.error("Error deleting simulation:", err);
                toast.custom(
                  <MyToast
                    title="Deletion failed"
                    message="Could not delete the simulation."
                    type="error"
                  />
                );
              } finally {
                setDeletingSimId(null);
                toast.dismiss(t.id); // fecha o confirm toast (caso ainda esteja aberto)
              }
            }}
          />
        ));
      };

    return (
        <section className="min-h-screen w-full bg-white text-gray-900">

            <div className="max-w-3xl mx-auto mt-20 px-6 pb-16 flex flex-col items-center gap-10">

                <div className="w-full bg-gray-100/80 rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Welcome back, {user?.name || "User"}!
                    </h2>
                    <p className="text-gray-600">{user?.email}</p>

                    <div className="flex gap-3 mt-6">

                        <button
                            onClick={() => {
                                setNewName(user?.name || "");
                                setNewEmail(user?.email || "");
                                setNewPassword("");
                                setEditing(true);
                            }}
                            className="bg-gray-900 text-white px-6 py-2 rounded-xl font-medium shadow-md transition hover:bg-gray-800 flex items-center gap-2 cursor-pointer"
                        >
                            <Edit size={18} /> Edit Profile
                        </button>

                        <button
                            onClick={() => {
                                logout();
                                window.location.href = "/login";
                            }}
                            className="bg-red-600 text-white px-5 py-2 rounded-xl font-medium shadow-md transition hover:bg-red-700 flex items-center gap-2 cursor-pointer"
                        >
                            <LogOut size={18} /> Logout
                        </button>

                    </div>

                    <button
                        onClick={() => {
                            toast.custom((t) => (
                                <ConfirmToast
                                    message="Are you sure you want to delete your account?"
                                    onConfirm={async () => {
                                        try {
                                            await deleteMyUser();
                                            logout();

                                            toast.custom(
                                                <MyToast
                                                    title="Account deleted"
                                                    message="Your account was removed successfully."
                                                    type="success"
                                                />
                                            );

                                            setTimeout(() => {
                                                window.location.href = "/register";
                                            }, 1200);

                                        } catch (err) {
                                            console.error("Error deleting account:", err);

                                            toast.custom(
                                                <MyToast
                                                    title="Deletion failed"
                                                    message="Could not delete your account."
                                                    type="error"
                                                />
                                            );
                                        }
                                    }}
                                />
                            ));
                        }}
                        className="mt-4 text-sm text-red-600 underline cursor-pointer"
                    >
                        Delete Account
                    </button>
                </div>

                {editing && (
                    <EditProfileForm
                        user={user}
                        onClose={() => setEditing(false)} />)}

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
                <div
                  key={sim.simulationId}
                  className="bg-white rounded-xl p-5 shadow-sm border relative"
                >
                  <button
                    onClick={() => handleDeleteSimulation(sim.simulationId)}
                    aria-label={`Delete simulation ${sim.visaType}`}
                    title="Delete"
                    className="absolute top-3 right-3 inline-flex items-center justify-center p-1"
                    disabled={deletingSimId === sim.simulationId}
                  >
                    <Trash2
                      size={20}
                      className={`stroke-[#021746] transition-transform duration-200 transform ${deletingSimId === sim.simulationId ? "opacity-50" : "hover:stroke-blue-600 hover:scale-110 cursor-pointer"
                        }`}
                      strokeWidth={2}
                    />
                  </button>

                  <h4 className="font-semibold text-gray-900 mb-1">{sim.visaType}</h4>
                  <p className="text-gray-700">Created At: {sim.createdAt}</p>
                  {sim.message && <p className="text-gray-700 text-sm italic mt-2">{sim.message}</p>}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate("/simulation/create")}
            className="mt-8 bg-gray-900 text-white px-7 py-3 rounded-xl font-medium shadow-md transition-all hover:scale-105 hover:bg-gray-800 cursor-pointer mx-auto"
            aria-label="Create simulation"
          >
            Create Simulation
          </button>
        </div>
      </div>
    </section>
  );
}