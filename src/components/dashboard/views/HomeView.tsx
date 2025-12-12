'use client';

import { useEffect, useState } from 'react';
import AlertsCard from '../cards/AlertsCard';
import WeatherCard from '../cards/WeatherCard';
import EnergyUsageCard from '../cards/EnergyUsageCard';
import ThermostatCard from '../cards/ThermostatCard';
import WaterCard from '../cards/WaterCard';
import { getCurrentTime, getGreeting } from '@/lib/mock';
import { CheckCircle2, Bell } from 'lucide-react';

export default function HomeView() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const greeting = getGreeting();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
      {/* Left Overview Section */}
      <div className="lg:col-span-1 space-y-6 overflow-hidden flex flex-col">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-5xl font-bold text-foreground tracking-tighter text-smooth leading-none">
              {currentTime}
            </div>
            <div className="relative cursor-pointer group">
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold z-10 shadow-xl shadow-red-500/60 ring-2 ring-red-500/30 animate-pulse">
                6
              </div>
              <div className="h-10 w-10 rounded-full bg-muted/40 border border-border/40 flex items-center justify-center group-hover:bg-muted/60 group-hover:border-border/60 transition-all duration-300 group-hover:scale-110">
                <Bell className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all duration-300" strokeWidth={2} />
              </div>
            </div>
          </div>
          <div className="text-xl text-muted-foreground/90 font-light tracking-wide">
            {greeting}, Emerson
          </div>
        </div>

        <div className="space-y-3 pt-2 flex-1 overflow-hidden">
          <div className="opacity-35 transition-opacity hover:opacity-60 cursor-default">
            <div className="text-sm text-muted-foreground/70 mb-1.5 font-semibold tracking-wide">Geräte</div>
          </div>
          <div className="transition-all hover:translate-x-1">
            <div className="text-sm text-muted-foreground/80 mb-1.5 font-semibold tracking-wide">KI</div>
            <div className="text-xs text-foreground/70 font-medium">Aktive Routinen</div>
          </div>
          <div className="transition-all hover:translate-x-1">
            <div className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
              Übersicht
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/60 ring-2 ring-green-500/30 animate-pulse"></div>
            </div>
            <div className="text-xs text-muted-foreground/80 font-medium">Alles sicher</div>
          </div>
          <div className="transition-all hover:translate-x-1">
            <div className="text-sm text-muted-foreground/80 mb-1.5 font-semibold tracking-wide">Beleuchtung</div>
            <div className="text-xs text-foreground/70 font-medium">Lichter an</div>
          </div>
          <div className="opacity-35 transition-opacity hover:opacity-60 cursor-default">
            <div className="text-sm text-muted-foreground/70 mb-1.5 font-semibold tracking-wide">Energie</div>
          </div>
          <div className="opacity-35 transition-opacity hover:opacity-60 cursor-default">
            <div className="text-sm text-muted-foreground/70 mb-1.5 font-semibold tracking-wide">Sprechanlage</div>
          </div>
        </div>
      </div>

      {/* Right Grid Section */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-6 lg:gap-8 h-full overflow-hidden">
        <div className="md:row-span-2 h-full min-h-0">
          <AlertsCard />
        </div>
        <div className="h-full min-h-0">
          <WeatherCard />
        </div>
        <div className="h-full min-h-0">
          <EnergyUsageCard />
        </div>
        <div className="md:col-span-2 h-full min-h-0">
          <ThermostatCard />
        </div>
        <div className="h-full min-h-0">
          <WaterCard />
        </div>
      </div>
    </div>
  );
}

