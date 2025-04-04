
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonthlyStatsProps {
  stats: {
    bestMonth: number;
    averageMonth: number;
    worstMonth: number;
  };
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ stats }) => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Melhor Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$ {stats.bestMonth.toFixed(2)}</div>
          <div className="flex items-end h-10 w-full mt-2 space-x-0.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-blue-400"
                style={{ 
                  height: `${30 + (i * 2.5)}%`,
                  width: `${100 / 24}%`
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Média Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$ {stats.averageMonth.toFixed(2)}</div>
          <div className="flex items-end h-10 w-full mt-2 space-x-0.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-amber-400"
                style={{ 
                  height: `${40 + (Math.random() * 60)}%`,
                  width: `${100 / 24}%`
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Pior Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-500">$ {stats.worstMonth.toFixed(2)}</div>
          <div className="flex items-end h-10 w-full mt-2 space-x-0.5">
            {Array.from({ length: 24 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-red-400"
                style={{ 
                  height: `${70 - (i * 2)}%`,
                  width: `${100 / 24}%`
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MonthlyStats;
