'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import { mockWaterData } from '@/lib/mock';
import { TrendingDown } from 'lucide-react';

export default function WaterCard() {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const data = mockWaterData[period];

  const maxValue = Math.max(...data.breakdown.map((d) => d.value));

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
        <CardTitle className="text-lg font-semibold">Wasser</CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="h-8 bg-muted/50">
            <TabsTrigger value="day" className="text-xs px-3 data-[state=active]:bg-card">TAG</TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-3 data-[state=active]:bg-card">WO</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-3 data-[state=active]:bg-card">MO</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl font-bold text-foreground tracking-tight">
              {data.current}
            </span>
            <span className="text-lg text-muted-foreground font-medium">{data.unit}</span>
            <Badge
              variant="default"
              className="ml-auto bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/25 flex items-center gap-1.5"
            >
              <TrendingDown className="h-3 w-3" />
              ↓{Math.abs(data.change)}%
            </Badge>
          </div>
        </div>
        <div className="space-y-4">
          {data.breakdown.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">{item.category}</span>
                  <span className="text-foreground font-semibold">{item.value}</span>
                </div>
                <div className="relative h-3 bg-muted/40 rounded-full overflow-hidden border border-border/20">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary/75 rounded-full transition-all duration-500 shadow-sm shadow-primary/20"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

