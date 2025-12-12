'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Video, Eye, EyeOff, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraDevice {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'recording';
  lastMotion: string;
  streamUrl?: string;
}

const mockCameras: CameraDevice[] = [
  { id: '1', name: 'Haustür', location: 'Eingang', status: 'recording', lastMotion: 'Vor 2 Min' },
  { id: '2', name: 'Garten', location: 'Außen', status: 'online', lastMotion: 'Vor 15 Min' },
  { id: '3', name: 'Wohnzimmer', location: 'Innen', status: 'online', lastMotion: 'Vor 1 Std' },
  { id: '4', name: 'Garage', location: 'Außen', status: 'offline', lastMotion: 'Gestern' },
  { id: '5', name: 'Küche', location: 'Innen', status: 'online', lastMotion: 'Vor 3 Std' },
];

export default function CameraView() {
  const onlineCameras = mockCameras.filter(c => c.status === 'online' || c.status === 'recording').length;
  const recordingCameras = mockCameras.filter(c => c.status === 'recording').length;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Kameras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                {mockCameras.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Gesamt installiert
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                {onlineCameras}
              </div>
              <div className="text-sm text-muted-foreground">
                Kameras aktiv
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Aufnahme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-foreground">
                {recordingCameras}
              </div>
              <div className="text-sm text-muted-foreground">
                Aktive Aufnahmen
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
        {mockCameras.map((camera) => (
          <Card key={camera.id} className="dashboard-card flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
              <CardTitle className="text-lg font-semibold">{camera.name}</CardTitle>
              <Badge
                variant={camera.status === 'offline' ? 'outline' : 'default'}
                className={
                  camera.status === 'recording'
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : camera.status === 'online'
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : ''
                }
              >
                {camera.status === 'recording' ? (
                  <>
                    <Video className="h-3 w-3 mr-1" />
                    Aufnahme
                  </>
                ) : camera.status === 'online' ? (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    Online
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3 mr-1" />
                    Offline
                  </>
                )}
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 bg-muted/30 rounded-lg border border-border/30 flex items-center justify-center mb-4">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">{camera.location}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Standort</span>
                  <span className="text-foreground font-medium">{camera.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Letzte Bewegung</span>
                  <span className="text-foreground font-medium">{camera.lastMotion}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Live-Ansicht
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Video className="h-4 w-4 mr-2" />
                    Aufnahmen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

