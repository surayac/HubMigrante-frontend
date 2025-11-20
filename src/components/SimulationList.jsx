import SimulationCard from "./SimulationCard";

export default function SimulationList({ simulations, onDelete, deletingSimId }) {
  if (simulations.length === 0) {
    return <p className="text-gray-700">You haven't created any simulations yet.</p>;
  }

  return (
    <div className="mt-6 grid md:grid-cols-2 gap-6 w-full">
      {simulations.map((sim) => (
        <SimulationCard
          key={sim.simulationId}
          simulation={sim}
          deleting={deletingSimId === sim.simulationId}
          onDelete={() => onDelete(sim.simulationId)}
        />
      ))}
    </div>
  );
}
