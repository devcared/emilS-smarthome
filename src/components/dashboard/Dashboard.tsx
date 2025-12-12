'use client';

import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AlertsCard from './cards/AlertsCard';
import WeatherCard from './cards/WeatherCard';
import EnergyUsageCard from './cards/EnergyUsageCard';
import ThermostatCard from './cards/ThermostatCard';
import WaterCard from './cards/WaterCard';
import { getCurrentTime, getGreeting } from '@/lib/mock';
import { CheckCircle2, Bell } from 'lucide-react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const greeting = getGreeting();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-full">
          {/* Left Overview Section */}
          <div className="lg:col-span-1 space-y-6 overflow-hidden flex flex-col">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="text-6xl font-bold text-foreground tracking-tight">
                  {currentTime}
                </div>
                <div className="relative cursor-pointer group">
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold z-10 shadow-lg shadow-red-500/50">
                    6
                  </div>
                  <div className="h-11 w-11 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                    <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </div>
              </div>
              <div className="text-2xl text-muted-foreground font-light">
                {greeting}, Emerson
              </div>
            </div>

            <div className="space-y-4 pt-2 flex-1 overflow-hidden">
              <div className="opacity-40">
                <div className="text-sm text-muted-foreground mb-1.5 font-medium">Geräte</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1.5 font-medium">KI</div>
                <div className="text-xs text-foreground/80">Aktive Routinen</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
                  Übersicht
                  <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                </div>
                <div className="text-xs text-muted-foreground">Alles sicher</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1.5 font-medium">Beleuchtung</div>
                <div className="text-xs text-foreground/80">Lichter an</div>
              </div>
              <div className="opacity-40">
                <div className="text-sm text-muted-foreground mb-1.5 font-medium">Energie</div>
              </div>
              <div className="opacity-40">
                <div className="text-sm text-muted-foreground mb-1.5 font-medium">Sprechanlage</div>
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
      </main>
    </div>
  );
}

