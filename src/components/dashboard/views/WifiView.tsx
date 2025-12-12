'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, WifiOff, Signal, SignalLow, SignalMedium, SignalHigh } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Device {
  name: string;
  status: 'connected' | 'disconnected';
  signal: number;
  ip: string;
  type: string;
}

const mockDevices: Device[] = [
  { name: 'iPhone 14 Pro', status: 'connected', signal: 95, ip: '192.168.1.101', type: 'Smartphone' },
  { name: 'MacBook Pro', status: 'connected', signal: 88, ip: '192.168.1.102', type: 'Laptop' },
  { name: 'Nest Hub', status: 'connected', signal: 72, ip: '192.168.1.103', type: 'Smart Display' },
  { name: 'Philips Hue Bridge', status: 'connected', signal: 65, ip: '192.168.1.104', type: 'Smart Home' },
  { name: 'Samsung TV', status: 'disconnected', signal: 0, ip: '-', type: 'Smart TV' },
  { name: 'iPad Air', status: 'connected', signal: 82, ip: '192.168.1.106', type: 'Tablet' },
];

const getSignalIcon = (signal: number) => {
  if (signal === 0) return <WifiOff className="h-4 w-4" />;
  if (signal < 30) return <SignalLow className="h-4 w-4" />;
  if (signal < 70) return <SignalMedium className="h-4 w-4" />;
  return <SignalHigh className="h-4 w-4" />;
};

export default function WifiView() {
  const connectedDevices = mockDevices.filter(d => d.status === 'connected').length;
  const totalDevices = mockDevices.length;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Netzwerk-Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">SSID</div>
                <div className="text-xl font-semibold">SmartHome-Net</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Verbindung</div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Aktiv
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Geschwindigkeit</div>
                <div className="text-xl font-semibold">1.2 Gbps</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Verbundene Geräte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                {connectedDevices}
              </div>
              <div className="text-sm text-muted-foreground">
                von {totalDevices} Geräten
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Bandbreite</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                45%
              </div>
              <div className="text-sm text-muted-foreground">
                Aktuell genutzt
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card flex-1 flex flex-col min-h-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Geräte-Liste</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="space-y-3 h-full overflow-y-auto pr-2">
            {mockDevices.map((device) => (
              <div
                key={device.name}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={device.status === 'connected' ? 'text-primary' : 'text-muted-foreground'}>
                    {getSignalIcon(device.signal)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{device.name}</div>
                    <div className="text-xs text-muted-foreground">{device.type} • {device.ip}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {device.status === 'connected' && (
                    <div className="text-sm text-muted-foreground">{device.signal}%</div>
                  )}
                  <Badge
                    variant={device.status === 'connected' ? 'default' : 'outline'}
                    className={device.status === 'connected' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                  >
                    {device.status === 'connected' ? 'Verbunden' : 'Getrennt'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

