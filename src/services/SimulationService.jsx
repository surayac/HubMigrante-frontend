import api from "./ApiUser";

export async function createSimulation(data) {
    const res = await api.post("/api/v1/simulations", data);
    return res.data;
}

export async function getMySimulations() {
    const res = await api.get("/api/v1/simulations/me");
    return res.data;
}

export async function deleteSimulation(simulationId) {
    return api.delete(`/api/v1/simulations/${simulationId}`);
  }