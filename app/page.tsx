"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Globe from "@/components/Globe";
import { MapPin, Sparkles, Zap, Globe2 } from "lucide-react";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Roamly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-8"
          >
            Your AI-Powered Trip Planner
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              size="lg"
              onClick={() => router.push("/sign-up")}
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/sign-in")}
              className="text-lg px-8 py-6"
            >
              Sign In
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <Card className="glass border-purple-500/30">
            <CardContent className="p-6">
              <div className="h-64 mb-4 rounded-lg overflow-hidden">
                <Globe />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Card className="glass border-blue-500/30">
                <CardContent className="p-6 flex items-start gap-4">
                  <Sparkles className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Planning</h3>
                    <p className="text-gray-400">
                      Let AI create personalized itineraries based on your preferences
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="glass border-purple-500/30">
                <CardContent className="p-6 flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-purple-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Interactive Maps</h3>
                    <p className="text-gray-400">
                      Explore destinations with 3D maps and location insights
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <Card className="glass border-pink-500/30">
                <CardContent className="p-6 flex items-start gap-4">
                  <Zap className="w-8 h-8 text-pink-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Instant Recommendations</h3>
                    <p className="text-gray-400">
                      Get real-time suggestions for hotels, flights, and activities
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center"
        >
          <Card className="glass border-white/20 inline-block">
            <CardContent className="p-8">
              <Globe2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Start Planning Today</h2>
              <p className="text-gray-400 mb-6">
                Join thousands of travelers using AI to plan their perfect trips
              </p>
              <Button
                onClick={() => router.push("/sign-up")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Create Your First Trip
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
