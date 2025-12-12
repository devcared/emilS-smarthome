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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 flex-shrink-0 relative z-10">
        <CardTitle className="text-lg font-black tracking-tight">Thermostat</CardTitle>
        <Button variant="outline" size="sm" className="text-xs h-9 px-5 border-border/30 hover:bg-muted/70 hover:border-border/50 transition-all duration-300 hover:scale-105 tracking-widest font-black shadow-sm">
          KONFIGURIEREN
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center relative z-10">
        <div className="space-y-8">
          <div className="text-8xl font-black text-foreground tracking-tighter text-smooth leading-none drop-shadow-lg">
            {currentTemp}°C
          </div>
          <div className="text-sm text-muted-foreground/80 font-bold tracking-wide">
            Nächste Änderung auf {nextChangeTemp}°C um {nextChangeTime}
          </div>
          <div className="relative pt-4">
            {/* Timeline Track */}
            <div className="relative h-14 bg-muted/30 rounded-xl overflow-hidden border border-border/30 shadow-inner backdrop-blur-sm">
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
                className="absolute top-1/2 -translate-y-1/2 h-9 w-2.5 bg-primary rounded-full shadow-2xl shadow-primary/70 z-10 ring-2 ring-primary/40 ring-offset-2 ring-offset-card"
                style={{ left: `${currentPosition * 2}%` }}
              />
              {/* Current Temp Label */}
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-black text-foreground bg-card px-3 py-1.5 rounded-lg border border-border/50 shadow-xl backdrop-blur-sm"
                style={{ left: `${currentPosition * 2}%` }}
              >
                {currentTemp}°
              </div>
            </div>
          </div>
          <div className="flex items-center gap-12 pt-4">
            <div className="flex items-center gap-4 bg-muted/20 rounded-lg px-4 py-2 border border-border/20">
              <span className="text-xs text-muted-foreground/60 font-black uppercase tracking-widest">MODUS</span>
              <span className="text-sm font-black text-foreground tracking-tight">{mode === 'HEAT' ? 'HEIZEN' : mode === 'COOL' ? 'KÜHLEN' : 'AUTO'}</span>
            </div>
            <div className="flex items-center gap-4 bg-muted/20 rounded-lg px-4 py-2 border border-border/20">
              <span className="text-xs text-muted-foreground/60 font-black uppercase tracking-widest">LÜFTER</span>
              <span className="text-sm font-black text-foreground tracking-tight">{fan === 'ON' ? 'EIN' : fan === 'OFF' ? 'AUS' : 'AUTO'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

