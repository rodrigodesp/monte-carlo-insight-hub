
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimeStatsProps {
  stats: {
    bestStagnation: number;
    averageStagnation: number;
    worstStagnation: number;
  };
}

const TimeStats: React.FC<TimeStatsProps> = ({ stats }) => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Melhor Período de Estagnação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.bestStagnation} dias</div>
          <div className="h-10 w-full mt-2">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path 
                d="M0,10 Q10,5 20,15 Q30,20 40,10 Q50,0 60,5 Q70,15 80,10 Q90,5 100,10" 
                fill="none" 
                stroke="#ec4899" 
                strokeWidth="1"
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Média de Estagnação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.averageStagnation} dias</div>
          <div className="h-10 w-full mt-2">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path 
                d="M0,10 Q10,5 20,15 Q30,20 40,10 Q50,0 60,5 Q70,15 80,10 Q90,5 100,10" 
                fill="none" 
                stroke="#ec4899" 
                strokeWidth="1"
              />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Pior Período de Estagnação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.worstStagnation} dias</div>
          <div className="h-10 w-full mt-2">
            <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
              <path 
                d="M0,10 Q10,5 20,15 Q30,20 40,10 Q50,0 60,5 Q70,15 80,10 Q90,5 100,10" 
                fill="none" 
                stroke="#ec4899" 
                strokeWidth="1"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimeStats;
