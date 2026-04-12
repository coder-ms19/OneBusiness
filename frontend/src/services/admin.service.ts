import axiosInstance from "./axiosInstance";

class AdminService {
  // Articles
  public async getArticles() {
    const response = await axiosInstance.get("/admin/articles");
    return response.data;
  }

  public async getArticle(id: string) {
    const response = await axiosInstance.get(`/admin/articles/${id}`);
    return response.data;
  }

  public async createArticle(data: any) {
    const response = await axiosInstance.post("/admin/articles", data);
    return response.data;
  }

  public async updateArticle(id: string, data: any) {
    const response = await axiosInstance.put(`/admin/articles/${id}`, data);
    return response.data;
  }

  public async deleteArticle(id: string) {
    const response = await axiosInstance.delete(`/admin/articles/${id}`);
    return response.data;
  }

  // Categories
  public async getCategories() {
    const response = await axiosInstance.get("/admin/categories");
    return response.data;
  }

  public async createCategory(data: any) {
    const response = await axiosInstance.post("/admin/categories", data);
    return response.data;
  }

  public async updateCategory(id: string, data: any) {
    const response = await axiosInstance.put(`/admin/categories/${id}`, data);
    return response.data;
  }

  public async deleteCategory(id: string) {
    const response = await axiosInstance.delete(`/admin/categories/${id}`);
    return response.data;
  }

  // Magazine
  public async getMagazine() {
    const response = await axiosInstance.get("/magazine");
    return response.data;
  }

  public async updateMagazine(data: any) {
    const response = await axiosInstance.put("/magazine", data);
    return response.data;
  }
}

export const adminService = new AdminService();
