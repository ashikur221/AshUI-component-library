import axios from "axios";
const backendURL = 'https://ash-ui-server.vercel.app'
// const backendURL = 'http://localhost:5000'
const axiosPublic = axios.create({
  baseURL: backendURL
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic; 