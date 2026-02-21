"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useTrip } from "@/context/TripContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Map3D from "@/components/Map3D";
import { ArrowLeft, MapPin, Calendar, DollarSign, Hotel, Plane, Map } from "lucide-react";
import { aiService, Trip } from "@/services/ai.service";
import toast from "react-hot-toast";
import { UserButton } from "@clerk/nextjs";

export default function TripDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { isSignedIn, isLoaded } = useUser();
  const { setSelectedTrip } = useTrip();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const loadTrip = async () => {
      if (!params.id || typeof params.id !== "string") return;
      try {
        setIsLoading(true);
        const data = await aiService.getTrip(params.id);
        setTrip(data);
        setSelectedTrip(data);
      } catch (error) {
        toast.error("Failed to load trip");
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (isSignedIn) {
      loadTrip();
    }
  }, [params.id, isSignedIn, router, setSelectedTrip]);

  if (!isLoaded || !isSignedIn || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <Skeleton className="h-12 w-48 mb-8" />
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!trip) {
    return null;
  }

  const places = trip.places || [];
  const mapCenter: [number, number] = places.length > 0
    ? [places[0].location.lng, places[0].location.lat]
    : [0, 0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {trip.destination}
              </h1>
              <p className="text-gray-400 mt-1">
                {new Date(trip.startDate).toLocaleDateString()} -{" "}
                {new Date(trip.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <UserButton />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="places">Places</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="flights">Flights</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {trip.itinerary && trip.itinerary.length > 0 ? (
                  trip.itinerary.map((day, index) => (
                    <motion.div
                      key={day.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass border-white/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Day {day.day} - {new Date(day.date).toLocaleDateString()}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {day.activities.map((activity) => (
                            <div
                              key={activity.id}
                              className="flex gap-4 p-3 rounded-lg bg-secondary/20"
                            >
                              <div className="font-semibold text-sm text-primary min-w-[60px]">
                                {activity.time}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold">{activity.title}</div>
                                <div className="text-sm text-gray-400">
                                  {activity.description}
                                </div>
                                {activity.location && (
                                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {activity.location.name}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <Card className="glass border-white/20">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-400">No itinerary available yet</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="places" className="space-y-4">
                {places.length > 0 ? (
                  places.map((place, index) => (
                    <motion.div
                      key={place.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass border-white/20">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            {place.name}
                            {place.rating && (
                              <Badge variant="secondary">{place.rating} ⭐</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>{place.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-400 mb-2">{place.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {place.location.address}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <Card className="glass border-white/20">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-400">No places added yet</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="hotels" className="space-y-4">
                {trip.hotels && trip.hotels.length > 0 ? (
                  trip.hotels.map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass border-white/20">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Hotel className="h-5 w-5" />
                              {hotel.name}
                            </div>
                            {hotel.rating && (
                              <Badge variant="secondary">{hotel.rating} ⭐</Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            ${hotel.pricePerNight}/night
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-400 mb-2">{hotel.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <MapPin className="h-4 w-4" />
                            {hotel.location.address}
                          </div>
                          {hotel.amenities && hotel.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.map((amenity, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <Card className="glass border-white/20">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-400">No hotels added yet</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="flights" className="space-y-4">
                {trip.flights && trip.flights.length > 0 ? (
                  trip.flights.map((flight, index) => (
                    <motion.div
                      key={flight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass border-white/20">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Plane className="h-5 w-5" />
                              {flight.airline}
                            </div>
                            <Badge variant="secondary">${flight.price}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-400 mb-1">Departure</div>
                              <div className="font-semibold">{flight.departure.city}</div>
                              <div className="text-sm text-gray-500">
                                {flight.departure.airport} • {flight.departure.time}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(flight.departure.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-400 mb-1">Arrival</div>
                              <div className="font-semibold">{flight.arrival.city}</div>
                              <div className="text-sm text-gray-500">
                                {flight.arrival.airport} • {flight.arrival.time}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(flight.arrival.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            Duration: {flight.duration}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <Card className="glass border-white/20">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-400">No flights added yet</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="budget" className="space-y-4">
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Budget Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {trip.budget ? (
                      <div className="space-y-4">
                        <div className="text-3xl font-bold">
                          ${trip.budget.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">
                          Total budget for this trip
                        </div>
                        {trip.hotels && trip.hotels.length > 0 && (
                          <div className="mt-4">
                            <div className="text-sm text-gray-400 mb-2">Estimated Costs</div>
                            <div className="space-y-2">
                              {trip.hotels.map((hotel) => {
                                const days = Math.ceil(
                                  (new Date(trip.endDate).getTime() -
                                    new Date(trip.startDate).getTime()) /
                                    (1000 * 60 * 60 * 24)
                                );
                                const total = hotel.pricePerNight * days;
                                return (
                                  <div
                                    key={hotel.id}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>{hotel.name}</span>
                                    <span>${total.toLocaleString()}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-400">No budget set for this trip</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="sticky top-8 h-fit">
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <Map3D
                    places={places.map((p) => ({
                      id: p.id,
                      name: p.name,
                      location: p.location,
                    }))}
                    center={mapCenter}
                    zoom={places.length > 0 ? 10 : 2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
