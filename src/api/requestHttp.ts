import axios from "axios";
const URL = import.meta.env.VITE_API_URL;
const requestHttp = axios.create({
  baseURL: URL,
});

const urlFront = window.location.href;
const partBeforeSlash = urlFront.slice(0, urlFront.indexOf("/"));
requestHttp.interceptors.request.use((config) => {
  const token = `${localStorage.getItem("token")}`;
  // console.log(config.headers.Authorization);
  if (token.length > 0) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    location.href = `${partBeforeSlash}/login`;
  }
  return config;
});
requestHttp.interceptors.response.use(
  (response) => {
    // Manejar la respuesta exitosa
    return response;
  },
  (error) => {
    // Manejar el error
    if (error.response.status === 401) {
      // Redirigir al login
      localStorage.removeItem("token");
      localStorage.removeItem("userAuth");
      location.href = `${partBeforeSlash}/login`;
    }
    return Promise.reject(error);
  }
);

export { requestHttp };
