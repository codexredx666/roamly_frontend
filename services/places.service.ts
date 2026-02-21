import { apiClient } from "./api";
import { Place } from "./ai.service";

export const placesService = {
  async searchPlaces(query: string, location?: { lat: number; lng: number }): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>("/api/places/search", {
        params: { query, ...location },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to search places");
    }
  },

  async getPlaceDetails(id: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`/api/places/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get place details");
    }
  },
};
