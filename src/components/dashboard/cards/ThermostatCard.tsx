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
    <Card className="dashboard-card h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 flex-shrink-0">
        <CardTitle className="text-lg font-semibold tracking-tight">Thermostat</CardTitle>
        <Button variant="outline" size="sm" className="text-xs h-8 px-4 border-border/40 hover:bg-muted/60 hover:border-border/60 transition-all duration-200 hover:scale-105 tracking-wide font-semibold">
          KONFIGURIEREN
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="space-y-7">
          <div className="text-7xl font-bold text-foreground tracking-tighter text-smooth leading-none">
            {currentTemp}°C
          </div>
          <div className="text-sm text-muted-foreground/85 font-semibold tracking-wide">
            Nächste Änderung auf {nextChangeTemp}°C um {nextChangeTime}
          </div>
          <div className="relative pt-3">
            {/* Timeline Track */}
            <div className="relative h-12 bg-muted/35 rounded-xl overflow-hidden border border-border/25 shadow-inner">
              {timelineSegments.map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute top-0 h-full w-[2%] border-r border-border/10
                    ${i === currentPosition ? 'bg-primary/25' : ''}
                  `}
                  style={{ left: `${i * 2}%` }}
                />
              ))}
              {/* Current Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-8 w-2 bg-primary rounded-full shadow-xl shadow-primary/60 z-10 ring-2 ring-primary/30"
                style={{ left: `${currentPosition * 2}%` }}
              />
              {/* Current Temp Label */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-foreground bg-card px-2.5 py-1 rounded-lg border border-border/40 shadow-lg"
                style={{ left: `${currentPosition * 2}%` }}
              >
                {currentTemp}°
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 pt-3">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground/70 font-bold uppercase tracking-widest">MODUS</span>
              <span className="text-sm font-bold text-foreground tracking-tight">{mode === 'HEAT' ? 'HEIZEN' : mode === 'COOL' ? 'KÜHLEN' : 'AUTO'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground/70 font-bold uppercase tracking-widest">LÜFTER</span>
              <span className="text-sm font-bold text-foreground tracking-tight">{fan === 'ON' ? 'EIN' : fan === 'OFF' ? 'AUS' : 'AUTO'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

