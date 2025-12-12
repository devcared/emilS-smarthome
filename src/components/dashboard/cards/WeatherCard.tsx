import { Card, CardContent } from '@/components/ui/card';
import { CloudMoon, Cloud } from 'lucide-react';
import { mockWeather } from '@/lib/mock';

export default function WeatherCard() {
  const { location, temperature, high, low, humidity, forecast } = mockWeather;

  return (
    <Card className="dashboard-card h-full flex flex-col bg-gradient-to-br from-orange-600/25 via-orange-500/15 to-orange-400/10 border-orange-500/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
      <CardContent className="p-6 relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground/90 mb-2 tracking-wide">
              {location}
            </h3>
            <div className="text-6xl font-bold text-foreground leading-none tracking-tight">
              {temperature}°C
            </div>
          </div>
          <CloudMoon className="h-14 w-14 text-orange-400/90 drop-shadow-lg" />
        </div>
        <div className="text-sm text-muted-foreground/90 mb-4 font-medium">
          H: {high}° T: {low}° LF: {humidity}%
        </div>
        <div className="text-xs text-muted-foreground/75 leading-relaxed">
          {forecast}
        </div>
      </CardContent>
    </Card>
  );
}

