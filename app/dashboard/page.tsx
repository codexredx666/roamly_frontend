"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useTrip } from "@/context/TripContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { trips, isLoading, loadTrips } = useTrip();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn) {
      loadTrips();
    }
  }, [isSignedIn, loadTrips]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="container mx-auto">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Trips
            </h1>
            <p className="text-gray-400 mt-2">Plan and manage your adventures</p>
          </motion.div>
          <UserButton />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            size="lg"
            onClick={() => router.push("/chat")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Trip
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="glass border-white/20 text-center py-12">
              <CardContent>
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No trips yet</h3>
                <p className="text-gray-400 mb-6">
                  Start planning your first adventure with AI
                </p>
                <Button
                  onClick={() => router.push("/chat")}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Create Your First Trip
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => router.push(`/trip/${trip.id}`)}
              >
                <Card className="glass border-white/20 h-full hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{trip.destination}</span>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </CardTitle>
                    <CardDescription>
                      {new Date(trip.startDate).toLocaleDateString()} -{" "}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {Math.ceil(
                          (new Date(trip.endDate).getTime() -
                            new Date(trip.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </span>
                    </div>
                    {trip.budget && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <DollarSign className="h-4 w-4" />
                        <span>${trip.budget.toLocaleString()}</span>
                      </div>
                    )}
                    {trip.itinerary && trip.itinerary.length > 0 && (
                      <div className="text-sm text-gray-400">
                        {trip.itinerary.length} day{trip.itinerary.length > 1 ? "s" : ""} planned
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
