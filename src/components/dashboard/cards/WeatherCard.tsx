import { Card, CardContent } from '@/components/ui/card';
import { CloudMoon, Cloud } from 'lucide-react';
import { mockWeather } from '@/lib/mock';

export default function WeatherCard() {
  const { location, temperature, high, low, humidity, forecast } = mockWeather;

  return (
    <Card className="dashboard-card h-full flex flex-col bg-gradient-to-br from-orange-600/35 via-orange-500/25 to-orange-400/15 border-orange-500/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/12 via-orange-400/6 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/8 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
      <CardContent className="p-5 relative z-10 flex-1 flex flex-col justify-center min-h-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xs font-bold text-muted-foreground/70 mb-2 tracking-[0.2em] uppercase">
              {location}
            </h3>
            <div className="text-5xl font-black text-foreground leading-none tracking-tighter text-smooth drop-shadow-lg">
              {temperature}°C
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-400/25 rounded-full blur-2xl animate-pulse" />
            <CloudMoon className="h-12 w-12 text-orange-300/95 drop-shadow-2xl relative z-10" strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground/90 mb-3 font-bold tracking-wider">
          <span>H: {high}°</span>
          <span className="opacity-50">•</span>
          <span>T: {low}°</span>
          <span className="opacity-50">•</span>
          <span>LF: {humidity}%</span>
        </div>
        <div className="text-xs text-muted-foreground/75 leading-relaxed font-semibold tracking-wide line-clamp-2">
          {forecast}
        </div>
      </CardContent>
    </Card>
  );
}

