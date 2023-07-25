import axios from "axios";

export default async function request(url, method = "GET", body) {
  try {
    const response = await axios(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      data: body,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
