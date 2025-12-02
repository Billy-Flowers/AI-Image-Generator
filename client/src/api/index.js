import axios from "axios";

// http://localhost:8080/api/
// https://ai-image-builder.onrender.com/api/
const API = axios.create({
  baseURL: "https://ai-image-builder.onrender.com/api/",
});

export const GetPosts = async () => await API.get("/posts/");
export const CreatePost = async (data) => await API.post("/posts/", data);
export const GenerateImageFromPrompt = async (data) =>
  await API.post("/generateImage/", data);
