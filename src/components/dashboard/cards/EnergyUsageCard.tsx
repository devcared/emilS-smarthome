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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
        <CardTitle className="text-lg font-semibold">Energieverbrauch</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="h-8 bg-muted/50">
            <TabsTrigger value="day" className="text-xs px-3 data-[state=active]:bg-card">TAG</TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-3 data-[state=active]:bg-card">WO</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-3 data-[state=active]:bg-card">MO</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl font-bold text-foreground tracking-tight">
              {data.current}
            </span>
            <span className="text-lg text-muted-foreground font-medium">{data.unit}</span>
            <Badge
              variant="destructive"
              className="ml-auto flex items-center gap-1.5 bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/25"
            >
              <TrendingUp className="h-3 w-3" />
              ↑{Math.abs(data.change)}%
            </Badge>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-muted-foreground font-medium">SOLAR</span>
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></div>
            <span className="text-foreground font-semibold">{data.solarPercent}%</span>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.dailyData} margin={{ top: 15, right: 5, left: -10, bottom: 5 }}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                domain={[0, maxValue * 1.2]}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                {data.dailyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.day === 'Do'
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--muted-foreground) / 0.2)'
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

