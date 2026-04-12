import axiosInstance from "./axiosInstance";

class MediaService {
  /**
   * Upload an image to the backend which will store it in Cloudinary/MinIO
   * Returns the uploaded secure URL.
   */
  public async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data.url;
  }
}

export const mediaService = new MediaService();
