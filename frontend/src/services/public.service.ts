import axiosInstance from "./axiosInstance";

class PublicService {
  public async getArticles() {
    const response = await axiosInstance.get("/public/articles");
    return response.data;
  }

  public async getArticle(id: string) {
    const response = await axiosInstance.get(`/public/articles/${id}`);
    return response.data;
  }

  public async getCategories() {
    const response = await axiosInstance.get("/public/categories");
    return response.data;
  }

  public async getMagazine() {
    const response = await axiosInstance.get("/magazine");
    return response.data;
  }
}

export const publicService = new PublicService();
