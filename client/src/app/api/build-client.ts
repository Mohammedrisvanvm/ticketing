import axios from "axios";

export const axiosBase = () => {
  // We must be on the browser
  return axios.create({
    baseURL: "/",
  });
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosBase().get("/api/users/currentuser");
    return data.currentUser;
  } catch (error) {
    console.log(error, "error");
  }
};
