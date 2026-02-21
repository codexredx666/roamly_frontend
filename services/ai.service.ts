import { apiClient } from "./api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface CreateTripRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number;
  preferences?: string[];
  travelers?: number;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget?: number;
  itinerary?: ItineraryItem[];
  places?: Place[];
  hotels?: Hotel[];
  flights?: Flight[];
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryItem {
  id: string;
  day: number;
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  duration?: string;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  rating?: number;
  imageUrl?: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  pricePerNight: number;
  rating?: number;
  imageUrl?: string;
  amenities?: string[];
}

export interface Flight {
  id: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  price: number;
  duration: string;
}

export const aiService = {
  async sendMessage(message: string, tripId?: string): Promise<ChatMessage> {
    try {
      const response = await apiClient.post<ChatMessage>("/api/ai/chat", {
        message,
        tripId,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to send message");
    }
  },

  async streamMessage(
    message: string,
    tripId: string | undefined,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}/api/ai/chat/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, tripId }),
        }
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") return;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                onChunk(parsed.content);
              }
            } catch {
              onChunk(data);
            }
          }
        }
      }
    } catch (error) {
      throw new Error("Failed to stream message");
    }
  },

  async createTrip(data: CreateTripRequest): Promise<Trip> {
    try {
      const response = await apiClient.post<Trip>("/api/trips", data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create trip");
    }
  },

  async getTrip(id: string): Promise<Trip> {
    try {
      const response = await apiClient.get<Trip>(`/api/trips/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get trip");
    }
  },

  async getTrips(): Promise<Trip[]> {
    try {
      const response = await apiClient.get<Trip[]>("/api/trips");
      return response.data;
    } catch (error) {
      throw new Error("Failed to get trips");
    }
  },

  async updateTrip(id: string, data: Partial<Trip>): Promise<Trip> {
    try {
      const response = await apiClient.patch<Trip>(`/api/trips/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update trip");
    }
  },

  async deleteTrip(id: string): Promise<void> {
    try {
      await apiClient.delete(`/api/trips/${id}`);
    } catch (error) {
      throw new Error("Failed to delete trip");
    }
  },
};
