import axios from "axios";
import BACKEND_URL from "../utils/backendUrl";

const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/uploadImages`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export default uploadImages;
