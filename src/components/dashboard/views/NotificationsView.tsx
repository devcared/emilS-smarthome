'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bell, AlertCircle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockAlerts } from '@/lib/mock';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Thermostat offline', message: 'Kellerthermostat offline.', type: 'error', time: 'Vor 5 Min', read: false },
  { id: '2', title: 'Hoher Energieverbrauch', message: 'Klimaanlage verbraucht 3,5 kWh/Std.', type: 'warning', time: 'Vor 12 Min', read: false },
  { id: '3', title: 'Firmware-Update', message: 'Update verfügbar für Küchen-Hub.', type: 'info', time: 'Vor 1 Std', read: true },
  { id: '4', title: 'Effizienz-Vorschlag', message: 'Heizung um 2°F reduzieren, um 5€/Monat zu sparen.', type: 'info', time: 'Vor 2 Std', read: true },
  { id: '5', title: 'Tür entriegelt', message: 'Haustür ist seit 15 Minuten entriegelt.', type: 'warning', time: 'Vor 3 Std', read: true },
  { id: '6', title: 'Niedriger Batteriestand', message: 'Bewegungssensor-Batterie bei 15%.', type: 'warning', time: 'Vor 4 Std', read: true },
  { id: '7', title: 'System-Update abgeschlossen', message: 'Alle Geräte sind auf dem neuesten Stand.', type: 'success', time: 'Gestern', read: true },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'error':
      return <XCircle className="h-5 w-5 text-destructive" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case 'info':
      return <Info className="h-5 w-5 text-primary" />;
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

export default function NotificationsView() {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Benachrichtigungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                {mockNotifications.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Gesamt
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Ungelesen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                {unreadCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Benachrichtigungen
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Heute</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                {mockNotifications.filter(n => n.time.includes('Vor')).length}
              </div>
              <div className="text-sm text-muted-foreground">
                Neue heute
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card flex-1 flex flex-col min-h-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
          <CardTitle className="text-lg font-semibold">Alle Benachrichtigungen</CardTitle>
          <Badge variant="outline" className="text-xs">
            {unreadCount} ungelesen
          </Badge>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full pr-4 pl-6">
            <div className="space-y-0">
              {mockNotifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`py-4 pr-2 group cursor-pointer transition-all duration-200 px-1 ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h4 className="text-sm font-semibold text-foreground leading-tight">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        <div className="text-xs text-muted-foreground/70">
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < mockNotifications.length - 1 && (
                    <Separator className="my-1.5 opacity-30" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

