export async function getSimulationsByUser(userId, token) {
    const response = await fetch(`http://localhost:8080/api/v1/simulations/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
    });
  
    if (!response.ok) {
      throw new Error("Error searching for simulations");
    }
  
    return response.json();
  }