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
    <Card className="dashboard-card h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 flex-shrink-0">
        <CardTitle className="text-lg font-semibold tracking-tight">Energieverbrauch</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="h-8 bg-muted/40 border border-border/20">
            <TabsTrigger value="day" className="text-xs px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">TAG</TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">WO</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-3 data-[state=active]:bg-card data-[state=active]:shadow-sm">MO</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="mb-5 flex-shrink-0">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-6xl font-bold text-foreground tracking-tighter text-smooth">
              {data.current}
            </span>
            <span className="text-xl text-muted-foreground/80 font-semibold">{data.unit}</span>
            <Badge
              variant="destructive"
              className="ml-auto flex items-center gap-1.5 bg-red-500/25 text-red-400 border-red-500/40 hover:bg-red-500/30 shadow-sm shadow-red-500/20"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              ↑{Math.abs(data.change)}%
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground/80 font-semibold tracking-wide">SOLAR</span>
            <div className="h-3 w-3 rounded-full bg-orange-500 shadow-md shadow-orange-500/60 ring-2 ring-orange-500/30"></div>
            <span className="text-foreground font-bold">{data.solarPercent}%</span>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.dailyData} margin={{ top: 20, right: 8, left: -12, bottom: 8 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600, letterSpacing: '0.5px' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 500 }}
                domain={[0, maxValue * 1.2]}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={36}>
                {data.dailyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.day === 'Do'
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--muted-foreground) / 0.18)'
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

