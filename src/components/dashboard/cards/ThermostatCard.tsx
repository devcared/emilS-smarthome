'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockThermostat } from '@/lib/mock';

export default function ThermostatCard() {
  const { currentTemp, nextChangeTemp, nextChangeTime, mode, fan } = mockThermostat;

  // Timeline-Visualisierung mit vielen vertikalen Linien
  const timelineSegments = Array.from({ length: 50 }, (_, i) => i);
  const currentPosition = 35; // Aktuelle Position auf der Timeline

  return (
    <Card className="dashboard-card h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0 relative z-10">
        <CardTitle className="text-base font-black tracking-tight">Thermostat</CardTitle>
        <Button variant="outline" size="sm" className="text-xs h-8 px-4 border-border/30 hover:bg-muted/70 hover:border-border/50 transition-all duration-300 hover:scale-105 tracking-widest font-black shadow-sm">
          KONFIGURIEREN
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center relative z-10 min-h-0 px-6">
        <div className="space-y-3">
          <div className="text-4xl font-black text-foreground tracking-tighter text-smooth leading-none drop-shadow-lg">
            {currentTemp}°C
          </div>
          <div className="text-xs text-muted-foreground/80 font-bold tracking-wide">
            Nächste Änderung auf {nextChangeTemp}°C um {nextChangeTime}
          </div>
          <div className="relative pt-1.5">
            {/* Timeline Track */}
            <div className="relative h-8 bg-muted/30 rounded-lg overflow-hidden border border-border/30 shadow-inner backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
              {timelineSegments.map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute top-0 h-full w-[2%] border-r border-border/8
                    ${i === currentPosition ? 'bg-primary/30' : ''}
                  `}
                  style={{ left: `${i * 2}%` }}
                />
              ))}
              {/* Current Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-6 w-1.5 bg-primary rounded-full shadow-xl shadow-primary/70 z-10 ring-2 ring-primary/40"
                style={{ left: `${currentPosition * 2}%` }}
              />
              {/* Current Temp Label */}
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-black text-foreground bg-card px-2 py-0.5 rounded-md border border-border/50 shadow-lg backdrop-blur-sm"
                style={{ left: `${currentPosition * 2}%` }}
              >
                {currentTemp}°
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-1.5">
            <div className="flex items-center gap-2.5 bg-muted/20 rounded-lg px-2.5 py-1 border border-border/20">
              <span className="text-xs text-muted-foreground/60 font-black uppercase tracking-widest">MODUS</span>
              <span className="text-xs font-black text-foreground tracking-tight">{mode === 'HEAT' ? 'HEIZEN' : mode === 'COOL' ? 'KÜHLEN' : 'AUTO'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-muted/20 rounded-lg px-2.5 py-1 border border-border/20">
              <span className="text-xs text-muted-foreground/60 font-black uppercase tracking-widest">LÜFTER</span>
              <span className="text-xs font-black text-foreground tracking-tight">{fan === 'ON' ? 'EIN' : fan === 'OFF' ? 'AUS' : 'AUTO'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

