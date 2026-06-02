import axios from "axios";

const API_BASE = "http://localhost:3000/user";

export const getMyHistory = async (token) => {
  try {
    const { data } = await axios.get(`${API_BASE}/get_my_history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    console.error("Error fetching reading history:", error);
    return [];
  }
};