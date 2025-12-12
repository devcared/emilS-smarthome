'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockThermostat } from '@/lib/mock';
import { Flame, Wind } from 'lucide-react';

export default function ThermostatCard() {
  const { currentTemp, nextChangeTemp, nextChangeTime, mode, fan } = mockThermostat;

  // Timeline-Visualisierung mit vielen vertikalen Linien - mehr Segmente für feinere Darstellung
  const timelineSegments = Array.from({ length: 60 }, (_, i) => i);
  const currentPosition = 42; // Aktuelle Position auf der Timeline (70% von 60)

  return (
    <Card className="dashboard-card h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 flex-shrink-0 relative z-10">
        <CardTitle className="text-base font-black tracking-tight">Thermostat</CardTitle>
        <Button variant="outline" size="sm" className="text-xs h-8 px-4 border-border/30 hover:bg-muted/70 hover:border-border/50 transition-all duration-300 hover:scale-105 tracking-widest font-black shadow-sm">
          KONFIGURIEREN
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center relative z-10 min-h-0 p-0">
        <div className="px-6 pb-6 flex-1 flex flex-col justify-center space-y-3">
          {/* Haupttemperatur */}
          <div className="flex items-baseline gap-2.5">
            <div className="text-4xl font-black text-foreground tracking-tighter text-smooth leading-none drop-shadow-lg">
              {currentTemp}
            </div>
            <div className="text-xl font-black text-muted-foreground/60 tracking-tight">°C</div>
          </div>

          {/* Nächste Änderung */}
          <div className="text-xs text-muted-foreground/75 font-semibold tracking-wide">
            Nächste Änderung auf <span className="text-foreground font-bold">{nextChangeTemp}°C</span> um <span className="text-foreground font-bold">{nextChangeTime}</span>
          </div>

          {/* Timeline Track - kompakter */}
          <div className="relative pt-1.5">
            <div className="relative h-8 bg-muted/25 rounded-lg overflow-hidden border border-border/25 shadow-inner backdrop-blur-sm">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
              
              {/* Timeline Segments */}
              {timelineSegments.map((_, i) => {
                const isActive = i === currentPosition;
                const isNearActive = Math.abs(i - currentPosition) <= 2;
                return (
                  <div
                    key={i}
                    className={`
                      absolute top-0 h-full border-r
                      ${isActive ? 'w-[1.67%] border-primary/40 bg-primary/20' : isNearActive ? 'w-[1.67%] border-border/15 bg-primary/5' : 'w-[1.67%] border-border/8'}
                    `}
                    style={{ left: `${i * (100 / 60)}%` }}
                  />
                );
              })}
              
              {/* Current Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-6 w-1.5 bg-primary rounded-full shadow-xl shadow-primary/80 z-20 ring-2 ring-primary/50"
                style={{ left: `${currentPosition * (100 / 60)}%` }}
              />
              
              {/* Current Temp Label */}
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black text-foreground bg-card px-2 py-0.5 rounded-md border border-border/40 shadow-lg backdrop-blur-sm z-30"
                style={{ left: `${currentPosition * (100 / 60)}%` }}
              >
                {currentTemp}°
              </div>
            </div>
          </div>

          {/* Status Badges - kompakter */}
          <div className="flex items-center gap-2.5 pt-1.5">
            <div className="flex items-center gap-1.5 bg-muted/25 rounded-lg px-2.5 py-1 border border-border/25 shadow-sm">
              <Flame className={`h-3 w-3 ${mode === 'HEAT' ? 'text-orange-400' : 'text-muted-foreground/40'}`} strokeWidth={2.5} />
              <div className="flex flex-col">
                <span className="text-[9px] text-muted-foreground/50 font-black uppercase tracking-widest leading-none">MODUS</span>
                <span className="text-xs font-black text-foreground tracking-tight leading-tight">{mode === 'HEAT' ? 'HEIZEN' : mode === 'COOL' ? 'KÜHLEN' : 'AUTO'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/25 rounded-lg px-2.5 py-1 border border-border/25 shadow-sm">
              <Wind className={`h-3 w-3 ${fan === 'ON' ? 'text-primary' : 'text-muted-foreground/40'}`} strokeWidth={2.5} />
              <div className="flex flex-col">
                <span className="text-[9px] text-muted-foreground/50 font-black uppercase tracking-widest leading-none">LÜFTER</span>
                <span className="text-xs font-black text-foreground tracking-tight leading-tight">{fan === 'ON' ? 'EIN' : fan === 'OFF' ? 'AUS' : 'AUTO'}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

