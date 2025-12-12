import { Card, CardContent } from '@/components/ui/card';
import { CloudMoon, Cloud } from 'lucide-react';
import { mockWeather } from '@/lib/mock';

export default function WeatherCard() {
  const { location, temperature, high, low, humidity, forecast } = mockWeather;

  return (
    <Card className="dashboard-card h-full flex flex-col bg-gradient-to-br from-orange-600/30 via-orange-500/20 to-orange-400/12 border-orange-500/25 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-orange-400/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <CardContent className="p-6 relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xs font-medium text-muted-foreground/80 mb-3 tracking-wider uppercase">
              {location}
            </h3>
            <div className="text-7xl font-bold text-foreground leading-none tracking-tighter text-smooth">
              {temperature}°C
            </div>
          </div>
          <div className="relative">
            <CloudMoon className="h-16 w-16 text-orange-400/95 drop-shadow-xl" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl" />
          </div>
        </div>
        <div className="text-sm text-muted-foreground/85 mb-5 font-semibold tracking-wide">
          H: {high}° T: {low}° LF: {humidity}%
        </div>
        <div className="text-xs text-muted-foreground/70 leading-relaxed font-medium">
          {forecast}
        </div>
      </CardContent>
    </Card>
  );
}

