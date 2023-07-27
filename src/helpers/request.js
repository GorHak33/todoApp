// import axios from "axios";

// export default async function request(url, method = "GET", body) {
//   const config = {
//     headers:{
//       "Content-Type": "application/json",

//     },
//     method:method,
//   }
//   try {
//     const response = await axios(url, {
//       // headers: {
//       //   "Content-Type": "application/json",
//       // },
//       // method: method,
//       config

//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
import axios from "axios";

export default async function request(url, method = "GET", body) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
  };

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
