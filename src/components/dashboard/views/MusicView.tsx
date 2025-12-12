'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockPlaylists = [
  { name: 'Entspannung', songs: 24, playing: false },
  { name: 'Energie', songs: 18, playing: true },
  { name: 'Fokus', songs: 32, playing: false },
  { name: 'Party', songs: 45, playing: false },
];

const mockNowPlaying = {
  title: 'Midnight City',
  artist: 'M83',
  album: 'Hurry Up, We\'re Dreaming',
  duration: 242,
  currentTime: 125,
  volume: 75,
};

export default function MusicView() {
  const progress = (mockNowPlaying.currentTime / mockNowPlaying.duration) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dashboard-card md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Jetzt läuft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-border/30 flex items-center justify-center">
                <div className="text-4xl">🎵</div>
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-foreground mb-2">
                  {mockNowPlaying.title}
                </div>
                <div className="text-lg text-muted-foreground mb-4">
                  {mockNowPlaying.artist} • {mockNowPlaying.album}
                </div>
                <div className="space-y-2">
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatTime(mockNowPlaying.currentTime)}</span>
                    <span>{formatTime(mockNowPlaying.duration)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Shuffle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="rounded-full h-14 w-14">
                    <Pause className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Repeat className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Lautstärke</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 relative h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    style={{ width: `${mockNowPlaying.volume}%` }}
                  />
                </div>
                <span className="text-sm font-semibold w-12 text-right">{mockNowPlaying.volume}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Aktive Zonen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Wohnzimmer</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aktiv</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Küche</span>
                <Badge variant="outline">Inaktiv</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Schlafzimmer</span>
                <Badge variant="outline">Inaktiv</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card flex-1 flex flex-col min-h-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Playlists</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto pr-2">
            {mockPlaylists.map((playlist) => (
              <div
                key={playlist.name}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  playlist.playing
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-muted/30 border-border/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold text-foreground">{playlist.name}</div>
                  {playlist.playing && (
                    <Badge className="bg-primary/20 text-primary border-primary/30">Läuft</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{playlist.songs} Titel</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

