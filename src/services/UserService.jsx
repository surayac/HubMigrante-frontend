import api from "./ApiUser";

export async function registerUser(data) {
    const res = await api.post("/api/v1/users", data);
    return res.data;
  }

export async function getMyUser() {
    const res = await api.get("/api/v1/users/me");
    return res.data;
}

export async function updateMyUser(data) {
    const res = await api.put("/api/v1/users/me", data);
    return res.data;
}

export async function deleteMyUser() {
    return api.delete("/api/v1/users/me");
}