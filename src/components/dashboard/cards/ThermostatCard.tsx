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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
        <CardTitle className="text-lg font-semibold">Thermostat</CardTitle>
        <Button variant="outline" size="sm" className="text-xs h-8 px-4 border-border/50 hover:bg-muted/50">
          KONFIGURIEREN
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          <div className="text-6xl font-bold text-foreground tracking-tight">
            {currentTemp}°C
          </div>
          <div className="text-sm text-muted-foreground/90 font-medium">
            Nächste Änderung auf {nextChangeTemp}°C um {nextChangeTime}
          </div>
          <div className="relative pt-2">
            {/* Timeline Track */}
            <div className="relative h-10 bg-muted/40 rounded-lg overflow-hidden border border-border/20">
              {timelineSegments.map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute top-0 h-full w-[2%] border-r border-border/15
                    ${i === currentPosition ? 'bg-primary/20' : ''}
                  `}
                  style={{ left: `${i * 2}%` }}
                />
              ))}
              {/* Current Marker */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-7 w-1.5 bg-primary rounded-full shadow-lg shadow-primary/50 z-10"
                style={{ left: `${currentPosition * 2}%` }}
              />
              {/* Current Temp Label */}
              <div
                className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-foreground bg-card px-2 py-0.5 rounded border border-border/30"
                style={{ left: `${currentPosition * 2}%` }}
              >
                {currentTemp}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">MODUS</span>
              <span className="text-sm font-semibold text-foreground">{mode === 'HEAT' ? 'HEIZEN' : mode === 'COOL' ? 'KÜHLEN' : 'AUTO'}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">LÜFTER</span>
              <span className="text-sm font-semibold text-foreground">{fan === 'ON' ? 'EIN' : fan === 'OFF' ? 'AUS' : 'AUTO'}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

