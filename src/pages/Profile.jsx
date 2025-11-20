import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileForm from "../components/EditProfileForm";
import SimulationList from "../components/SimulationList";
import toast from "react-hot-toast";
import MyToast from "../components/toasts/MyToast";
import ConfirmToast from "../components/toasts/ConfirmToast";
import { deleteSimulation } from "../services/SimulationService";
import { getMyUser } from "../services/UserService";
import api from "../services/ApiUser";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const [user, setUser] = useState(null);
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [deletingSimId, setDeletingSimId] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const u = await getMyUser();
        const sims = await api.get("/api/v1/simulations/me");
        setUser(u);
        setSimulations(sims.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  const handleDeleteSimulation = (id) => {
    toast.custom((t) => (
      <ConfirmToast
        message="Delete this simulation?"
        onConfirm={async () => {
          setDeletingSimId(id);

          try {
            await deleteSimulation(id);

            setSimulations((prev) => prev.filter((s) => s.simulationId !== id));

            toast.custom(
              <MyToast
                title="Simulation deleted"
                message="The simulation was removed."
                type="success"
              />
            );
          } catch (err) {
            toast.custom(
              <MyToast
                title="Error"
                message="Could not delete the simulation."
                type="error"
              />
            );
          } finally {
            setDeletingSimId(null);
            toast.dismiss(t.id);
          }
        }}
      />
    ));
  };

  if (!token) return <p className="text-center mt-10">You are not logged in.</p>;
  if (loading) return <p className="text-center mt-10">Loading…</p>;

  return (
    <section className="min-h-screen w-full bg-white text-gray-900">
      <div className="max-w-3xl mx-auto mt-20 px-6 pb-16 flex flex-col items-center gap-10">

        <ProfileHeader
          user={user}
          onEdit={() => setEditing(true)}
          onLogout={() => {
            logout();
            window.location.href = "/";
          }}
        />

        {editing && (
          <EditProfileForm
            user={user}
            onClose={() => setEditing(false)}
            onSuccess={(updatedUser) => setUser(updatedUser)} 
          />
        )}

        <div className="w-full bg-gray-100/80 rounded-2xl p-8 shadow-md flex flex-col items-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            My Simulations
          </h3>

          <SimulationList
            simulations={simulations}
            onDelete={handleDeleteSimulation}
            deletingSimId={deletingSimId}
          />

          <button
            onClick={() => navigate("/simulation")}
            className="mt-8 bg-gray-900 text-white px-7 py-3 rounded-xl font-medium shadow-md transition-all hover:scale-105 hover:bg-gray-800 cursor-pointer mx-auto"
          >
            Create Simulation
          </button>
        </div>

      </div>
    </section>
  );
}
