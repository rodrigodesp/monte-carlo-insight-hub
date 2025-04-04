
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DrawdownStatsProps {
  stats: {
    maxDrawdown: number;
    avgDrawdown: number;
    minDrawdown: number;
    stdDeviation: number;
    avgPlusOneStd: number;
    avgPlusTwoStd: number;
    avgPlusThreeStd: number;
    occurrencesOneStd: { count: number; percentage: number };
    occurrencesTwoStd: { count: number; percentage: number };
    occurrencesThreeStd: { count: number; percentage: number };
  };
}

const DrawdownStats: React.FC<DrawdownStatsProps> = ({ stats }) => {
  // Format currency values
  const formatCurrency = (value: number) => {
    const absValue = Math.abs(value);
    return `$ ${absValue.toFixed(2)}`;
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Rebaixamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-2">
            <div className="space-y-1 flex-1">
              <div className="flex h-2 items-center justify-start space-x-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`h-${1 + i} w-1.5 rounded-sm bg-red-${300 + i*100}`} />
                ))}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(stats.maxDrawdown)}</div>
              <div className="text-xs text-muted-foreground">Maior Drawdown</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Drawdown Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-2">
            <div className="space-y-1 flex-1">
              <div className="flex h-2 items-center justify-start space-x-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`h-2 w-1.5 rounded-sm bg-amber-${300 + i*100}`} />
                ))}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(stats.avgDrawdown)}</div>
              <div className="text-xs text-muted-foreground">Drawdown Médio</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Menor Drawdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-2">
            <div className="space-y-1 flex-1">
              <div className="flex h-2 items-center justify-start space-x-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`h-${5 - i} w-1.5 rounded-sm bg-blue-${300 + i*100}`} />
                ))}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(stats.minDrawdown)}</div>
              <div className="text-xs text-muted-foreground">Menor Drawdown</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Desvio Padrão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 mb-2">
            <div className="space-y-1 flex-1">
              <div className="flex h-10 items-end justify-center space-x-1">
                {[4, 6, 8, 7, 5, 3, 2].map((height, i) => (
                  <div key={i} className={`h-${height} w-4 rounded-sm bg-green-${i % 2 ? 400 : 500}`} />
                ))}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(stats.stdDeviation)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Drawdown Médio + 1 Desvio Padrão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 flex-1">
            <div className="text-3xl font-bold">{formatCurrency(stats.avgPlusOneStd)}</div>
            <div className="text-xs text-muted-foreground">
              Ocorrências: {stats.occurrencesOneStd.count} ({stats.occurrencesOneStd.percentage.toFixed(0)}%)
            </div>
            <div className="flex h-12 items-end space-x-1 pt-2">
              {Array.from({ length: 8 }).map((_, i) => {
                const isHighlighted = i < Math.ceil(stats.occurrencesOneStd.percentage / 12.5);
                return (
                  <div key={i} className={`w-2 rounded-sm bg-blue-400 ${isHighlighted ? 'h-full' : 'h-3'}`} />
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Drawdown Médio + 2 Desvios Padrões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 flex-1">
            <div className="text-3xl font-bold">{formatCurrency(stats.avgPlusTwoStd)}</div>
            <div className="text-xs text-muted-foreground">
              Ocorrências: {stats.occurrencesTwoStd.count} ({stats.occurrencesTwoStd.percentage.toFixed(0)}%)
            </div>
            <div className="flex h-12 items-end space-x-1 pt-2">
              {Array.from({ length: 8 }).map((_, i) => {
                const isHighlighted = i < Math.ceil(stats.occurrencesTwoStd.percentage / 12.5);
                return (
                  <div key={i} className={`w-2 rounded-sm bg-blue-400 ${isHighlighted ? 'h-full' : 'h-3'}`} />
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Drawdown Médio + 3 Desvios Padrões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 flex-1">
            <div className="text-3xl font-bold">{formatCurrency(stats.avgPlusThreeStd)}</div>
            <div className="text-xs text-muted-foreground">
              Ocorrências: {stats.occurrencesThreeStd.count} ({stats.occurrencesThreeStd.percentage.toFixed(0)}%)
            </div>
            <div className="flex h-12 items-end space-x-1 pt-2">
              {Array.from({ length: 8 }).map((_, i) => {
                const isHighlighted = i < Math.ceil(stats.occurrencesThreeStd.percentage / 12.5);
                return (
                  <div key={i} className={`w-2 rounded-sm bg-blue-400 ${isHighlighted ? 'h-full' : 'h-3'}`} />
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DrawdownStats;
