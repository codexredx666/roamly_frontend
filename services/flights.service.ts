import { apiClient } from "./api";
import { Flight } from "./ai.service";

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers?: number;
}

export const flightsService = {
  async searchFlights(params: FlightSearchParams): Promise<Flight[]> {
    try {
      const response = await apiClient.get<Flight[]>("/api/flights/search", {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to search flights");
    }
  },

  async getFlightDetails(id: string): Promise<Flight> {
    try {
      const response = await apiClient.get<Flight>(`/api/flights/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get flight details");
    }
  },
};
