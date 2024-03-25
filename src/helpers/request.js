import axios from "axios";

export default async function request(url, method = "GET", body) {
  const authToken = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
  };

  // If authToken exists, include it in the headers
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  if (body) {
    config.data = body; // Add the body to the config if it exists
  }

  try {
    const response = await axios(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
