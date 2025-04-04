
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PeriodAnalysisProps {
  data: {
    negativeMonths: { count: number; percentage: number };
    negativeQuarters: { count: number; percentage: number };
    negativeSemesters: { count: number; percentage: number };
    negativeYears: { count: number; percentage: number };
  };
  simulations: number;
}

const PeriodAnalysis: React.FC<PeriodAnalysisProps> = ({ data, simulations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Análise por período
          <span className="ml-auto text-base font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {simulations} Simulações
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray={`${data.negativeMonths.percentage} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="text-3xl font-bold text-blue-600">{data.negativeMonths.count}</span>
            </div>
            <span className="mt-2 text-sm text-center">Meses Negativos ({data.negativeMonths.percentage}%)</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray={`${data.negativeQuarters.percentage} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="text-3xl font-bold text-green-600">{data.negativeQuarters.count}</span>
            </div>
            <span className="mt-2 text-sm text-center">Trimestres Negativos ({data.negativeQuarters.percentage}%)</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="8"
                  strokeDasharray={`${data.negativeSemesters.percentage} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="text-3xl font-bold text-purple-600">{data.negativeSemesters.count}</span>
            </div>
            <span className="mt-2 text-sm text-center">Semestres Negativos ({data.negativeSemesters.percentage}%)</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="8"
                  strokeDasharray={`${data.negativeYears.percentage} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="text-3xl font-bold text-cyan-600">{data.negativeYears.count}</span>
            </div>
            <span className="mt-2 text-sm text-center">Anos Negativos ({data.negativeYears.percentage}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeriodAnalysis;
