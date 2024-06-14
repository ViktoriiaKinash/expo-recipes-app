import api from "../api";
import type { RecipeType } from "./types";

class RecipesApi {
  async getRecipes(): Promise<RecipeType[]> {
    const response = await api.axiosInstance.get("/recipes");
    return response.data;
  }

  async getFevRecipes(): Promise<RecipeType[]> {
    const response = await api.axiosInstance.get("/user/favorites");
    return response.data;
  }

  async addToFav(value: number): Promise<RecipeType[]> {
    const response = await api.axiosInstance.post("/user/favorites/add", {
      recipeId: value,
    });
    return response.data;
  }

  async removeFromFav(value: string): Promise<RecipeType[]> {
    const response = await api.axiosInstance.delete("/user/favorite/" + value);
    return response.data;
  }

  async dynamicSearch(value: string): Promise<RecipeType[]> {
    const response = await api.axiosInstance.get(
      "/recipes/search?keyword=" + value
    );
    return response.data;
  }
}

export default new RecipesApi();
