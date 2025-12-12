'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { mockEnergyData } from '@/lib/mock';
import { TrendingUp } from 'lucide-react';

export default function EnergyUsageCard() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const data = mockEnergyData[period];

  const maxValue = Math.max(...data.dailyData.map((d) => d.value));

  return (
    <Card className="dashboard-card h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0 relative z-10">
        <CardTitle className="text-base font-bold tracking-tight">Energieverbrauch</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="h-8 bg-muted/30 border border-border/25 backdrop-blur-sm">
            <TabsTrigger value="day" className="text-xs px-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">TAG</TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">WO</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">MO</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 relative z-10 p-0">
        <div className="px-6 pb-4 flex-shrink-0">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl font-black text-foreground tracking-tighter text-smooth leading-none">
              {data.current}
            </span>
            <span className="text-lg text-muted-foreground/75 font-bold">{data.unit}</span>
            <Badge
              variant="destructive"
              className="ml-auto flex items-center gap-1 bg-red-500/30 text-red-400 border-red-500/50 hover:bg-red-500/35 shadow-lg shadow-red-500/25 px-2.5 py-1 text-xs"
            >
              <TrendingUp className="h-3 w-3" />
              ↑{Math.abs(data.change)}%
            </Badge>
          </div>
          <div className="flex items-center gap-2.5 text-xs bg-muted/20 rounded-lg px-2.5 py-1.5 border border-border/20">
            <span className="text-muted-foreground/70 font-bold tracking-widest">SOLAR</span>
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/70 ring-2 ring-orange-500/40"></div>
            <span className="text-foreground font-black">{data.solarPercent}%</span>
          </div>
        </div>
        <div className="flex-1 min-h-0 relative px-6 pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.dailyData} margin={{ top: 10, right: 5, left: -10, bottom: 5 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9, fontWeight: 600 }}
                domain={[0, maxValue * 1.2]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                {data.dailyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.day === 'Do'
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--muted-foreground) / 0.15)'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

