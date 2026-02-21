"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Trip, ChatMessage } from "@/services/ai.service";
import { aiService } from "@/services/ai.service";

interface TripContextType {
  user: any;
  messages: ChatMessage[];
  tripData: Trip | null;
  selectedTrip: Trip | null;
  trips: Trip[];
  isLoading: boolean;
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, content: string) => void;
  setTripData: (trip: Trip | null) => void;
  setSelectedTrip: (trip: Trip | null) => void;
  loadTrips: () => Promise<void>;
  createTrip: (data: any) => Promise<void>;
  clearMessages: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tripData, setTripData] = useState<Trip | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (id: string, content: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content } : msg))
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const loadTrips = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const data = await aiService.getTrips();
      setTrips(data);
    } catch (error) {
      console.error("Failed to load trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTrip = async (data: any) => {
    try {
      setIsLoading(true);
      const newTrip = await aiService.createTrip(data);
      setTrips((prev) => [newTrip, ...prev]);
      setSelectedTrip(newTrip);
      return newTrip;
    } catch (error) {
      console.error("Failed to create trip:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadTrips();
    }
  }, [user]);

  return (
    <TripContext.Provider
      value={{
        user,
        messages,
        tripData,
        selectedTrip,
        trips,
        isLoading,
        addMessage,
        updateMessage,
        setTripData,
        setSelectedTrip,
        loadTrips,
        createTrip,
        clearMessages,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}
