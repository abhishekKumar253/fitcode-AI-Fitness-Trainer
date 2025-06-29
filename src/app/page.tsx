"use client";

import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "ACTIVE USERS", value: "500+" },
  { label: "GENERATION", value: "3min" },
  { label: "PERSONALIZED", value: "100%" },
];

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative z-10 py-24 flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">

            {/* CORNER DECORATION */}
            <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2" />

            {/* LEFT CONTENT */}
            <div className="lg:col-span-7 space-y-8 relative">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <div><span className="text-foreground">Transform</span></div>
                <div><span className="text-primary">Your Body</span></div>
                <div className="pt-2"><span className="text-foreground">With Advanced</span></div>
                <div className="pt-2">
                  <span className="text-foreground">AI</span>
                  <span className="text-primary"> Technology</span>
                </div>
              </h1>

              {/* SEPARATOR LINE */}
              <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />

              <p className="text-xl text-muted-foreground w-2/3">
                Talk to our AI assistant and get personalized diet plans and
                workout routines designed just for you.
              </p>

              {/* STATS */}
              <div className="flex items-center gap-10 py-6 font-mono">
                {stats.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="text-2xl text-primary">{item.value}</div>
                    <div className="text-xs uppercase tracking-wider">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
                >
                  <Link href="/generate-program" className="flex items-center font-mono">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-5 relative">
              {/* CORNER PIECES */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-border" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-border" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-border" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-border" />
              </div>

              {/* IMAGE + OVERLAY */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                  <img
                    src="/hero-ai3.png"
                    alt="AI-based fitness coach illustration"
                    className="size-full object-cover object-center"
                  />

                  {/* SCAN LINE */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

                  {/* DECORATIVE ELEMENTS */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />
                    <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
                    <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />
                  </div>

                  {/* IMAGE SHADOW */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>

                {/* TERMINAL OVERLAY */}
                <TerminalOverlay
                  sessionId="ID:84539.56"
                  status="TODAY'S PROGRAM GENERATED"
                  workoutItems={[
                    "30 min strength training (upper body)",
                    "20 min cardio (moderate intensity)",
                    "10 min flexibility (recovery)",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <UserPrograms />
    </div>
  );
};

export default HomePage;
