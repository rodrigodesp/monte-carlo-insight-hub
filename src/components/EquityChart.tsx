
import React from 'react';
import { ChartContainer } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EquityChartProps {
  data: Array<{
    id: number;
    data: Array<{
      x: number;
      y: number;
    }>;
  }>;
}

const EquityChart: React.FC<EquityChartProps> = ({ data }) => {
  // Transform data to Recharts compatible format
  const formattedData = Array.from({ length: data[0]?.data.length || 0 }, (_, i) => {
    const dataPoint: any = { day: i + 1 };
    
    data.forEach((series, seriesIndex) => {
      if (series.data[i]) {
        dataPoint[`sim${seriesIndex + 1}`] = series.data[i].y;
      }
    });
    
    return dataPoint;
  });

  // Create a diverse color palette for better visualization
  const colors = [
    '#3b82f6', '#ec4899', '#10b981', '#8b5cf6', '#f59e0b',
    '#06b6d4', '#ef4444', '#84cc16', '#6366f1', '#d946ef',
    '#0ea5e9', '#f43f5e', '#22c55e', '#a855f7', '#eab308',
    '#14b8a6', '#ef4444', '#84cc16', '#8b5cf6', '#f97316'
  ];

  // Create a configuration for the chart (used by the ChartContainer)
  const config = data.reduce((acc, _, i) => {
    acc[`sim${i + 1}`] = { 
      label: `Simulação ${i + 1}`,
      color: colors[i % colors.length]
    };
    return acc;
  }, {} as Record<string, { label: string, color: string }>);

  return (
    <ChartContainer config={config}>
      <LineChart data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="day" 
          label={{ value: 'Dias', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          domain={['auto', 'auto']} 
          label={{ value: 'Saldo (R$)', angle: -90, position: 'insideLeft' }}
          tickFormatter={(value) => `R$${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
          labelFormatter={(label) => `Dia ${label}`}
        />
        {data.map((_, i) => (
          <Line 
            key={i}
            type="monotone" 
            dataKey={`sim${i + 1}`} 
            stroke={colors[i % colors.length]} 
            dot={false}
            strokeWidth={1.5}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default EquityChart;
