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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 flex-shrink-0 relative z-10">
        <CardTitle className="text-lg font-bold tracking-tight">Energieverbrauch</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="h-9 bg-muted/30 border border-border/25 backdrop-blur-sm">
            <TabsTrigger value="day" className="text-xs px-3.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">TAG</TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-3.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">WO</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-3.5 data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border/30 font-semibold">MO</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 relative z-10">
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-baseline gap-4 mb-5">
            <span className="text-7xl font-black text-foreground tracking-tighter text-smooth leading-none">
              {data.current}
            </span>
            <span className="text-2xl text-muted-foreground/75 font-bold">{data.unit}</span>
            <Badge
              variant="destructive"
              className="ml-auto flex items-center gap-1.5 bg-red-500/30 text-red-400 border-red-500/50 hover:bg-red-500/35 shadow-lg shadow-red-500/25 px-3 py-1.5"
            >
              <TrendingUp className="h-4 w-4" />
              ↑{Math.abs(data.change)}%
            </Badge>
          </div>
          <div className="flex items-center gap-3.5 text-sm bg-muted/20 rounded-lg px-3 py-2 border border-border/20">
            <span className="text-muted-foreground/70 font-bold tracking-widest text-xs">SOLAR</span>
            <div className="h-3.5 w-3.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/70 ring-2 ring-orange-500/40 animate-pulse"></div>
            <span className="text-foreground font-black">{data.solarPercent}%</span>
          </div>
        </div>
        <div className="flex-1 min-h-0 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent pointer-events-none z-10" />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.dailyData} margin={{ top: 24, right: 10, left: -14, bottom: 10 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                domain={[0, maxValue * 1.2]}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
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

